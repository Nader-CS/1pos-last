'use client';

import {useTranslations} from 'next-intl';
import AppButton from '../common/AppButton';
import styles from './OrderCheckout.module.css';
import {useHandleCheckout} from '@/hooks';
import dynamic from 'next/dynamic';
import {getCookie} from 'cookies-next';
import {useGetOrderQuery} from '@/services';

const TapSdk = dynamic(() => import('../order/TapPayment'), {ssr: false});

const OrderCheckout = () => {
  const t = useTranslations();

  const {handlePayment, tapPaymentCallback} = useHandleCheckout();

  return (
    <>
      <AppButton
        name={t('checkout')?.toUpperCase()}
        buttonStyle={styles.button}
        onClick={handlePayment}
        buttonTxtStyle={styles.buttonTxtStyle}
      />
      <TapSdk tapPaymentCallback={tapPaymentCallback} />
    </>
  );
};
export default OrderCheckout;
