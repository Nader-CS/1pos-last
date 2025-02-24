'use server';

import {cookies} from 'next/headers';

export const getCategories = async () => {
  const appCookies = await cookies();
  const publicToken = appCookies.get('token')?.value;
  const storeId = appCookies.get('storeId')?.value;
  const locale = appCookies.get('NEXT_LOCALE')?.value || 'en';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/categories?store_id=${storeId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${publicToken}`,
        'Content-Type': 'application/json',
        'Accept-Language': locale,
      },
    },
  );
  const transformedResponse = await response?.json();
  return transformedResponse;
};

export const getProduct = async id => {
  const appCookies = await cookies();
  const publicToken = appCookies.get('token')?.value;
  const storeId = appCookies.get('storeId')?.value;
  const locale = appCookies.get('NEXT_LOCALE')?.value || 'en';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/products/${id}?store_id=${storeId}}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${publicToken}`,
        'Content-Type': 'application/json',
        'Accept-Language': locale,
      },
    },
  );

  const transformedResponse = await response?.json();
  return transformedResponse;
};

export const getPayments = async () => {
  const appCookies = await cookies();
  const publicToken = appCookies.get('token')?.value;
  const locale = appCookies.get('NEXT_LOCALE')?.value || 'en';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/payment_methods/?client_id=${process.env.NEXT_PUBLIC_SOURCE_ID}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${publicToken}`,
        'Content-Type': 'application/json',
        'Accept-Language': locale,
      },
      cache: 'force-cache',
    },
  );
  const transformedResponse = await response?.json();
  return transformedResponse;
};

export const getDeliveryTypes = async () => {
  const appCookies = await cookies();
  const publicToken = appCookies.get('token')?.value;
  const locale = appCookies.get('NEXT_LOCALE')?.value || 'en';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/delivery_methods/?client_id=${process.env.NEXT_PUBLIC_SOURCE_ID}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${publicToken}`,
        'Content-Type': 'application/json',
        'Accept-Language': locale,
      },
      cache: 'force-cache',
    },
  );
  const transformedResponse = await response?.json();
  return transformedResponse;
};

export const getOrder = async id => {
  const appCookies = await cookies();
  const publicToken = appCookies.get('token')?.value;
  const locale = appCookies.get('NEXT_LOCALE')?.value || 'en';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/orders/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${publicToken}`,
        'Content-Type': 'application/json',
        'Accept-Language': locale,
      },
      cache: 'no-store',
      next: {tags: ['Order']},
    },
  );
  const transformedResponse = await response?.json();
  return transformedResponse;
};
