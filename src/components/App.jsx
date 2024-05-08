import { Component } from 'react';
import { nanoid } from 'nanoid';

import data from 'data.json';

import Filter from './Filter';
import Form from './Form';
import ContactsList from './ContactsList';

class App extends Component {
  state = {
    contacts: [...data],
    filter: '',
  };

  onFormSubmit = data => {
    data.id = nanoid();

    const savedContact = this.state.contacts.find(
      el => el.number === data.number
    );
    if (savedContact) {
      return alert(
        `This number is already saved under "${savedContact.name}" name`
      );
    }

    if (this.state.contacts.some(el => el.name === data.name)) {
      const newName = prompt(
        'This name is alreday used. Please, use different name'
      );
      data.name = newName;
    }

    this.setState(({ contacts }) => {
      return { contacts: [data, ...contacts] };
    });
  };

  onFilterContacts = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    if (filter) {
      return this.state.contacts.filter(el =>
        el.name.toLowerCase().includes(filter.toLocaleLowerCase())
      );
    } else {
      return contacts;
    }
  };

  onContactDelete = id => {
    this.setState(({ contacts }) => {
      return { contacts: [...contacts].filter(el => el.id !== id) };
    });
  };

  render() {
    const contactList = this.getVisibleContacts();

    return (
      <div>
        <Form onSubmit={this.onFormSubmit}></Form>
        <Filter
          onSearch={this.onFilterContacts}
          searchValue={this.state.filter}
        />
        {contactList.length ? (
          <ContactsList
            contacts={contactList}
            onDelete={this.onContactDelete}
          ></ContactsList>
        ) : (
          <p>Sorry, no contacts found </p>
        )}
      </div>
    );
  }
}

export { App };
