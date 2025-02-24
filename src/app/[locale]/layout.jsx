import {BaseLayout} from '@/components';
import {routing} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

export const metadata = {
  title: '1POS',
  description: '1POS Project',
};

export function generateStaticParams() {
  return routing.locales.map(locale => ({locale}));
}

export default async function RootLayout({children, params}) {
  const {locale} = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
