import { configureStore } from "@reduxjs/toolkit";
import {userReducer, contactsReducer} from 'redux/reducers';

const store = configureStore({
  reducer: {
    userReducer,
    contactsReducer,
  },
});