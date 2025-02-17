import {getDeliveryTypesServer, getPaymentsServer} from '@/actions';
import {Order} from '@/components';

const OrderPage = async ({params}) => {
  const id = (await params)?.id;
  const paymentsMethod = await getPaymentsServer();
  const deliveryTypes = await getDeliveryTypesServer();
  return (
    <div className="flex flex-1 flex-col bg-wildSand">
      <Order
        orderId={id}
        deliveryMethods={deliveryTypes?.delivery_methods}
        paymentsMethod={paymentsMethod?.payment_methods}
      />
    </div>
  );
};

export default OrderPage;
