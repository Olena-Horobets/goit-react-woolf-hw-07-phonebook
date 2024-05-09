import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import Filter from './Filter';
import Form from './Form';
import ContactsList from './ContactsList';

const CONTACTS = 'contacts';

function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(CONTACTS)) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const onFormSubmit = data => {
    data.id = nanoid();

    if (!data.name.trim()) {
      const newName = prompt(
        'Name cannot be empty. Please, enter the name below'
      );
      data.name = newName;
    }

    const savedContact = contacts.find(el => el.number === data.number);
    if (savedContact) {
      return alert(
        `This number is already saved under "${savedContact.name}" name`
      );
    }

    if (
      contacts.some(el => el.name.toLowerCase() === data.name.toLowerCase())
    ) {
      const newName = prompt(
        'This name is already used. Please, use different name'
      );
      data.name = newName;
    }

    setContacts(prev => [data, ...prev]);
  };

  const onFilterContacts = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    if (filter) {
      return contacts.filter(el =>
        el.name.toLowerCase().includes(filter.toLocaleLowerCase())
      );
    } else {
      return contacts;
    }
  };

  const onContactDelete = id => {
    setContacts(prev => [...prev].filter(el => el.id !== id));
  };

  const contactList = getVisibleContacts();

  return (
    <div className="container">
      <Form onSubmit={onFormSubmit}></Form>
      <Filter onSearch={onFilterContacts} searchValue={filter} />
      {contactList.length ? (
        <ContactsList
          contacts={contactList}
          onDelete={onContactDelete}
        ></ContactsList>
      ) : (
        <p>Sorry, no contacts found </p>
      )}
    </div>
  );
}

export { App };
