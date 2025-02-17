'use client';
import {FaMinus, FaPlus} from 'react-icons/fa';
import {AppText} from '../../common';
import {colors, convertEnglishNumbersToArabic} from '@/utils';
import {getCookie} from 'cookies-next';
import {useGetOrderQuery} from '@/services/order';
import {useLocale} from 'next-intl';
import {useMemo} from 'react';
import {useRouter} from '@/i18n/routing';

function ProductActionButton({product}) {
  const locale = useLocale();
  const router = useRouter();
  const cartId = getCookie('cartId');
  const {currentData: {orders: order} = {}} = useGetOrderQuery(cartId, {
    skip: !cartId,
  });

  const onAdd = () => {
    router.push(`${product?.id}`);
  };

  const totalQuantity = useMemo(() => {
    const productLineItems = order?.line_items?.filter(
      item => item?.line_item?.variant?.product?.id == product?.id,
    );
    return productLineItems?.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue?.line_item?.quantity),
      0,
    );
  }, [order, product]);

  return (
    <div className="flex h-full w-[20%] flex-col items-center justify-center gap-1">
      <AppText
        text={`${product?.master?.price || 0} ${product?.master?.currency}`}
        classes={`text-[0.75rem] font-[medium] ${totalQuantity > 0 ? 'text-scooter' : 'text-doveGray'}`}
      />
      <div
        className={`${totalQuantity > 0 ? 'border-scooter' : 'border-gray'} flex h-full w-full items-center justify-center rounded-lg border-1`}>
        {totalQuantity > 0 ? (
          <div className="flex w-full items-center justify-between px-2">
            <button onClick={() => router.push(`${product?.id}`)}>
              <FaMinus size={10} color={colors.doveGray} />
            </button>
            <AppText
              text={convertEnglishNumbersToArabic(
                Number(totalQuantity),
                locale,
              )}
              classes={'text-[0.75rem] font-[medium] text-scooter'}
            />
            <button onClick={() => router.push(`${product?.id}`)}>
              <FaPlus size={10} color={colors.doveGray} />
            </button>
          </div>
        ) : (
          <button onClick={onAdd}>
            <FaPlus size={12} color={colors.doveGray} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductActionButton;
