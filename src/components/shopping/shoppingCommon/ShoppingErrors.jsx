'use client';

import {ErrorView} from '@/components';
import {useRouter} from '@/i18n/routing';
import {useCreateOrderMutation} from '@/services/order';
import {getCookie, setCookie} from 'cookies-next';
import {useTranslations} from 'next-intl';

const ShoppingErrors = ({error}) => {
  const router = useRouter();
  const t = useTranslations();
  const [
    createOrder,
    {isLoading: isCreatingOrderLoading, error: createCartError},
  ] = useCreateOrderMutation();

  const onRetry = async () => {
    switch (error) {
      case 'no_store_defined':
        router.push('/');
        break;

      case 'no_cart_found':
        const storeId = getCookie('storeId');
        const tableId = getCookie('tableId');
        const response = await createOrder({
          store_id: storeId,
          delivery_method_id: 2,
          ...(tableId && {table_id: tableId}),
        });
        if (response?.data?.orders) {
          setCookie('cartId', response?.data?.orders?.id);
          setCookie('cartStoreId', response?.data?.orders?.store?.id);
          router.refresh();
        }
        break;
    }
  };

  return (
    <ErrorView
      hasError={true}
      error={
        createCartError?.errors?.[0] ||
        createCartError?.error?.error ||
        t(error)
      }
      onRetry={onRetry}
      showRetryButtonLoading={isCreatingOrderLoading}
    />
  );
};

export default ShoppingErrors;
