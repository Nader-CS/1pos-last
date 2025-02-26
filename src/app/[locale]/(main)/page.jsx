import {ErrorView, Landing} from '@/components';
import {getStore} from '@/services';
import {cookies} from 'next/headers';

const HomePage = async () => {
  const appCookies = await cookies();
  const storeId = appCookies.get('storeId')?.value;
  const tableId = appCookies.get('tableId')?.value;
  const store = await getStore(storeId);
  const storeError = store?.error || store?.errors?.[0];

  if (storeError) {
    return <ErrorView hasError refreshOnRetry error={storeError} />;
  }
  return <Landing store={store?.stores} tableId={tableId} />;
};
export default HomePage;
