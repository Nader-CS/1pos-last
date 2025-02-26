import Image from 'next/image';
import styles from './Landing.module.css';
import OrderNow from './OrderNow';
import {logo} from '@/assets';
import {FaMapMarkerAlt} from 'react-icons/fa';
import {AppText} from '../common';
import {useTranslations} from 'next-intl';
import {MdTableBar} from 'react-icons/md';
import {RiTimeZoneFill} from 'react-icons/ri';

const Landing = ({store, tableId}) => {
  const t = useTranslations();
  return (
    <div className={styles.container}>
      {/* Background Image */}
      <div className={styles.background} />

      {/* Content */}
      <div className={styles.contentContainer}>
        <div className={styles.contentSubContainer}>
          <div className={styles.logoContainer}>
            <Image src={logo} priority alt="logo" className="w-[25rem]" />
          </div>
          <section className={styles.mainContentContainer}>
            <article className={styles.content}>
              <div className={styles.col1}>
                <div className={styles.col1IconContainer}>
                  <FaMapMarkerAlt className={styles.icon} />
                </div>
                <AppText text={t('branch')} classes={styles.branch} />
              </div>
              <div className={styles.col2}>
                <AppText text={store?.name} classes={styles.branchName} />
              </div>
            </article>
            {tableId && <div className="h-[0.01rem] bg-doveGray" />}
            {tableId && (
              <article className={styles.content}>
                <div className={styles.col1}>
                  <div className={styles.col1IconContainer}>
                    <MdTableBar className={styles.icon} />
                  </div>
                  <AppText text={t('table')} classes={styles.branch} />
                </div>
                <div className={styles.col2}>
                  <AppText
                    text={`${t('table')} ${tableId}`}
                    classes={styles.branchName}
                  />
                </div>
              </article>
            )}
            <div className="h-[0.01rem] bg-doveGray" />

            <article className={styles.content}>
              <div className={styles.col1}>
                <div className={styles.col1IconContainer}>
                  <RiTimeZoneFill className={styles.icon} />
                </div>
                <AppText text={t('zone')} classes={styles.branch} />
              </div>
              <div className={styles.col2}>
                <AppText text={store?.zone?.name} classes={styles.branchName} />
              </div>
            </article>

            <OrderNow />
          </section>
        </div>
      </div>
    </div>
  );
};
export default Landing;
