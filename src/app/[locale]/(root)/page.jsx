import Image from 'next/image';
import styles from './Landing.module.css';
import {OrderNow} from '@/components/landing';

const Landing = async () => {
  return (
    <div className="relative flex h-screen justify-center text-white">
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-center ${styles.landing_background}`}
      />

      {/* Content */}
      <div className="flex w-full flex-col justify-between">
        <div className="relative z-10 flex w-full flex-col items-center justify-center text-center">
          <div className="mt-[5rem] w-[90%] max-w-[300px]">
            <Image src={'/logo.png'} width={300} height={300} alt="logo" />
          </div>
          <div className="mt-[10rem] w-[90%] max-w-[300px]">
            <OrderNow />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
