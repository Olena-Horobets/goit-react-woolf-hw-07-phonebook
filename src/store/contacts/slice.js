import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

axios.defaults.baseURL = 'https://61ba061948df2f0017e5a8a2.mockapi.io/contacts';

export const getAllContactsAction = createAsyncThunk(
  'get/contacts',
  async () => {
    const { data } = await axios.get('/');
    return data;
  }
);

export const addContactAction = createAsyncThunk('add/contacts', async body => {
  const { data } = await axios.post('/', body);
  return data;
});

export const deleteContactAction = createAsyncThunk(
  'delete/contacts',
  async id => {
    await axios.delete(`/${id}`);
    return id;
  }
);

const handleFetchPending = state => {
  state.isLoading = true;
  state.error = '';
};

const handleFetcFulfilled = state => {
  state.isLoading = false;
};

const handleFetcRejected = (state, { error }) => {
  state.isLoading = false;
  state.error = error.message;
};

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
