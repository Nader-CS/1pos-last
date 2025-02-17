import createMiddleware from 'next-intl/middleware';

const handleI18nRouting = createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
});

function setCookie(response, name, value) {
  if (value) {
    response.cookies.set(name, value);
  }
}

function deleteCookie(response, name) {
  response.cookies.delete(name);
}

export async function customMiddleware(request) {
  const {cookies, url} = request;
  const {searchParams} = new URL(url);

  const cartStoreId = cookies.get('cartStoreId')?.value;
  const storeId = searchParams.get('storeId') || cookies.get('storeId')?.value;
  const tableId = searchParams.get('tableId') || cookies.get('tableId')?.value;

  const response = handleI18nRouting(request);

  if (cartStoreId && cartStoreId !== storeId) {
    deleteCookie(response, 'cartStoreId');
    deleteCookie(response, 'cartId');
  }

  setCookie(response, 'storeId', storeId);
  setCookie(response, 'tableId', tableId);

  return response;
}

export default customMiddleware;

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
