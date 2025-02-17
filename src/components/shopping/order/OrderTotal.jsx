import {convertEnglishNumbersToArabic} from '@/utils';
import {AppText} from '../../common';
import {useTranslations} from 'next-intl';

const OrderTotalItem = ({
  title,
  firstTxt,
  secondTxt,
  firstStyle,
  secondStyle,
  locale,
}) => {
  return (
    <div className="flex items-center justify-between">
      <AppText text={title} classes={firstStyle} />
      <div className="flex items-center gap-1">
        <AppText
          text={convertEnglishNumbersToArabic(
            Number(firstTxt)?.toFixed(2),
            locale,
          )}
          classes={secondStyle}
        />
        <AppText text={secondTxt} classes={secondStyle} />
      </div>
    </div>
  );
};

const OrderTotal = ({order, locale}) => {
  const currency = order?.line_items?.[0]?.line_item?.variant?.currency;
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-2">
      <OrderTotalItem
        title={t('items_total')}
        firstTxt={order?.total_price}
        secondTxt={currency}
        firstStyle={'text-[0.85rem] font-[regular] text-doveGray uppercase'}
        secondStyle={'text-[0.85rem] font-[bold] text-black'}
        locale={locale}
      />
      <OrderTotalItem
        title={t('vat')}
        firstTxt={order?.total_tax || '0.0'}
        secondTxt={currency}
        firstStyle={'text-[0.85rem] font-[regular] text-doveGray uppercase'}
        secondStyle={'text-[0.85rem] font-[bold] text-black'}
        locale={locale}
      />
      <OrderTotalItem
        title={t('grand_total')}
        firstTxt={order?.grand_total}
        secondTxt={currency}
        firstStyle={'text-[1rem] font-[bold] text-black uppercase'}
        secondStyle={'text-[1rem] font-[bold] text-black'}
        locale={locale}
      />
    </div>
  );
};
export default OrderTotal;
