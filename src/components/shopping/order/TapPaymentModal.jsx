'use client';
import {Modal, ModalContent, ModalBody, Spinner} from '@nextui-org/react';
import {useState} from 'react';
import {AppButton} from '../../common';
import {useTranslations} from 'next-intl';
import {
  TapCard,
  Currencies,
  Direction,
  Edges,
  Locale,
  Theme,
  tokenize,
} from '@tap-payments/card-sdk';

function TapPaymentModal({
  isOpen,
  onOpenChange,
  locale,
  handlePayment,
  isChecking,
}) {
  const [isReady, setIsReady] = useState(false);
  const t = useTranslations();

  const handleSuccess = async data => {
    console.log(data);
    await handlePayment(data?.id, data?.card?.id);
    setIsReady(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={() => {
        onOpenChange();
        setIsReady(false);
      }}
      classNames={{
        body: 'py-6',
        base: 'bg-mercury',
      }}>
      <ModalContent>
        {() => (
          <>
            <ModalBody>
              <div className="flex flex-col gap-5">
                {!isReady && <Spinner size="lg" />}
                <div>
                  <TapCard
                    publicKey={process.env.NEXT_PUBLIC_TAP_PAYMENT_PUBLIC_KEY}
                    merchant={{
                      id: process.env.NEXT_PUBLIC_MERCHANT_ID,
                    }}
                    transaction={{
                      amount: 1,
                      currency: Currencies.SAR,
                    }}
                    customer={{
                      nameOnCard: '',
                      editable: true,
                    }}
                    acceptance={{
                      supportedBrands: [
                        'AMERICAN_EXPRESS',
                        'VISA',
                        'MASTERCARD',
                        'MADA',
                      ],
                      supportedCards: ['CREDIT', 'DEBIT'],
                    }}
                    fields={{
                      cardHolder: true,
                    }}
                    addons={{
                      displayPaymentBrands: true,
                      saveCard: false,
                    }}
                    interface={{
                      locale: locale === 'en' ? Locale.EN : Locale.AR,
                      theme: Theme.LIGHT,
                      edges: Edges.CURVED,
                      direction:
                        locale === 'en' ? Direction.LTR : Direction.RTL,
                    }}
                    onReady={() => setIsReady(true)}
                    onValidInput={data =>
                      console.log('onValidInputChange', data)
                    }
                    onInvalidInput={data => console.log('onInvalidInput', data)}
                    onError={data => console.log('onError', data)}
                    onSuccess={handleSuccess}
                  />
                </div>
                {isReady && (
                  <AppButton
                    name={t('pay')}
                    buttonStyle={`bg-scooter w-[100%] uppercase justify-center`}
                    buttonTxtStyle={'text-white font-[medium] text-[1rem]'}
                    onClick={tokenize}
                    isLoading={isChecking}
                  />
                )}
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default TapPaymentModal;
