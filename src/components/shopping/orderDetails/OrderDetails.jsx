import React from 'react';
import {AppText} from '../../common';
import {DownloadApp, OrderDetailsSummary, ReceiptEmail} from '.';
import RateButton from './RateButton';
import {useTranslations} from 'next-intl';

function OrderDetails({order}) {
  const t = useTranslations();
  return (
    <div className="flex w-[100%] flex-col items-center justify-center gap-6 py-8">
      <AppText
        classes={'text-scooter font-[semiBold] text-[20px]'}
        text={t('congratulations')}
      />
      <AppText
        classes={'font-[medium] text-[14px]'}
        text={t('your_payment_was_successful')}
      />
      <OrderDetailsSummary order={order} />
      <ReceiptEmail />
      <DownloadApp />
      <RateButton order={order} />
    </div>
  );
}

export default OrderDetails;
