import {api} from './api';

export const userApi = api.injectEndpoints({
  endpoints: build => ({
    publicToken: build.mutation({
      query: () => ({
        url: 'oauth/token',
        method: 'POST',
        body: {
          grant_type: 'client_credentials',
          client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
          client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {usePublicTokenMutation} = userApi;
