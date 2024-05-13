import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addContact, deleteContact, getAllContacts } from 'api/contactsAPI';
import {
  handleFetcFulfilled,
  handleFetcRejected,
  handleFetchPending,
} from 'store/helpers';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const getAllContactsAction = createAsyncThunk(
  'get/contacts',
  getAllContacts
);

export const addContactAction = createAsyncThunk('add/contacts', addContact);

export const deleteContactAction = createAsyncThunk(
  'delete/contacts',
  deleteContact
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(getAllContactsAction.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(addContactAction.fulfilled, ({ items }, { payload }) => {
        items.unshift(payload);
      })
      .addCase(deleteContactAction.fulfilled, ({ items }, { payload }) => {
        const index = items.findIndex(task => task.id === payload);
        items.splice(index, 1);
      })
      .addMatcher(({ type }) => type.endsWith('/pending'), handleFetchPending)
      .addMatcher(
        ({ type }) => type.endsWith('/fulfilled'),
        handleFetcFulfilled
      )
      .addMatcher(({ type }) => type.endsWith('/rejected'), handleFetcRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
