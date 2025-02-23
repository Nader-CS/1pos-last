import {OrderItem} from '.';

const OrderItems = ({order}) => {
  return order?.line_items.map((item, index) => (
    <OrderItem key={index} item={item} />
  ));
};
export default OrderItems;
