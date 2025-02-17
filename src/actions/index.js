'use server';
import {revalidatePath} from 'next/cache';
import {cookies, headers} from 'next/headers';
import {cache} from 'react';

export const generatePublicToken = cache(async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}oauth/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      }),
      cache: 'no-store',
    },
  );
  const transformedResponse = await response?.json();
  return transformedResponse;
});

export const getOrderServer = async id => {
  const cookieStore = await cookies();
  const headersStore = await headers();
  const publicToken =
    cookieStore.get('token')?.value ||
    (await generatePublicToken())?.access_token;
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  const userAgent = headersStore.get('user-agent') || 'Unknown';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/orders/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${publicToken}`,
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'Accept-Language': locale,
      },
      cache: 'no-store',
    },
  );
  const transformedResponse = await response?.json();
  return transformedResponse;
};

export const getPaymentsServer = async () => {
  const cookieStore = await cookies();
  const headersStore = await headers();
  const publicToken =
    cookieStore.get('token')?.value ||
    (await generatePublicToken())?.access_token;
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  const userAgent = headersStore.get('user-agent') || 'Unknown';

  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/payment_methods/?client_id=${process.env.NEXT_PUBLIC_SOURCE_ID}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${publicToken}`,
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'Accept-Language': locale,
      },
      cache: 'force-cache',
    },
  ).then(res => res.json());
};

export const getDeliveryTypesServer = async () => {
  const cookieStore = await cookies();
  const headersStore = await headers();
  const publicToken =
    cookieStore.get('token')?.value ||
    (await generatePublicToken())?.access_token;
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  const userAgent = headersStore.get('user-agent') || 'Unknown';

  return await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/delivery_methods/?client_id=${process.env.NEXT_PUBLIC_SOURCE_ID}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${publicToken}`,
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'Accept-Language': locale,
      },
      cache: 'force-cache',
    },
  ).then(res => res.json());
};

export const fetchCategoriesServer = async () => {
  const cookieStore = await cookies();
  const headersStore = await headers();
  const publicToken =
    cookieStore.get('token')?.value ||
    (await generatePublicToken())?.access_token;
  const storeId = cookieStore.get('storeId')?.value;
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  const userAgent = headersStore.get('user-agent') || 'Unknown';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/categories?store_id=${storeId}`,
    {
      cache: 'no-store',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${publicToken}`,
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'Accept-Language': locale,
      },
    },
  );

  return await response.json();
};

export const fetchProductServer = async id => {
  const cookieStore = await cookies();
  const headersStore = await headers();
  const publicToken =
    cookieStore.get('token')?.value ||
    (await generatePublicToken())?.access_token;
  const storeId = cookieStore.get('storeId')?.value;

  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'en';
  const userAgent = headersStore.get('user-agent') || 'Unknown';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/products/${id}?store_id=${storeId}&productId=${id}`,
    {
      cache: 'no-store',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${publicToken}`,
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        'Accept-Language': locale,
      },
    },
  );

  return await response.json();
};

export default async function revalidateServerComponents() {
  revalidatePath('/', 'layout');
}
