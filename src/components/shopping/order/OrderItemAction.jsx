'use client';
import {FaMinus, FaPlus, FaRegTrashAlt} from 'react-icons/fa';
import {AppText} from '../../common';
import {useHandleProductActions} from '@/hooks';
import {useGetOrderQuery} from '@/services/order';
import {getCookie} from 'cookies-next';
import {colors, convertEnglishNumbersToArabic} from '@/utils';
import {useLocale} from 'next-intl';

function OrderItemAction({item}) {
  const locale = useLocale();
  const cartId = getCookie('cartId');
  const {currentData: {orders: order} = {}} = useGetOrderQuery(cartId, {
    skip: !cartId,
  });
  const {applyAction, quantity} = useHandleProductActions({
    product: item?.line_item,
    variantId: item?.line_item?.variant?.id,
    order,
  });
  return (
    <div className="flex h-[30px] w-[30%] max-w-32 items-center justify-between">
      <button
        onClick={() => applyAction('remove')}
        className="flex h-full w-[35%] items-center justify-center rounded-md bg-black">
        {quantity > 1 ? (
          <FaMinus size={11} color={colors.white} />
        ) : (
          <FaRegTrashAlt size={11} color={colors.white} />
        )}
      </button>

      <AppText
        text={convertEnglishNumbersToArabic(Number(quantity), locale)}
        classes={
          'text-[0.85rem] h-full font-[medium] text-black bg-wildSand w-[45%] flex items-center justify-center '
        }
      />
      <button
        onClick={() => applyAction('add')}
        className="flex h-full w-[35%] items-center justify-center rounded-md bg-black">
        <FaPlus size={11} color={colors.white} />
      </button>
    </div>
  );
}

export default OrderItemAction;
