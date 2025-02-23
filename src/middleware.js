import createMiddleware from 'next-intl/middleware';
import {appLocales, defaultLocale} from './lib';
import {generatePublicToken} from '@/services';

const handleI18nRouting = createMiddleware({
  locales: appLocales,
  defaultLocale: defaultLocale,
});

const handlePublicToken = async (request, response) => {
  const {cookies} = request;
  const publicTokenCookie = cookies.get('token')?.value;
  if (!publicTokenCookie) {
    const publicTokenRequest = await generatePublicToken();
    if (publicTokenRequest?.access_token) {
      response.cookies.set('token', publicTokenRequest?.access_token);
    }
  }
};

const handleTablesAndStores = (request, response) => {
  const {cookies, url} = request;
  const {searchParams} = new URL(url);
  const cartStoreId = cookies.get('cartStoreId')?.value;
  const storeId = searchParams.get('storeId') || cookies.get('storeId')?.value;
  const tableId = searchParams.get('tableId') || cookies.get('tableId')?.value;
  if (storeId) {
    if (cartStoreId && cartStoreId !== storeId) {
      response.cookies.delete('cartStoreId');
      response.cookies.delete('cartId');
    }
    response.cookies.set('storeId', storeId);
  }
  if (tableId) {
    response.cookies.set('tableId', tableId);
  }
};

export default async function middleware(request) {
  const response = handleI18nRouting(request);
  await handlePublicToken(request, response);
  handleTablesAndStores(request, response);
  return response;
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)'],
};
