'use client';
import {
  useGetOrderQuery,
  useUpdateOrderDeliveryMethodMutation,
} from '@/services/order';
import {
  AppButton,
  AppText,
  CheckBox,
  ErrorView,
  LoadingView,
} from '../../common';
import {commonQueriesConfig} from '@/utils';
import {OrderActionButton, OrderItem, OrderTotal} from '.';
import Image from 'next/image';
import {getCookie} from 'cookies-next';
import {useEffect, useState} from 'react';
import {useDisclosure} from '@nextui-org/react';
import PaymentModal from './PaymentModal';
import TapPaymentModal from './TapPaymentModal';
import {isSafari} from 'react-device-detect';
import {useHandleCheckout} from '@/hooks';
import {useLocale} from 'use-intl';
import {useRouter} from '@/i18n/routing';
import {useTranslations} from 'next-intl';

function Order({orderId, deliveryMethods, paymentsMethod}) {
  const tableId = getCookie('tableId');
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();

  const filterPaymentMethod = paymentsMethod?.filter(method =>
    isSafari
      ? ['apple pay', 'credit'].includes(method?.name)
      : ['credit'].includes(method?.name),
  );
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const {
    isOpen: isCreditTapOpen,
    onOpen: onCreditTapOpen,
    onOpenChange: onOpenChangeCreditTapOpen,
  } = useDisclosure();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    filterPaymentMethod?.find(method => ['credit'].includes(method?.name)) ||
      {},
  );

  const {
    currentData: {orders: order} = {},
    isLoading: isFetchingOrder,
    isError: isOrderError,
    refetch: refetchOrder,
    error: orderError,
  } = useGetOrderQuery(orderId, {
    skip: !orderId,
    ...commonQueriesConfig,
  });

  const [
    updateOrderDeliveryMethod,
    {isLoading: isUpdatingOrderDeliveryMethod},
  ] = useUpdateOrderDeliveryMethodMutation();

  const toggleDeliveryMethod = async methodName => {
    const method = deliveryMethods.find(method => method?.name === methodName);
    const response = await updateOrderDeliveryMethod({
      orderId: order?.id,
      body: {delivery_method_id: method?.id},
    });
    if (!response?.error) {
      setSelectedDeliveryMethod(method);
    }
  };

  useEffect(() => {
    if (deliveryMethods && order?.id) {
      const selectedDeliveryMethod = tableId
        ? deliveryMethods.find(method => method?.name === 'fast_track')
        : deliveryMethods.find(method => method?.name === 'pickup');
      toggleDeliveryMethod(selectedDeliveryMethod?.name);
    }
  }, [tableId, deliveryMethods, order?.id]);

  const {handlePayment, isChecking} = useHandleCheckout({
    order,
    onOpenChange:
      selectedPaymentMethod?.name === 'credit'
        ? onOpenChangeCreditTapOpen
        : onOpenChangeCreditTapOpen,
    selectedPaymentMethod,
    router,
  });

  useEffect(() => {
    if (order?.line_items?.length === 0) {
      router.push('/products');
    }
  }, [order?.line_items]);
  return (
    <LoadingView isLoading={isFetchingOrder}>
      <ErrorView
        hasError={isOrderError}
        error={orderError?.errors?.[0]}
        onRetry={refetchOrder}>
        <div>
          <div className="flex w-full flex-col gap-3 bg-white px-5 py-7">
            {order?.line_items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </div>
          <div className="flex flex-col gap-8 px-5 py-7">
            <div className="flex flex-col gap-2">
              <AppText
                text={t('ordering_method')}
                classes={'text-black font-[bold] text-[1.2rem]'}
              />
              <div className="flex items-center gap-3">
                {tableId && (
                  <OrderActionButton
                    disabled={
                      selectedDeliveryMethod?.name === 'fast_track' ||
                      isUpdatingOrderDeliveryMethod
                    }
                    onClick={() => {
                      toggleDeliveryMethod('fast_track');
                    }}>
                    <div className="flex items-center justify-center gap-3">
                      <CheckBox
                        selected={selectedDeliveryMethod?.name === 'fast_track'}
                      />
                      <Image
                        src="/served.png"
                        width={45}
                        height={45}
                        alt="served"
                      />
                      <AppText
                        text={t('served')}
                        classes={'text-[regular] text-[0.9rem]'}
                      />
                    </div>
                  </OrderActionButton>
                )}
                <OrderActionButton
                  disabled={
                    selectedDeliveryMethod?.name === 'pickup' ||
                    isUpdatingOrderDeliveryMethod
                  }
                  onClick={() => {
                    toggleDeliveryMethod('pickup');
                  }}>
                  <div className="flex items-center justify-center gap-1">
                    <CheckBox
                      selected={selectedDeliveryMethod?.name === 'pickup'}
                    />
                    <Image
                      src="/pickup.png"
                      width={45}
                      height={45}
                      alt="pickup"
                    />
                    <AppText
                      text={t('pick_up')}
                      classes={'text-[regular] text-[0.9rem]'}
                    />
                  </div>
                </OrderActionButton>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <Image
                  src={'/one_pay.png'}
                  width={25}
                  height={25}
                  className="h-[25px] w-[25px]"
                  alt={'1PAY'}
                />
                <AppText
                  text={t('1pay')}
                  classes={'text-black font-[bold] text-[1.2rem]'}
                />
              </div>
              <OrderActionButton
                onClick={onOpen}
                disabled={!isSafari}
                showArrow={isSafari}
                locale={locale}>
                <div className="flex items-center justify-center gap-3">
                  <Image
                    src={
                      selectedPaymentMethod?.name === 'credit'
                        ? '/creditCard.png'
                        : '/apple.png'
                    }
                    width={35}
                    height={35}
                    alt={selectedPaymentMethod?.name}
                  />
                  <AppText
                    text={
                      selectedPaymentMethod?.name === 'credit'
                        ? t('credit_debit_card')
                        : t('apple_pay')
                    }
                    classes={'text-[regular] text-[0.9rem]'}
                  />
                </div>
              </OrderActionButton>
            </div>
            <OrderTotal order={order} locale={locale} />
            <AppButton
              name={t('checkout')}
              buttonStyle={`bg-scooter w-[100%] uppercase justify-center`}
              buttonTxtStyle={'text-white font-[medium] text-[1.2rem]'}
              onClick={
                selectedPaymentMethod?.name === 'credit'
                  ? onCreditTapOpen
                  : onCreditTapOpen
              }
            />
          </div>
        </div>
        <PaymentModal
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          paymentMethods={filterPaymentMethod}
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
        />
        <TapPaymentModal
          onOpenChange={onOpenChangeCreditTapOpen}
          isOpen={isCreditTapOpen}
          handlePayment={handlePayment}
          isChecking={isChecking}
          locale={locale}
        />
      </ErrorView>
    </LoadingView>
  );
}

export default Order;
