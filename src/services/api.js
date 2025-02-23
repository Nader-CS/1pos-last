'use client';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {getCookie} from 'cookies-next';

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
});

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  const userAgent = navigator.userAgent || 'Unknown';
  const publicToken = getCookie('token');
  const locale = getCookie('NEXT_LOCALE') || 'en';

  args.headers = {
    ...args.headers,
    'Accept-Language': locale,
    'User-Agent': userAgent,
    Authorization: `Bearer ${publicToken}`,
  };

  let result = await baseQuery(args, api, extraOptions);

  return {
    ...result,
    error: result?.error?.data || result?.error,
  };
};

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
  invalidationBehavior: 'immediately',
  tagTypes: ['Order'],
});
