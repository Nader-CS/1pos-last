'use client';
import {useTranslations} from 'next-intl';
import {AppText, CheckBox, Spinner} from '../common';
import Image from 'next/image';
import AppButton from '../common/AppButton';
import styles from './OrderMethod.module.css';
import {useUpdateOrderDeliveryMethodMutation} from '@/services';
import serverRevalidateTag from '@/lib/server-actions';

const OrderMethod = ({order}) => {
  const t = useTranslations();
  const [
    updateOrderDeliveryMethod,
    {isLoading: isUpdatingOrderDeliveryMethod},
  ] = useUpdateOrderDeliveryMethodMutation();
  const toggleDeliveryMethod = async deliveryMethodId => {
    if (order?.delivery_method?.id == deliveryMethodId) {
      return;
    }
    const response = await updateOrderDeliveryMethod({
      orderId: order?.id,
      body: {delivery_method_id: deliveryMethodId},
    });
    if (response?.error) {
      return;
    }
    serverRevalidateTag('Order');
  };
  return (
    <div>
      <div className={styles.row}>
        <AppText text={t('ordering_method')} classes={styles.orderMethodText} />
        {isUpdatingOrderDeliveryMethod && <Spinner size={18} />}
      </div>
      <div className={styles.methodsContainer}>
        {order?.store?.delivery_methods?.map((method, index) => {
          return (
            <AppButton
              key={index}
              disabled={isUpdatingOrderDeliveryMethod}
              buttonStyle={styles.button}
              onClick={() => toggleDeliveryMethod(method?.id)}>
              <div className={styles.row}>
                <CheckBox selected={order?.delivery_method?.id == method?.id} />
                <Image
                  src={method?.image_url}
                  width={35}
                  height={35}
                  alt="method_icon"
                  className={styles.orderIcon}
                />
                <AppText text={method?.name} />
              </div>
            </AppButton>
          );
        })}
      </div>
    </div>
  );
};
export default OrderMethod;
