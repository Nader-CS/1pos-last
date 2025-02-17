'use client';
import {useState} from 'react';
import {AppButton, AppText} from '../../common';
import {useTranslations} from 'next-intl';

export default function ReceiptEmail() {
  const t = useTranslations();
  const [email, setEmail] = useState('');

  return (
    <div className="flex w-[90%] flex-col gap-4 rounded-2xl bg-white p-5">
      <AppText
        classes={'font-[medium] text-[14px]'}
        text={t('get_your_receipt_by_email')}
      />
      <div className="flex items-center justify-between">
        <input
          placeholder={t('email')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          className="h-10 w-[80%] rounded-es-2xl rounded-ss-2xl border-[1px] border-scooter bg-polar px-3 font-[regular] text-[12px] text-black focus:border-linkHovorColor focus:outline-none focus:ring-0"
        />
        <AppButton
          name={t('send')}
          buttonStyle={`bg-bigStone w-[20%] h-10 rounded-none rounded-se-2xl rounded-ee-2xl uppercase justify-center`}
          buttonTxtStyle={'font-[medium] text-[10px] text-white'}
          showArrow={false}
        />
      </div>
    </div>
  );
}
