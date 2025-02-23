import {ErrorView, Footer} from '@/components';
import {cookies} from 'next/headers';
import {getTranslations} from 'next-intl/server';
import {Toaster} from '@/components/ui/toaster';

const MainLayout = async ({children}) => {
  const cookieStore = await cookies();
  const t = await getTranslations();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return (
      <ErrorView
        hasError={true}
        error={t('failed_to_generate_public_token')}
        refreshOnRetry
      />
    );
  }

  return (
    <>
      {children}
      <Toaster />
      <Footer />
    </>
  );
};
export default MainLayout;
