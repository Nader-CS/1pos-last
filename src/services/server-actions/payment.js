'use server';

export const createPayment = async (orderId, body) => {
  const appCookies = await cookies();
  const publicToken = appCookies.get('token')?.value;
  const locale = appCookies.get('NEXT_LOCALE')?.value || 'en';

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}api/v1/orders/${orderId}/payments`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${publicToken}`,
        'Content-Type': 'application/json',
        'Accept-Language': locale,
      },
      body,
    },
  );
  const transformedResponse = await response?.json();
  return transformedResponse;
};
