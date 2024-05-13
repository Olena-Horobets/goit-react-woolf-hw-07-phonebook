import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from './Filter';
import Form from './Form';
import ContactsList from './ContactsList';

import {
  getAllContactsAction,
  addContactAction,
  deleteContactAction,
} from 'store/contacts/slice';

function App() {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContactsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFormSubmit = data => {
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

    dispatch(addContactAction(data));
  };

  const getVisibleContacts = () => {
    if (filter) {
      return contacts.filter(el => {
        return el.name.toLowerCase().includes(filter.toLocaleLowerCase());
      });
    } else {
      return contacts;
    }
  };

  const onContactDelete = id => {
    dispatch(deleteContactAction(id));
  };

  const contactList = getVisibleContacts();

  return (
    <div className="container">
      <Form onSubmit={onFormSubmit}></Form>
      <Filter />
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
