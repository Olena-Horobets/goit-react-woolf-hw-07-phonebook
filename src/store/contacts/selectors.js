export const selectContacts = state => state.contacts.items;

export const selectFilteredContacts = ({ contacts, filter }) => {
  if (filter) {
    return contacts.items.filter(el => {
      return el.name.toLowerCase().includes(filter.toLocaleLowerCase());
    });
  } else {
    return contacts.items;
  }
};
