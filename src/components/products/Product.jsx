import Image from 'next/image';
import styles from './Product.module.css';
import {Back} from '../common';
import {ProductDetails} from '.';
const Product = ({product}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={styles.imageSubContainer}>
          <Image
            src={product?.images_urls?.[0]}
            width={300}
            height={300}
            className={styles.productImage}
            priority
            alt={product?.presentation || 'product'}
          />
        </div>
      </div>
      <div className={styles.backContainer}>
        <Back />
      </div>
      <ProductDetails product={product} />
    </div>
  );
};
export default Product;
