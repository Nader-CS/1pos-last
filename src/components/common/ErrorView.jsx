'use client';
import {useTranslations} from 'next-intl';
import {AppButton, AppText} from '.';

function ErrorView({
  children,
  hasError,
  onRetry,
  error = 'something_went_wrong',
  showRetryButton = true,
  title,
  retryButtonText,
  showRetryButtonLoading,
}) {
  const t = useTranslations();
  return hasError ? (
    <div className="flex h-full w-full flex-col items-center justify-center gap-12 bg-white">
      <div className="flex flex-col items-center gap-2">
        <AppText
          text={title || t('oops')}
          classes={'m-0 p-0 font-[Bold] text-[1.7rem] '}
        />
        <AppText
          text={error}
          classes={'m-0 p-0 font-[medium] text-[1.3rem] text-center'}
        />
      </div>
      {showRetryButton && (
        <AppButton
          name={retryButtonText || t('try_again')}
          onClick={onRetry}
          isLoading={showRetryButtonLoading}
          buttonStyle={`bg-scooter w-[80%] rounded-[2rem] uppercase justify-center`}
          buttonTxtStyle={'m-0 p-0 font-[medium] text-[1rem] text-white'}
        />
      )}
    </div>
  ) : (
    children
  );
}

export default ErrorView;
