import {NextIntlClientProvider} from 'next-intl';
import '../globals.css';
import {getMessages} from 'next-intl/server';
import 'moment/locale/ar';
import moment from 'moment';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import StoreProvider from '@/providers/StoreProvider';
import {generatePublicToken} from '@/actions';
import {cookies} from 'next/headers';
import Providers from '@/providers/Providers';

export const metadata = {
  title: '1POS',
  description: '1POS',
};

export default async function RootLayout({children, params}) {
  const {locale} = await params;
  if (!routing.locales.includes(locale)) {
    notFound();
  }
  const messages = await getMessages();
  const appCookies = await cookies();
  moment.locale(locale);

  let publicToken = appCookies.get?.('token');
  if (!publicToken) {
    publicToken = await generatePublicToken();
  }

  return (
    <html
      lang={locale}
      dir={locale == 'ar' ? 'rtl' : 'ltr'}
      className="h-[100%] dark:bg-[white] dark:text-[black]">
      <body className="h-[100%] dark:bg-[white] dark:text-[black]">
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            <Providers publicToken={publicToken}>{children}</Providers>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
