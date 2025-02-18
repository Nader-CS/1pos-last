"use client";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import styles from "./LanguageChange.module.css";
import AppButton from "../common/AppButton";
import { useDispatch } from "react-redux";
import { api } from "@/services";

const LanguageChange = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const handleLanguageChange = (language) => {
    dispatch(api.util.resetApiState());
    const queryParams = Object.fromEntries(searchParams.entries());
    router.replace({ pathname, query: queryParams }, { locale: language });
  };

  return (
    <div className={styles.container}>
      <AppButton
        showArrow={false}
        shouldTranslate={false}
        disabled={locale == "en"}
        name={"english"}
        onClick={() => handleLanguageChange("en")}
        buttonStyle={`${styles.button} ${
          locale == "en" && styles.buttonActive
        }`}
        buttonTxtStyle={styles.buttonTxtStyle}
      />
      <AppButton
        showArrow={false}
        disabled={locale == "ar"}
        name={"عربي"}
        shouldTranslate={false}
        onClick={() => handleLanguageChange("ar")}
        buttonStyle={`${styles.button} ${
          locale == "ar" && styles.buttonActive
        }`}
        buttonTxtStyle={styles.buttonTxtStyle}
      />
    </div>
  );
};
export default LanguageChange;
