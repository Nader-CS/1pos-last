'use client';
import {useLocale} from 'next-intl';
import {AppButton} from '.';
import {usePathname, useRouter} from '@/i18n/routing';
import {useSearchParams} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {api} from '@/services';

const LanguageChange = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const handleLanguageChange = language => {
    const queryParams = Object.fromEntries(searchParams.entries());
    router.replace({pathname, query: queryParams}, {locale: language});
    dispatch(api.util.resetApiState());
  };

  return (
    <div className="flex justify-center gap-2 text-black">
      <AppButton
        showArrow={false}
        disabled={locale == 'en'}
        name={'english'}
        onClick={() => handleLanguageChange('en')}
        buttonStyle={`bg-transparent h-10 ${
          locale == 'en' && 'underline underline-offset-4'
        }`}
        buttonTxtStyle={'font-[regular]'}
      />
      <AppButton
        showArrow={false}
        disabled={locale == 'ar'}
        name={'عربي'}
        onClick={() => handleLanguageChange('ar')}
        buttonStyle={`bg-transparent h-10 ${
          locale == 'ar' && 'underline underline-offset-4'
        }`}
        buttonTxtStyle={'font-[regular]'}
      />
    </div>
  );
};
export default LanguageChange;
