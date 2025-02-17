import React from 'react';
import {AppText} from '../../common';
import Image from 'next/image';
import {convertEnglishNumbersToArabic} from '@/utils';
import {useLocale, useTranslations} from 'next-intl';

function RateOrderItems({order}) {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <div className="flex h-20 w-full items-center justify-between bg-white">
      <div className="flex w-[30%] items-center justify-center">
        <AppText
          classes={'font-[medium] text-[1rem]'}
          text={t('items')}
          textValue={convertEnglishNumbersToArabic(
            Number(order?.line_items?.length),
            locale,
          )}
        />
      </div>
      <div className="h-full w-[1px] bg-mercury" />
      <div className="flex w-[70%] items-center gap-3 overflow-x-auto whitespace-nowrap px-2 scrollbar-hide">
        {order?.line_items?.map((item, index) => (
          <Image
            key={index}
            src={item?.line_item?.variant?.product?.images_urls[0]}
            alt={item?.line_item?.variant?.product?.presentation}
            width={50}
            height={50}
            className="h-[50px] w-[50]"
          />
        ))}
      </div>
    </div>
  );
}

export default RateOrderItems;
