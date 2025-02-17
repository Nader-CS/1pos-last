import {generatePublicToken} from '@/actions';
import {Footer} from '@/components';
import {cookies} from 'next/headers';

const MainLayout = async ({children}) => {
  const appCookies = await cookies();
  const publicToken =
    appCookies?.get('token')?.value ||
    (await generatePublicToken())?.access_token;

  if (!publicToken) return;

  return (
    <>
      {children}
      <Footer />
    </>
  );
};
export default MainLayout;
