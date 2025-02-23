import {useTranslations} from 'next-intl';
import Image from 'next/image';
import styles from './Footer.module.css';
import {Link} from '@/i18n/routing';
import LanguageChange from './LanguageChange';
import {one_pay} from '@/assets';

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className={styles.container}>
      <div>
        <Image src={one_pay} alt="one_pay" className="w-[2rem]" />
      </div>
      <div className={styles.footerContent}>
        <div>
          <p className={styles.footerText}>
            {t('by_using_one_pay_you_accept')}{' '}
            <Link href={'/'} prefetch={false} className={styles.footerLink}>
              {t('terms_and_conditions')}
            </Link>
          </p>
        </div>
        <div>
          <LanguageChange />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
