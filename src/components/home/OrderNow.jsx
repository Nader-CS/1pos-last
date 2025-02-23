'use client';

import {useTranslations} from 'next-intl';
import AppButton from '../common/AppButton';
import styles from './OrderNow.module.css';
import {useAlerts} from '@/hooks';
import {getCookie, setCookie} from 'cookies-next';
import {useRouter} from '@/i18n/routing';
import {useCreateOrderMutation} from '@/services';
import {order_now} from '@/assets';
import Image from 'next/image';

const OrderNow = () => {
  const t = useTranslations();
  const {errorAlert} = useAlerts();
  const router = useRouter();
  const [createOrder, {isLoading: isCreatingOrder}] = useCreateOrderMutation();

  const handleOrderCreation = async () => {
    const storeId = getCookie('storeId');
    const cartId = getCookie('cartId');
    const tableId = getCookie('tableId');

    if (!storeId) {
      errorAlert(null, t('store_not_found'));
      return;
    }

    if (cartId) {
      router.push('/products');
      return;
    }

    const orderData = {
      store_id: storeId,
      delivery_method_id: 2,
      ...(tableId && {table_id: tableId}),
    };

    const response = await createOrder(orderData);

    if (response?.error?.errors) {
      errorAlert(null, response?.error?.errors);
      return;
    }

    setCookie('cartId', response?.data?.orders?.id);
    setCookie('cartStoreId', response?.data?.orders?.store?.id);
    router.push('/products');
  };

  const renderIcon = () => (
    <Image src={order_now} alt="order_icon" width={24} height={24} />
  );

  return (
    <AppButton
      name={t('order_now')}
      renderIcon={renderIcon}
      buttonStyle={styles.button}
      showArrow
      isLoading={isCreatingOrder}
      onClick={handleOrderCreation}
    />
  );
};

export default OrderNow;
