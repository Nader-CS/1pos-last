import {getOrderServer} from '@/actions';
import {OrderDetails} from '@/components';

const OrderDetailsPage = async ({params}) => {
  const id = (await params)?.id;
  const order = await getOrderServer(id);
  return (
    <div className="flex flex-1 flex-col bg-wildSand">
      <OrderDetails order={order?.orders} />
    </div>
  );
};
export default OrderDetailsPage;
