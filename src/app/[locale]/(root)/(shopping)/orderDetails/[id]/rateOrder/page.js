import {getOrderServer} from '@/actions';
import {RateOrder} from '@/components';
import React from 'react';

const RateOrderPage = async ({params}) => {
  const id = (await params).id;
  const order = await getOrderServer(id);

  return (
    <div className="flex flex-1 flex-col bg-wildSand">
      <RateOrder order={order?.orders} />
    </div>
  );
};

export default RateOrderPage;
