"use client";
import { useTranslations } from "next-intl";
import AppText from "./AppText";
import AppButton from "./AppButton";
import { useRouter } from "@/i18n/routing";
import styles from "./ErrorView.module.css";

function ErrorView({
  children,
  hasError,
  onRetry,
  error,
  showRetryButton = true,
  title,
  retryButtonText,
  showRetryButtonLoading,
  refreshOnRetry,
}) {
  const t = useTranslations();
  const router = useRouter();
  const onRefresh = () => {
    router.refresh();
  };
  return hasError ? (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <AppText text={title || t("oops")} classes={styles.opsText} />
        <AppText
          text={error || t("something_went_wrong")}
          classes={styles.wrongText}
        />
      </div>
      {showRetryButton && (
        <AppButton
          name={retryButtonText || t("try_again")}
          onClick={refreshOnRetry ? onRefresh : onRetry}
          isLoading={showRetryButtonLoading}
          buttonStyle={styles.button}
          buttonTxtStyle={styles.buttonText}
        />
      )}
    </div>
  ) : (
    children
  );
}

export default ErrorView;
