import React from 'react';
import {AppText} from '../../common';
import moment from 'moment';
import {useTranslations} from 'next-intl';
import {RateOrderItems, RateOrderRatings} from '.';

function RateOrder({order}) {
  const t = useTranslations();

  return (
    <div className="flex w-[100%] flex-col items-center justify-center gap-7 py-8">
      <AppText
        classes={'text-scooter font-[semiBold] text-[20px]'}
        text={t('how_was_your_order')}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <AppText
          classes={'font-[medium] text-[14px]'}
          text={t('picked_at_date')}
          textValue={moment(order?.completed_at || order?.created_at).format(
            'ddd, DD MMM YYYY, hh:mm A',
          )}
          wordsBold={[t('picked'), t('at')]}
        />
        <AppText
          classes={'font-[medium] text-[14px]'}
          text={t('order_number_num')}
          textValue={order?.number}
          wordsBold={[t('order'), t('number')]}
        />
      </div>
      <RateOrderItems order={order} />
      <AppText
        classes={'font-[medium] text-[1rem] max-w-[70%] text-center'}
        text={t('please_take_a_moment_to_rate_your_order')}
      />
      <RateOrderRatings orderId={order?.id} />
    </div>
  );
}

export default RateOrder;
