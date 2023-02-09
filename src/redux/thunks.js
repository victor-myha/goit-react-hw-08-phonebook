import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// User Thunks
export const register = createAsyncThunk(
  'users/signup',
  async (sendData, thunkAPI) => {
    try {
      const response = await axios.post('/users/signUp', sendData);
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...response.data.user,
          token: response.data.token,
        }),
      );
      setAuthHeader(response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const login = createAsyncThunk(
  'users/login',
  async (sendData, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', sendData);
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...response.data.user,
          token: response.data.token,
        }),
      );
      setAuthHeader(response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const fetchCurrentUser = createAsyncThunk(
  'users/refresh',
  async (_, thunkAPI) => {
    const token = JSON.parse(localStorage.getItem('user')).token;

    if (!token) {
      return thunkAPI.rejectWithValue('No valid token');
    }

    try {
      setAuthHeader(token);
      const { data } = await axios.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue('err');
    }
  },
);

// Contacts Thunks
export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (sendData, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', sendData);
      thunkAPI.dispatch(getContacts());
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      thunkAPI.dispatch(getContacts());
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async (sendData, thunkAPI) => {
    try {
      const { id, ...rest } = sendData;
      const response = await axios.patch(`/contacts/${id}`, rest);
      thunkAPI.dispatch(getContacts());
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
