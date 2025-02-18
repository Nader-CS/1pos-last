import { useLocale } from "next-intl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./Arrow.module.css";

const Arrow = () => {
  const locale = useLocale();
  const ChevronIcon = locale === "ar" ? FaChevronLeft : FaChevronRight;

  return <ChevronIcon className={styles.arrow} />;
};

export default Arrow;
