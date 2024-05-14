import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from 'store/filter/selectors';

export const selectContacts = state => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],

  (contacts, filter) => {
    if (filter) {
      return contacts.filter(el => {
        return el.name.toLowerCase().includes(filter.toLocaleLowerCase());
      });
    } else {
      return contacts;
    }
  }
);

export const selectIsLoading = state => state.contacts.isLoading;
