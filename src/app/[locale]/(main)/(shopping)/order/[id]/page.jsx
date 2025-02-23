import {ErrorView} from '@/components';
import {Order} from '@/components/order';
import {getPayments} from '@/services';
import {getOrder} from '@/services';

const OrderScreen = async ({params}) => {
  const id = (await params)?.id;
  const orderResponse = await getOrder(id);
  const paymentResponse = await getPayments();
  const error = [
    orderResponse?.errors?.[0],
    orderResponse?.error,
    paymentResponse?.errors?.[0],
    paymentResponse?.error,
  ].some(Boolean);

  if (error) {
    return <ErrorView hasError error={error} refreshOnRetry />;
  }

  return <Order order={orderResponse?.orders} />;
};
export default OrderScreen;
