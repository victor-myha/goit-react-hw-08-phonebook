import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: ['Contacts'],
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
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

// hooks
export const { useGetContactsQuery } = contactsApi;
