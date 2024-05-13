import s from './Form.module.css';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'store/contacts/selectors';

import { addContactAction } from 'store/contacts/slice';

function Form() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const onInputChange = e => {
    const { name, value } = e.target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();

    if (!name.trim()) {
      const newName = prompt(
        'Name cannot be empty. Please, enter the name below'
      );
      setName(newName);
    }

    const savedContact = contacts.find(el => el.number === number);
    if (savedContact) {
      return alert(
        `This number is already saved under "${savedContact.name}" name`
      );
    }

    if (contacts.some(el => el.name.toLowerCase() === name.toLowerCase())) {
      const newName = prompt(
        'This name is already used. Please, use different name'
      );
      setName(newName);
    }

    dispatch(addContactAction({ name, number }));
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={s.form} onSubmit={onFormSubmit}>
      <label htmlFor="name">
        Name
        <input
          id="name"
          className="input"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={onInputChange}
          value={name}
        />
      </label>
      <label htmlFor="number">
        Number
        <input
          id="number"
          className="input"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={onInputChange}
          value={number}
        />
      </label>
      <button type="submit" className="button">
        Add contact
      </button>
    </form>
  );
}

export default Form;
