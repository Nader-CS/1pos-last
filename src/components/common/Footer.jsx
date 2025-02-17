import {useTranslations} from 'next-intl';
import {LanguageChange} from '.';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className="z-40 flex min-h-fit w-full flex-col items-center gap-1 bg-mercury py-3">
      <div>
        <Image src={'/one_pay.png'} width={40} height={40} alt="one_pay" />
      </div>
      <div className="flex flex-col gap-1 text-center">
        <div>
          <p className={`font-[regular] text-black`}>
            {t('by_using_one_pay_you_accept')}{' '}
            <Link
              href={'/'}
              prefetch={false}
              className={`font-[regular] text-linkColor underline hover:text-linkHovorColor`}>
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
