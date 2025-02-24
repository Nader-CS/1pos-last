'use client';

import {useTranslations} from 'next-intl';
import AppButton from '../common/AppButton';
import styles from './OrderCheckout.module.css';

const OrderCheckout = () => {
  const t = useTranslations();
  return (
    <AppButton
      name={t('checkout')?.toUpperCase()}
      buttonStyle={styles.button}
      buttonTxtStyle={styles.buttonTxtStyle}
    />
  );
};
export default OrderCheckout;
