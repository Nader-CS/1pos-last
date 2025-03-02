'use client';

import {
  useGetOrderQuery,
  useUpdateCartItemAddonsMutation,
} from '@/services/order';
import {useCallback} from 'react';
import _ from 'lodash';
import {useHandleProduct, useHandleProductActions} from '@/hooks';
import {Addons, ProductVariants} from '.';
import {getCookie} from 'cookies-next';
import {FaPlus, FaMinus} from 'react-icons/fa6';
import {useTranslations} from 'next-intl';
import AppButton from '../common/AppButton';
import {AppText, Spinner} from '../common';
import {convertEnglishNumbersToArabic} from '@/lib';
import styles from './ProductDetails.module.css';

const ProductDetails = ({product}) => {
  const cartId = getCookie('cartId');
  const {currentData: {orders: order} = {}} = useGetOrderQuery(cartId, {
    skip: !cartId,
  });
  const t = useTranslations();

  const [updateCartItemAddon] = useUpdateCartItemAddonsMutation();

  const {
    ProductNameExceptLastWord,
    lastProductWord,
    currency,
    selectedVariantPrice,
    selectedVariant,
    setSelectedVariant,
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

  const {applyAction, variantQuantity, isAdding} = useHandleProductActions({
    product,
    variantId: selectedVariant?.id,
    order,
    selectedAddonsOptions,
  });

  const renderProductName = useCallback(() => {
    return product?.presentation?.split(' ')?.length > 1 ? (
      <>
        <AppText text={_.capitalize(ProductNameExceptLastWord)} />
        <AppText
          text={_.capitalize(lastProductWord)}
          classes={styles.productLastName}
        />
      </>
    ) : (
      <AppText text={_.capitalize(product?.presentation)} />
    );
  }, [product, ProductNameExceptLastWord, lastProductWord]);

  const onAddToCart = () => {
    if (!allRequiredAddonsSelected) {
      handleAllRequiredAddonsNotSelected();
    } else {
      applyAction('add');
    }
  };

  const renderActionButtons = () => {
    if (isAdding) {
      return (
        <div className={styles.actionsContainer}>
          <Spinner size={30} />
        </div>
      );
    }

    if (variantQuantity > 0) {
      return (
        <div className={styles.actionsContainer}>
          <button onClick={() => applyAction('add')}>
            <FaPlus className={styles.whiteText} />
          </button>
          <AppText
            text={convertEnglishNumbersToArabic(variantQuantity)}
            classes={styles.quantity}
          />
          <button onClick={() => applyAction('remove')}>
            <FaMinus className={styles.whiteText} />
          </button>
        </div>
      );
    }

    return (
      <AppButton
        onClick={onAddToCart}
        name={t('add_to_cart')}
        buttonTxtStyle={styles.whiteText}
        buttonStyle={styles.addToCartButton}
      />
    );
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <div>
          <div className={styles.headerContainer}>
            <div>{renderProductName()}</div>
            <div className={styles.priceContainer}>
              <AppText
                classes={styles.price}
                text={`${selectedVariantPrice} ${currency}`}
              />
            </div>
          </div>
          <div className={styles.descContainer}>
            <AppText
              classes={styles.description}
              text={_.capitalize(product?.description)}
            />
          </div>
        </div>
        <div className={styles.divider} />
        <div>
          <ProductVariants
            product={product}
            setSelectedVariant={setSelectedVariant}
            selectedVariant={selectedVariant}
            currency={currency}
          />
        </div>

        <div className={styles.addonsContainer}>
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
      {order && (
        <div className={styles.actionMainContainer}>
          {renderActionButtons()}
        </div>
      )}
    </>
  );
};
export default ProductDetails;
