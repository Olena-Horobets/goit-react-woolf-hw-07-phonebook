import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContactAction: {
      prepare(data) {
        return {
          payload: {
            ...data,
            id: nanoid(),
          },
        };
      },
      reducer(state, { payload }) {
        state.push(payload);
      },
    },
    removeContactAction: (contacts, { payload }) => {
      const index = contacts.findIndex(task => task.id === payload);
      contacts.splice(index, 1);
    },
  },
});

export const { addContactAction, removeContactAction } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
