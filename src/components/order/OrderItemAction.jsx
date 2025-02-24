'use client';
import {FaMinus, FaPlus, FaRegTrashAlt} from 'react-icons/fa';
import {useHandleProductActions} from '@/hooks';
import {useLocale} from 'next-intl';
import {AppText} from '../common';
import {convertEnglishNumbersToArabic} from '@/lib';
import {getCookie} from 'cookies-next';
import {useGetOrderQuery} from '@/services';
import styles from './OrderItemAction.module.css';
import AppButton from '../common/AppButton';

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
      <AppButton
        onClick={() => applyAction('remove')}
        buttonStyle={styles.button}>
        {quantity > 1 ? (
          <FaMinus size={11} color={'white'} />
        ) : (
          <FaRegTrashAlt size={11} color={'white'} />
        )}
      </AppButton>

      <AppText
        text={convertEnglishNumbersToArabic(Number(quantity), locale)}
        classes={styles.quantity}
      />
      <AppButton onClick={() => applyAction('add')} className={styles.button}>
        <FaPlus size={11} color={'white'} />
      </AppButton>
    </div>
  );
}

export default OrderItemAction;
