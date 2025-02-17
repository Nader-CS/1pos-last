'use client';
import {Modal, ModalContent, ModalHeader, ModalBody} from '@nextui-org/react';
import Image from 'next/image';
import {AppText, CheckBox} from '../../common';
import {OrderActionButton} from '.';
import {useTranslations} from 'next-intl';

function PaymentModal({
  isOpen,
  onOpenChange,
  paymentMethods,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}) {
  const t = useTranslations();
  const handleSelect = method => {
    setSelectedPaymentMethod(method);
    onOpenChange(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      placement={'bottom'}
      onOpenChange={onOpenChange}
      size="5xl"
      radius="none"
      classNames={{
        body: 'py-6',
        base: ' bg-mercury rounded-t-2xl',
      }}>
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="">
              <div className="flex gap-1">
                <Image
                  src={'/one_pay.png'}
                  width={25}
                  height={25}
                  className="h-[25px] w-[25px]"
                  alt={'1PAY'}
                />
                <AppText
                  text="1pay"
                  classes={'text-black font-[bold] text-[1.2rem]'}
                />
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-3 pb-7">
                {paymentMethods.map((method, index) => (
                  <OrderActionButton
                    key={index}
                    onClick={() => handleSelect(method)}
                    disabled={selectedPaymentMethod?.id == method?.id}>
                    <div className="flex items-center justify-center gap-3">
                      <CheckBox
                        selected={selectedPaymentMethod?.id == method?.id}
                      />
                      <Image
                        src={
                          method.name === 'credit'
                            ? '/creditCard.png'
                            : '/apple.png'
                        }
                        width={30}
                        height={30}
                        alt={method.name}
                      />
                      <AppText
                        text={
                          method.name === 'credit'
                            ? t('credit_debit_card')
                            : t('apple_pay')
                        }
                        classes={'text-[regular] text-[0.9rem]'}
                      />
                    </div>
                  </OrderActionButton>
                ))}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default PaymentModal;
