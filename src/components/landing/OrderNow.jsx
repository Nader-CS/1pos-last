'use client';
import {useCreateOrderMutation} from '@/services/order';
import {AppButton} from '../common';
import {useRouter} from '@/i18n/routing';
import {useHandleToasts} from '@/hooks';
import {getCookie, setCookie} from 'cookies-next';
import {useTranslations} from 'next-intl';

const OrderNow = () => {
  const router = useRouter();
  const t = useTranslations();
  const {errorToast} = useHandleToasts();
  const [createOrder, {isLoading: isCreatingOrderLoading}] =
    useCreateOrderMutation();

  const onOrderNow = async () => {
    const storeId = getCookie('storeId');
    const tableId = getCookie('tableId');
    const cartId = getCookie('cartId');
    if (!storeId) {
      errorToast(t('invalid_link'));
    }
    if (cartId) {
      router.push('/products');
      return;
    }
    if (storeId) {
      const response = await createOrder({
        store_id: storeId,
        delivery_method_id: 2,
        ...(tableId && {table_id: tableId}),
      });
      if (response?.error) {
        errorToast(response?.error?.error || response?.error?.errors?.[0]);
        return;
      }
      setCookie('cartId', response?.data?.orders?.id);
      setCookie('cartStoreId', response?.data?.orders?.store?.id);
      router.push('/products');
    }
  };

  return (
    <AppButton
      name={t('order_now')}
      isLoading={isCreatingOrderLoading}
      icon={'/order_now.png'}
      buttonStyle={`bg-[white] w-[100%] rounded-[2rem] uppercase`}
      showArrow
      onClick={onOrderNow}
    />
  );
};
export default OrderNow;
