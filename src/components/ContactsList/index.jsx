import ContactsItem from 'components/ContactsItem';

function ContactsList({ contacts, onDelete }) {
  return (
    <ul>
      {contacts.map(el => {
        return (
          <ContactsItem
            key={el.id}
            item={el}
            onDelete={onDelete}
          ></ContactsItem>
        );
      })}
    </ul>
  );
}

export default ContactsList;
