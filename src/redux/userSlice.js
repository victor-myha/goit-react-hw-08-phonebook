import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  user: {
    // TODO del mockId
    uId: nanoid(),
    email: 'user@gmail.com'
  }
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    loginAction(state, { payload }) {
      state.user = {...payload}
    },
    registerAction(state, { payload }) {
      state.user = {...payload}
    },
    logoutAction(state, { payload }) {
      state.user = {
        uId: null,
        email: ''
      }
    },
  },
});

export default userSlice.reducer;
export const { loginAction, registerAction, logoutAction } = userSlice.actions;
