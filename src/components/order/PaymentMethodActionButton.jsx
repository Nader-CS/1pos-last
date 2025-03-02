'use client';

import {useEffect, useMemo, useState} from 'react';
import AppButton from '../common/AppButton';
import styles from './PaymentMethodActionButton.module.css';
import {isIOS, isMacOs} from 'react-device-detect';
import Image from 'next/image';
import {paymentMethodIcons} from '@/lib';
import PaymentMethodModal from './PaymentMethodModal';
import {useDispatch, useSelector} from 'react-redux';
import {getPaymentMethod} from '@/selectors';
import {setPaymentMethod} from '@/slices';

const PaymentMethodActionButton = ({paymentMethods, order}) => {
  const selectedPaymentMethod = useSelector(getPaymentMethod);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isApplePayAvailable = useMemo(
    () => (isIOS || isMacOs) && window?.ApplePaySession?.canMakePayments?.(),
    [isIOS, isMacOs],
  );
  const preferredMethod = useMemo(
    () =>
      paymentMethods?.find(({name}) =>
        name?.toLowerCase().includes(isApplePayAvailable ? 'apple' : 'credit'),
      ),
    [paymentMethods],
  );

  const renderIcon = () => (
    <Image
      src={paymentMethodIcons[selectedPaymentMethod?.name]}
      width={50}
      height={50}
      className="h-auto w-auto"
      alt={`${selectedPaymentMethod?.name}-payment`}
    />
  );

  useEffect(() => {
    if (order?.payments?.length > 0) {
      dispatch(setPaymentMethod(order?.payments?.[0]));
      return;
    }
    dispatch(setPaymentMethod(preferredMethod));
  }, [paymentMethods, order]);

  const onButtonClicked = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <AppButton
        buttonStyle={styles.button}
        showArrow={true}
        onClick={onButtonClicked}
        name={selectedPaymentMethod?.presentation}
        renderIcon={selectedPaymentMethod && renderIcon}
      />
      <PaymentMethodModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        paymentMethods={paymentMethods}
      />
    </>
  );
};

export default PaymentMethodActionButton;
