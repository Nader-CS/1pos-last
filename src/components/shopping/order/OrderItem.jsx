import Image from 'next/image';
import {OrderItemAction} from '.';
import {AppText} from '../../common';
import {convertEnglishNumbersToArabic} from '@/utils';

function OrderItem({item}) {
  const variantName =
    item?.line_item?.variant?.presentation || item?.line_item?.variant?.name;
  const productName = item?.line_item?.variant?.product?.presentation;

  const imageSource = item?.line_item?.variant?.product?.images_urls?.[0]
    ? item?.line_item?.variant?.product?.images_urls?.[0]
    : '/logo.png';

  return (
    <div className="flex items-center justify-between rounded-2xl p-3 shadow-lg">
      <div className="flex max-w-[65%] items-center gap-2">
        <Image
          src={imageSource}
          alt={item?.line_item?.variant?.product?.presentation}
          width={55}
          height={55}
          className="h-[55px] w-[55px] rounded-lg border-1 border-mercury"
        />
        <div className="flex flex-col gap-1">
          <AppText
            text={`${item?.line_item?.variant?.product?.presentation} ${variantName != productName ? variantName : ''}`}
            classes={'text-[1rem] font-[regular]'}
          />
          <AppText
            text={`${convertEnglishNumbersToArabic(
              Number(
                item?.line_item?.quantity * item?.line_item?.variant?.price,
              ),
            )?.toFixed(2)} ${item?.line_item?.variant?.currency}`}
            classes={'text-[0.8rem] font-[bold]'}
          />
        </div>
      </div>
      <OrderItemAction item={item} />
    </div>
  );
}

export default OrderItem;
