'use client';

import {
  useGetOrderQuery,
  useUpdateCartItemAddonsMutation,
} from '@/services/order';
import Image from 'next/image';
import {useCallback, useMemo} from 'react';
import {AppButton, AppText} from '../../common';
import _ from 'lodash';
import {useHandleProduct, useHandleProductActions} from '@/hooks';
import {Addons, ProductVariants} from '.';
import {getCookie} from 'cookies-next';
import {convertEnglishNumbersToArabic} from '@/utils';
import {FaPlus, FaMinus} from 'react-icons/fa6';
import {IoIosArrowBack} from 'react-icons/io';
import {useRouter} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import {Spinner} from '@nextui-org/react';

const ProductDetails = ({product}) => {
  const cartId = getCookie('cartId');
  const {currentData: {orders: order} = {}} = useGetOrderQuery(cartId, {
    skip: !cartId,
  });
  const t = useTranslations();
  const router = useRouter();

  const [updateCartItemAddon] = useUpdateCartItemAddonsMutation();

  const imageSource = useMemo(
    () => product?.images_urls?.[0] || '/logo',
    [product],
  );
  const {
    ProductNameExceptLastWord,
    lastProductWord,
    currency,
    selectedVariantPrice,
    selectedVariant,
    setSelectedVariant,
    setIsSearchingForVariant,
    allRequiredAddonsSelected,
    isAddonsExist,
    requiredAddonRefs,
    selectedAddonsOptions,
    setSelectedAddonsOptions,
    handleAllRequiredAddonsNotSelected,
    highlightedSection,
    setHighlightedSection,
  } = useHandleProduct({
    product,
  });

  const {applyAction, quantity, isAdding} = useHandleProductActions({
    product,
    variantId: selectedVariant?.id,
    order,
    selectedAddonsOptions,
  });

  const renderProductName = useCallback(() => {
    return product?.presentation?.split(' ')?.length > 1 ? (
      <>
        <AppText
          text={_.capitalize(ProductNameExceptLastWord)}
          classes={`text-mainFontSize`}
        />
        <AppText
          text={_.capitalize(lastProductWord)}
          classes={`text-semiBiggerFontSize text-scooter font-bold`}
        />
      </>
    ) : (
      <AppText
        classes={`text-thirdFontSize`}
        text={_.capitalize(product?.presentation)}
      />
    );
  }, [product, ProductNameExceptLastWord, lastProductWord]);

  const onAddToCart = () => {
    if (!allRequiredAddonsSelected) {
      handleAllRequiredAddonsNotSelected();
    } else {
      applyAction('add');
    }
  };

  const onBack = () => {
    router.back();
  };

  const renderActionButtons = () => {
    if (isAdding) {
      return (
        <div className="text-center">
          <Spinner size="lg" />
        </div>
      );
    }

    if (quantity > 0) {
      return (
        <div className="flex flex-row items-center justify-center gap-10 bg-scooter py-5">
          <button onClick={() => applyAction('add')}>
            <FaPlus className="text-white" />
          </button>
          <AppText
            text={convertEnglishNumbersToArabic(quantity)}
            classes={`text-white font-bold`}
          />
          <button onClick={() => applyAction('remove')}>
            <FaMinus className="text-white" />
          </button>
        </div>
      );
    }

    return (
      <AppButton
        onClick={onAddToCart}
        name={t('add_to_cart')}
        buttonTxtStyle={`text-white`}
        buttonStyle={
          'bg-scooter w-[100%] flex justify-center items-center py-[2rem] rounded-none'
        }
      />
    );
  };

  return (
    <div className="relative h-[100%]">
      <div className="flex justify-center bg-white font-bold">
        <Image src={imageSource} width={200} height={400} alt="product" />
      </div>
      <div className="absolute left-3 top-3 cursor-pointer">
        <IoIosArrowBack size={30} onClick={onBack} />
      </div>
      <div className="p-5 pb-20">
        <div>
          <div className="flex items-center justify-between">
            <div>{renderProductName()}</div>
            <div className="rounded-full bg-black px-10 py-2">
              <p className="text-white">
                {selectedVariantPrice} {currency}
              </p>
            </div>
          </div>
          <div className="mb-4 mt-2">
            <AppText
              classes={`text-secondaryFontSize`}
              text={_.capitalize(product?.description)}
            />
          </div>
        </div>
        <div className="h-[0.05rem] w-[100%] bg-silver" />
        <div>
          <ProductVariants
            product={product}
            setSelectedVariant={setSelectedVariant}
            selectedVariant={selectedVariant}
            currency={currency}
            setIsSearchingForVariant={setIsSearchingForVariant}
          />
        </div>

        <div className="flex flex-col gap-2">
          {isAddonsExist && (
            <Addons
              product={product}
              selectedAddonsOptions={selectedAddonsOptions}
              setSelectedAddonsOptions={setSelectedAddonsOptions}
              currency={currency}
              selectedVariant={selectedVariant}
              updateCartItemAddon={updateCartItemAddon}
              requiredAddonRefs={requiredAddonRefs}
              highlightedSection={highlightedSection}
              setHighlightedSection={setHighlightedSection}
            />
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-[100%]">{renderActionButtons()}</div>
    </div>
  );
};
export default ProductDetails;
