import { useSelector } from 'react-redux';

import ContactsItem from 'components/ContactsItem';

import { selectFilteredContacts } from 'store/contacts/selectors';

function ContactsList() {
  const contacts = useSelector(selectFilteredContacts);

  return contacts.length ? (
    <ul>
      {contacts.map(el => {
        return <ContactsItem key={el.id} item={el}></ContactsItem>;
      })}
    </ul>
  ) : (
    <p>Sorry, no contacts found </p>
  );
}

export default ContactsList;
