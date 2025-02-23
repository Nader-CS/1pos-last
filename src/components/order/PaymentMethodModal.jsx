'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {AppText} from '../common';
import Image from 'next/image';
import {one_pay} from '@/assets';
import PaymentMethodsList from './PaymentMethodsList';
import styles from './PaymentMethodModal.module.css';

const PaymentMethodModal = ({isModalOpen, setIsModalOpen, paymentMethods}) => {
  return (
    <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
      <SheetContent side="bottom" className={styles.container}>
        <SheetHeader className={styles.header}>
          <SheetTitle>
            <div className={styles.headerContainer}>
              <Image
                src={one_pay}
                width={30}
                height={30}
                className={styles.image}
                alt="one-pay"
              />
              <AppText text="1PAY" classes={styles.text} />
            </div>
          </SheetTitle>
        </SheetHeader>
        <PaymentMethodsList
          paymentMethods={paymentMethods}
          setIsModalOpen={setIsModalOpen}
        />
      </SheetContent>
    </Sheet>
  );
};
export default PaymentMethodModal;
