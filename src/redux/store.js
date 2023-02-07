import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { contactsApi } from './contactsApi';

const rootReducer = combineReducers({
  userSlice: userSlice,
  [contactsApi.reducerPath]: contactsApi.reducer,
  // contactsSlice: contactsSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
