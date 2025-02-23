import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import {appLocales, defaultLocale} from '@/lib';

export const routing = defineRouting({
  locales: appLocales,
  defaultLocale: defaultLocale,
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
