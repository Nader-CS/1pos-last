'use client';
import {AppText} from '../../common';
import {IoChevronDown, IoChevronUp} from 'react-icons/io5';
import Image from 'next/image';
import {useState} from 'react';
import {colors} from '@/utils/colors';
import {convertEnglishNumbersToArabic} from '@/utils';
import {useLocale, useTranslations} from 'next-intl';
import Collapsible from 'react-collapsible';

function OrderDetailsSummary({order}) {
  const locale = useLocale();
  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const t = useTranslations();

  const renderAddons = addons => {
    return addons.map((addon, index) => (
      <AppText
        key={index}
        text={addon?.presentation}
        classes={'text-[10px] font-[regular]'}
      />
    ));
  };

  return (
    <div className="flex w-[90%] flex-col items-center gap-4 rounded-2xl bg-white">
      <div className="flex w-full items-center justify-between px-5 pt-5">
        <div className="flex gap-1">
          <AppText
            classes={'text-scooter font-[bold] text-[18px]'}
            text={t('order')}
          />
          <AppText
            classes={'text-scooter font-[bold] text-[18px]'}
            text={` #${order?.number}`}
          />
        </div>
        <AppText
          classes={'text-scooter font-[bold] text-[18px]'}
          text={t('paid')}
        />
      </div>
      <div className="h-[0.5px] w-[90%] bg-doveGray" />
      <div
        onClick={() => setIsItemsOpen(!isItemsOpen)}
        className="flex w-full cursor-pointer items-center justify-between px-5 pb-5">
        <AppText
          className="m-0 p-0"
          classes={'m-0 p-0 font-[medium] text-[12px]'}
          text={t('You_paid_for_your_order')}
          textValue={`${convertEnglishNumbersToArabic(Number(order?.grand_total), locale)?.toFixed(2)} ${order?.line_items?.[0]?.line_item?.variant?.currency}`}
          wordsBold={[
            order?.grand_total,
            order?.line_items?.[0]?.line_item?.variant?.currency,
          ]}
        />
        {isItemsOpen ? (
          <IoChevronUp size={20} color={colors.black} />
        ) : (
          <IoChevronDown size={20} color={colors.black} />
        )}
      </div>
      <div className="w-full">
        <Collapsible
          open={isItemsOpen}
          contentInnerClassName="bg-polar flex w-full flex-col rounded-bl-2xl rounded-br-xl p-5 gap-4">
          {order?.line_items?.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={item?.line_item?.variant?.product?.images_urls[0]}
                  alt={item?.line_item?.variant?.product?.presentation}
                  width={35}
                  height={35}
                  className="h-[35px] w-[35px] rounded-lg"
                />
                <div className="flex max-w-[75%] flex-col gap-[1px]">
                  <AppText
                    text={`${convertEnglishNumbersToArabic(Number(item?.line_item?.quantity), locale)} X ${item?.line_item?.variant?.product?.presentation}`}
                    classes={'text-[14px] font-[regular]'}
                  />
                  {item?.line_item?.variant?.name !==
                    item?.line_item?.variant?.product?.name && (
                    <AppText
                      text={item?.line_item?.variant?.name}
                      classes={'text-[10px] font-[regular]'}
                    />
                  )}
                  {item?.line_item?.addons?.length > 0 &&
                    renderAddons(item?.line_item?.addons)}
                </div>
              </div>
              <AppText
                text={`${convertEnglishNumbersToArabic(
                  Number(
                    item?.line_item?.quantity * item?.line_item?.variant?.price,
                  ),
                )?.toFixed(2)} ${item?.line_item?.variant?.currency}`}
                classes={'text-[12px] font-[bold]'}
              />
            </div>
          ))}
        </Collapsible>
      </div>
    </div>
  );
}

export default OrderDetailsSummary;
