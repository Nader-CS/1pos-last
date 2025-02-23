import {useTranslations} from 'next-intl';
import {AppText} from '../common';
import {convertEnglishNumbersToArabic} from '@/lib';
import styles from './OrderTotal.module.css';

const OrderTotal = ({order}) => {
  const t = useTranslations();
  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <AppText
          text={t('items_total')?.toUpperCase()}
          classes={`${styles.itemsTotalText} ${styles.smallerText}`}
        />
        <AppText
          text={convertEnglishNumbersToArabic(order?.total_price)}
          classes={`${styles.bold} ${styles.smallerText}`}
        />
      </div>
      <div className={styles.itemContainer}>
        <AppText text={t('grand_total')?.toUpperCase()} classes={styles.bold} />
        <AppText
          text={convertEnglishNumbersToArabic(order?.total_price)}
          classes={styles.bold}
        />
      </div>
    </div>
  );
};
export default OrderTotal;
