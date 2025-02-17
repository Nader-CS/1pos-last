import revalidateServerComponents from '@/actions';
import {useCreateOrderMutation} from '@/services/order';
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import {useCallback, useEffect, useMemo} from 'react';

const useCreateCart = ({storeId, tableId}) => {
  const publicToken = getCookie('token');
  const cartStoreId = getCookie('cartStoreId');
  const [
    createOrder,
    {
      isError: isCreateError,
      isLoading: isCreatingOrderLoading,
      error: createOrderError,
    },
  ] = useCreateOrderMutation();

  const orderParams = useMemo(
    () => ({
      store_id: storeId,
      delivery_method_id: 2,
      ...(tableId && {table_id: tableId}),
    }),
    [storeId, tableId],
  );

  const onCreateOrder = async () => {
    deleteCookie('cartId');
    deleteCookie('cartStoreId');
    const response = await createOrder(orderParams);
    if (!response?.error) {
      setCookie('cartId', response?.data?.orders?.id);
      setCookie('cartStoreId', response?.data?.orders?.store?.id);
      revalidateServerComponents();
    }
  };

  const retry = useCallback(
    () => Promise.all([isCreateError && onCreateOrder()]),
    [isCreateError, orderParams, publicToken],
  );

  useEffect(() => {
    if (cartStoreId != storeId && publicToken && !isCreatingOrderLoading) {
      onCreateOrder();
    }
  }, [publicToken, cartStoreId, storeId]);

  return {isCreateError, retry, isCreatingOrderLoading, createOrderError};
};
export default useCreateCart;
