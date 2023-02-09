import { createSlice } from '@reduxjs/toolkit'
import { addContact, deleteContact, editContact, getContacts } from './thunks'

const initialState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder => {
    builder.addCase(getContacts.fulfilled || addContact.fulfilled || deleteContact.fulfilled || editContact.fulfilled, (state, { payload }) => {
      state = payload;
      return state;
    });
  },
});

export const contactsReducer = contactsSlice.reducer;
