import {landing} from '@/assets';
import Image from 'next/image';
import {AppText} from '../common';
import {useTranslations} from 'next-intl';
import styles from './ProductsHeader.module.css';

const ProductsHeader = () => {
  const t = useTranslations();
  return (
    <div className={styles.container}>
      <Image
        src={landing}
        alt="categories-image-header"
        className={styles.headerImage}
        priority
      />
      <AppText text={t('menu')} classes={styles.headerText} />
    </div>
  );
};
export default ProductsHeader;
