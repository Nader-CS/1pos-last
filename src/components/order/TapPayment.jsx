'use client';
import {useGetOrderQuery} from '@/services';
import {GoSell} from '@tap-payments/gosell';
import {getCookie} from 'cookies-next';

const TapPaymentDialog = ({tapPaymentCallback}) => {
  const lang = getCookie('NEXT_LOCALE') || 'en';
  const cartId = getCookie('cartId');
  const {currentData: {orders: order} = {}} = useGetOrderQuery(cartId, {
    skip: !cartId,
  });
  return (
    <GoSell
      gateway={{
        publicKey: `pk_live_whNoy7JjErLUltd6mnHu8Ifz`,
        language: lang,
        contactInfo: true,
        callback: tapPaymentCallback,
        supportedCurrencies: 'gcc',
        supportedPaymentMethods: 'all',
        saveCardOption: false,
        customerCards: false,
        notifications: 'standard',
      }}
      order={{
        amount: order?.total_after_discounts,
        currency: order?.store?.zone?.country?.currency_en,
      }}
      transaction={{
        mode: 'authorize',
        authorize: {
          auto: 'VOID',
          saveCard: false,
          threeDSecure: true,
          redirect: 'https://www.dummy.com',
          post: 'https://www.dummy.com',
        },
      }}
    />
  );
};

export default TapPaymentDialog;
