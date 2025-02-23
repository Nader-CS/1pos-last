import Image from 'next/image';
import styles from './Landing.module.css';
import OrderNow from './OrderNow';
import {logo} from '@/assets';

const Landing = () => {
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
          <div className={styles.buttonsContainer}>
            <OrderNow />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
