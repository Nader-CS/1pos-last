import Providers from '@/provider';
import {getMessages} from 'next-intl/server';
import {Montserrat} from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export default async function BaseLayout({children, locale}) {
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      dir={locale == 'en' ? 'ltr' : 'rtl'}
      className={montserrat.className}>
      <body>
        <Providers messages={messages}>{children}</Providers>
      </body>
    </html>
  );
}
