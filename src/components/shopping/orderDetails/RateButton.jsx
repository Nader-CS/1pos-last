import {useTranslations} from 'next-intl';
import {AppButton, AppText} from '../../common';

export default function RateButton() {
  const t = useTranslations();
  return (
    <div className="flex w-full flex-col items-center gap-3">
      <AppText
        classes={'text-scooter font-[bold] text-[18px]'}
        text={t('thank_you_for_using_1pay')}
      />
      <AppText
        classes={'m-0 p-0 font-[medium] text-[14px]'}
        text={t('how_was_your_experience')}
      />
      <AppButton
        name={t('rate')}
        buttonStyle={`bg-scooter w-[80%] h-12 rounded-3xl uppercase justify-center`}
        buttonTxtStyle={'font-[medium] text-[13px] text-white'}
        isLinK
        href={'rateOrder'}
      />
    </div>
  );
}
