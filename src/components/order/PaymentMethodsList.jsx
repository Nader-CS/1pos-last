import Image from 'next/image';
import {AppText, CheckBox} from '../common';
import {paymentMethodIcons} from '@/lib';
import _ from 'lodash';
import styles from './PaymentMethodsList.module.css';
import AppButton from '../common/AppButton';
import {useDispatch, useSelector} from 'react-redux';
import {setPaymentMethod} from '@/slices';
import {getPaymentMethod} from '@/selectors';

const PaymentMethodsList = ({paymentMethods, setIsModalOpen}) => {
  const dispatch = useDispatch();
  const selectedMethod = useSelector(getPaymentMethod);

  const onChangePaymentMethod = method => {
    if (method?.id == selectedMethod?.id) {
      return;
    }
    dispatch(setPaymentMethod(method));
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {paymentMethods?.map((method, index) => (
        <AppButton
          buttonStyle={styles.subContainer}
          key={index}
          onClick={() => onChangePaymentMethod(method)}>
          <CheckBox selected={method?.id == selectedMethod?.id} />
          <Image
            src={paymentMethodIcons[method?.name]}
            width={50}
            height={50}
            className={styles.image}
            alt={`${method?.name}-payment`}
          />
          <AppText text={_.startCase(method?.name)} classes={styles.text} />
        </AppButton>
      ))}
    </div>
  );
};
export default PaymentMethodsList;
