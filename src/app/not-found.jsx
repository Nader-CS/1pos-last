import {AppText, BaseLayout} from '@/components';
import {routing} from '@/i18n/routing';
import {getMessages} from 'next-intl/server';
import {cookies} from 'next/headers';
import styles from '@/styles/NotFound.module.css';
import AppButton from '@/components/common/AppButton';
import Image from 'next/image';
import {notFound} from '@/assets';
import {startCase} from 'lodash';

export default async function GlobalNotFound() {
  const cookieStore = await cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || routing.defaultLocale;
  const t = await getMessages({locale});

  return (
    <BaseLayout locale={routing.defaultLocale}>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <Image src={notFound} width={100} height={100} alt="not-found" />
          <AppText classes={styles.title} text={t['page_not_found']} />
          <AppText
            classes={styles.message}
            text={t['sorry_the_page_you_are_looking_for_does_not_exist']}
          />
          <AppButton
            isLink
            href={'/'}
            buttonStyle={styles.button}
            buttonTxtStyle={styles.buttonText}
            name={startCase(t['return_to_previous_page'])}
          />
        </div>
      </div>
    </BaseLayout>
  );
}
