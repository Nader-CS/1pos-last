import {getPayments} from '@/services';
import {PaymentMethodActionButton} from '.';
import {getOrder} from '@/services';
import Image from 'next/image';
import {one_pay} from '@/assets';
import {AppText} from '../common';
import {getCookie} from 'cookies-next';
import styles from './OrderPaymentMethod.module.css';

const OrderPaymentMethod = async () => {
  const paymentResponse = await getPayments();
  const cartId = getCookie('cartId');
  const orderResponse = await getOrder(cartId);
  return (
    <div>
      <div className={styles.imageContainer}>
        <Image
          src={one_pay}
          width={30}
          height={30}
          className={styles.image}
          alt="one-pay"
        />
        <AppText text="1PAY" classes={styles.headerText} />
      </div>
      <PaymentMethodActionButton
        paymentMethods={paymentResponse?.payment_methods}
        order={orderResponse?.orders}
      />
    </div>
  );
};
export default OrderPaymentMethod;
