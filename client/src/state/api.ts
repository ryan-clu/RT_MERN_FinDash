import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetKpisResponse } from './types';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: 'main',
  tagTypes: ['Kpis'],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponse>, void>({
      query: () => 'kpi/kpis/',
      providesTags: ['Kpis'],
    }),
  }),
});

export const { useGetKpisQuery } = api;

/* Notes
- Redux Toolkit Query - so we can grab or make API calls, and 
data can be stored in the global store.

- Using redux toolkit query's createApi to allow us to make 
endpoints that we can use to call our backend. So we can grab
data from our backend using this setup.
- baseQuery and fetchBaseQuery is our boilerplate code to do this.
Most of the stuff is boilerplate fill in.
- we pass in our env variable. That URL is what we'd be calling
everytime we make this API call.

- reducerPath is just name of the reducer/slice in redux. Name 
for this particular API call.

- tagTypes - tags, these are what are being used to keep information.
Name of each API data.

- endpoint - this is where we actually create our API calls.
- getKpis is an endpoint / an api call.
getKpis endpoint makes an api call using the baseUrl to the endpoint 
baseUrl/kpi/kpis/
It grabs that data, and saves it under the Kpis tag.

- getKpis query can be exported for use, by using destructuring 
syntax and exporting useGetKpisQuery. Whatever endpoints you make,
just add prefix use and suffix Query with the endpoint name inbetw.
- Above is how you export and grab the particular redux hooks you make.
*/
