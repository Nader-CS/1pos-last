import {
  OrderItems,
  OrderMethod,
  OrderPaymentMethod,
  OrderTotal,
  OrderCheckout,
} from '.';
import styles from './Order.module.css';

const Order = ({order}) => {
  return (
    <div className={styles.container}>
      <div className={styles.orderItems}>
        <OrderItems order={order} />
      </div>
      <div className={styles.orderMethod}>
        <OrderMethod order={order} />
      </div>
      <div className={styles.paymentMethods}>
        <OrderPaymentMethod />
      </div>
      <div className={styles.orderTotal}>
        <OrderTotal order={order} />
      </div>
      <div className={styles.checkout}>
        <OrderCheckout />
      </div>
    </div>
  );
};
export default Order;
