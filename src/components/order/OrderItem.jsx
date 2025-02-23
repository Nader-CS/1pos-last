import Image from 'next/image';
import {AppText} from '../common';
import {convertEnglishNumbersToArabic} from '@/lib';
import {logo} from '@/assets';
import {OrderItemAction} from '.';
import styles from './OrderItem.module.css';

function OrderItem({item}) {
  const variantName =
    item?.line_item?.variant?.presentation || item?.line_item?.variant?.name;
  const productName = item?.line_item?.variant?.product?.presentation;

  const imageSource = item?.line_item?.variant?.product?.images_urls?.[0]
    ? item?.line_item?.variant?.product?.images_urls?.[0]
    : logo;

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.productImageContainer}>
          <Image
            src={imageSource}
            alt={item?.line_item?.variant?.product?.presentation}
            width={55}
            height={55}
            className={styles.productImage}
          />
        </div>
        <div className={styles.productDetailsContainer}>
          <AppText
            text={`${item?.line_item?.variant?.product?.presentation} ${variantName != productName ? variantName : ''}`}
            classes={styles.productName}
          />
          <AppText
            text={`${convertEnglishNumbersToArabic(
              Number(
                item?.line_item?.quantity * item?.line_item?.variant?.price,
              ),
            )?.toFixed(2)} ${item?.line_item?.variant?.currency}`}
            classes={styles.productPrice}
          />
        </div>
      </div>
      <OrderItemAction item={item} />
    </div>
  );
}

export default OrderItem;
