import {getCookie, setCookie} from 'cookies-next';
import {useSearchParams} from 'next/navigation';
import {useEffect} from 'react';

const useStoreAndTableIds = () => {
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId');
  const tableId = searchParams.get('tableId');
  useEffect(() => {
    if (storeId) setCookie('storeId', storeId);
    if (tableId) setCookie('tableId', tableId);
  }, [searchParams]);

  return {
    storeId: storeId || getCookie('storeId'),
    tableId: tableId || getCookie('tableId'),
  };
};
export default useStoreAndTableIds;
