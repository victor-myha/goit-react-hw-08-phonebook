import { createSlice } from '@reduxjs/toolkit';
import { fetchCurrentUser, login, register } from './thunks';

const initialState = {
  user: {
    name: '',
    email: '',
    token: null,
  },
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: {
    // Register
    [register.pending](state) {
      state.isLoading = true;
    },
    [register.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.user = { ...action.payload.user, token: action.payload.token };
    },
    [register.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // Login
    [login.pending](state) {
      state.isLoading = true;
    },
    [login.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.user = { ...action.payload.user, token: action.payload.token };
    },
    [login.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // fetch current user
    [fetchCurrentUser.pending](state) {
      state.isLoading = true;
    },
    [fetchCurrentUser.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.user = {
        ...action.payload,
        token: JSON.parse(localStorage.getItem('user')).token,
      };
    },
    [fetchCurrentUser.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
