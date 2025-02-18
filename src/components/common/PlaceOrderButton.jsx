"use client";
import AppButton from "./AppButton";
import { useTranslations } from "next-intl";
import styles from "./PlaceOrderButton.module.css";
import { useGetOrderQuery } from "@/services";

const PlaceOrderButton = ({ cartId }) => {
  const t = useTranslations();
  const { isFetching: isFetchingOrder } = useGetOrderQuery(cartId, {
    skip: !cartId,
  });
  return (
    <AppButton
      name={t("place_order")?.toLocaleUpperCase()}
      buttonStyle={styles.button}
      buttonTxtStyle={styles.buttonText}
      isLink
      isLoading={isFetchingOrder}
      href={`/order/${cartId}`}
    />
  );
};
export default PlaceOrderButton;
