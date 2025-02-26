import {FaMinus, FaPlus} from 'react-icons/fa';
import {AppText} from '../common';
import {useHandleProductActions} from '@/hooks';
import {getCookie} from 'cookies-next';
import {useLocale} from 'next-intl';
import {useMemo} from 'react';
import {useRouter} from '@/i18n/routing';
import {convertEnglishNumbersToArabic} from '@/lib';
import styles from './ProductActionButton.module.css'; // Import the CSS module
import {useGetOrderQuery} from '@/services';
import AppButton from '../common/AppButton';

function ProductActionButton({product}) {
  const locale = useLocale();
  const router = useRouter();
  const cartId = getCookie('cartId');
  const {currentData: {orders: order} = {}} = useGetOrderQuery(cartId, {
    skip: !cartId,
  });
  const {applyAction, productTotalQuantity} = useHandleProductActions({
    product,
    variantId: product?.master?.id,
    order,
  });

  const shouldNavigateToProduct = useMemo(
    () =>
      !product?.out_of_stock && (product?.has_variants || product?.has_addons),
    [product],
  );

  const shouldAddFromOutSide = useMemo(
    () =>
      !product?.has_variants && !product?.out_of_stock && !product?.has_addons,
    [product],
  );

  const onAdd = () => {
    if (shouldAddFromOutSide) {
      applyAction('add');
    } else if (shouldNavigateToProduct) {
      router.push(`products/${product?.id}`);
    }
  };

  const onRemove = () => {
    if (shouldAddFromOutSide) {
      applyAction('remove');
    } else if (shouldNavigateToProduct) {
      router.push(`products/${product?.id}`);
    }
  };

  return (
    <div className={styles.container}>
      <AppText
        text={`${convertEnglishNumbersToArabic(
          Number(product?.master?.price || 0)?.toFixed(2),
          locale,
        )} ${product?.master?.currency}`}
        classes={`${styles.priceText} ${productTotalQuantity > 0 ? styles.priceTextActive : ''}`}
      />
      <div
        className={`${styles.buttonContainer} ${productTotalQuantity > 0 ? styles.buttonContainerActive : ''}`}>
        {productTotalQuantity > 0 ? (
          <div className={styles.buttonInnerContainer}>
            <AppButton onClick={onRemove} buttonStyle={styles.button}>
              <FaMinus size={10} />
            </AppButton>
            <AppText
              text={convertEnglishNumbersToArabic(
                Number(productTotalQuantity),
                locale,
              )}
              classes={styles.quantityText}
            />
            <AppButton onClick={onAdd} buttonStyle={styles.button}>
              <FaPlus size={10} />
            </AppButton>
          </div>
        ) : (
          <AppButton onClick={onAdd} buttonStyle={styles.button}>
            <FaPlus size={12} className={styles.addButton} />
          </AppButton>
        )}
      </div>
    </div>
  );
}

export default ProductActionButton;
