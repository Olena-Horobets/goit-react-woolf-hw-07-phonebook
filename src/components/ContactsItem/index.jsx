import s from './ContactsItem.module.css';

function ContactsItem({ item, onDelete }) {
  return (
    <li className={s.item}>
      <p>{item.name}</p>
      <p>{item.number}</p>
      <button className="button" onClick={() => onDelete(item.id)}>
        Remove
      </button>
    </li>
  );
}

export default ContactsItem;
