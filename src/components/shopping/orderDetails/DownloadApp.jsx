'use client';
import Image from 'next/image';
import {AppText} from '../../common';
import {useLocale, useTranslations} from 'next-intl';

export default function DownloadApp() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <div className="relative my-14 flex h-40 w-full justify-between bg-jon p-5">
      <Image
        src={'/appScreen.png'}
        alt="download_app"
        className={`absolute -bottom-9 ${
          locale === 'en' ? 'left-9' : 'right-9'
        }`}
        width={120}
        height={250}
      />
      <div className="w-[45%]" />
      <div className="flex w-[55%] flex-col gap-3">
        <AppText
          classes={'font-[bold] text-[14px] text-white'}
          text={t('download_the_app')}
        />
        <AppText
          classes={'font-[regular] text-[12px] text-white'}
          text={t('Enter_NEWUSER100_get_extra_100_points_upon_registration')}
          wordsBold={['NEWUSER100', '100', t('points')]}
        />
        <div className="flex w-full items-center justify-between md:w-[50%]">
          <Image
            src={'/ios.png'}
            alt="ios"
            className="h-[28px] w-[85px]"
            width={85}
            height={28}
          />
          <Image
            src={'/android.png'}
            alt="android"
            className="h-[28px] w-[85px]"
            width={85}
            height={28}
          />
        </div>
      </div>
    </div>
  );
}
