import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: ['Contacts'],
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState, endpoint }) => {
      // TODO define valid JWT
      headers.set('Authorization', `Bearer ${'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2UwZDlhNWM5YTMyMDAwMTY5ZDYxN2UiLCJpYXQiOjE2NzU2ODAxNjV9.6fNGMKHVrwDBPvufcS5JyYkHUSHmZyLyQoo5DlAduWo'}`);
    }, baseUrl: 'https://connections-api.herokuapp.com/',
  }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => 'contacts',
    }),
  }),
});

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};
// hooks
export const { useGetContactsQuery } = contactsApi;
