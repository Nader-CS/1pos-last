'use client';
import {FaMinus, FaPlus, FaRegTrashAlt} from 'react-icons/fa';
import {useHandleProductActions} from '@/hooks';
import {useLocale} from 'next-intl';
import {AppText} from '../common';
import {convertEnglishNumbersToArabic} from '@/lib';
import {getCookie} from 'cookies-next';
import {useGetOrderQuery} from '@/services';
import styles from './OrderItemAction.module.css';

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

  if (!quantity) {
    return;
  }

  return (
    <div className={styles.container}>
      <button onClick={() => applyAction('remove')} className={styles.button}>
        {quantity > 1 ? (
          <FaMinus size={11} color={'white'} />
        ) : (
          <FaRegTrashAlt size={11} color={'white'} />
        )}
      </button>

      <AppText
        text={convertEnglishNumbersToArabic(Number(quantity), locale)}
        classes={styles.quantity}
      />
      <button onClick={() => applyAction('add')} className={styles.button}>
        <FaPlus size={11} color={'white'} />
      </button>
    </div>
  );
}

export default OrderItemAction;
