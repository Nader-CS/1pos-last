'use client';
import {NextUIProvider} from '@nextui-org/react';
import {ToastContainer} from 'react-toastify';
import {useLocale} from 'next-intl';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import {setCookie} from 'cookies-next';
import {useDispatch} from 'react-redux';
import {setToken} from '@/slices';
import {ErrorView} from '@/components';

const Providers = ({children, publicToken}) => {
  const locale = useLocale();
  const dispatch = useDispatch();

  const token = publicToken?.access_token || publicToken?.value;

  if (token) {
    setCookie('token', token);
    dispatch(setToken(token));
  }

  const onRetry = () => window.location.reload();

  return (
    <NextUIProvider className="flex h-full w-full flex-col">
      <ToastContainer position="top-center" rtl={locale == 'ar'} />
      <ErrorView
        hasError={publicToken?.error_description}
        error={publicToken?.error_description}
        onRetry={onRetry}>
        {children}
      </ErrorView>
    </NextUIProvider>
  );
};
export default Providers;
