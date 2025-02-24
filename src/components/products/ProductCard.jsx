import Image from 'next/image';
import {Link} from '@/i18n/routing';
import {AppText} from '../common';
import {logo} from '@/assets';
import {useMemo} from 'react';
import styles from './ProductCard.module.css';
import {ProductActionButton} from '.';

function ProductCard({product}) {
  const productImage = useMemo(
    () => product?.images_urls?.[0] || logo,
    [product],
  );

  return (
    <div className={styles.container}>
      <Link className={styles.subContainer} href={`/products/${product?.id}`}>
        <Image
          src={productImage}
          alt={product?.presentation}
          width={60}
          height={60}
          className={styles.productImg}
          priority
          fetchPriority="high"
        />
        <div className={styles.details}>
          <AppText text={product?.presentation} classes={styles.productName} />
          <AppText
            text={product?.description}
            classes={styles.productDescription}
          />
        </div>
      </Link>
      <ProductActionButton product={product} />
    </div>
  );
}

export default ProductCard;
