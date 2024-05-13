import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (_, { payload }) => payload,
    resetFilter: () => '',
  },
});

export const { setFilter, resetFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
