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
      localStorage.setItem('user', {
        ...response.data.user,
        token: response.data.token,
      });
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
      localStorage.setItem('user', JSON.stringify({
        ...response.data.user,
        token: response.data.token,
      }));
      setAuthHeader(response.data.token);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
);
