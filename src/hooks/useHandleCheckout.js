'use client';

import {getPaymentMethod} from '@/selectors';
import {GoSell} from '@tap-payments/gosell';
import {useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import useAlerts from './useAlerts';
import {getCookie} from 'cookies-next';
import {useGetOrderQuery} from '@/services';
import {useTranslations} from 'next-intl';

const useHandleCheckout = () => {
  const userSelectedPaymentMethod = useSelector(getPaymentMethod);
  const {errorAlert} = useAlerts();
  const cartId = getCookie('cartId');
  const {currentData: {orders: order} = {}} = useGetOrderQuery(cartId, {
    skip: !cartId,
  });
  const t = useTranslations();

  const orderCurrentPaymentMethod = useMemo(
    () => order?.payments?.[0],
    [order],
  );
  const tapPaymentCallback = response => {
    if (response?.callback?.errors?.length > 0) {
      const error = response?.callback?.errors?.[0];
      errorAlert(typeof error == 'string' ? error : t('something_went_wrong'));
      return;
    }
  };

  const handlePayment = async () => {
    if (!orderCurrentPaymentMethod) {
      GoSell.openLightBox();
      return;
    }
  };
  return {handlePayment, tapPaymentCallback};
};
export default useHandleCheckout;
