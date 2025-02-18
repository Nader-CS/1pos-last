"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useMemo } from "react";
import Arrow from "./Arrow";
import AppText from "./AppText";
import styles from "./AppButton.module.css";
import { Spinner } from ".";

const AppButton = ({
  renderIcon,
  name,
  disabled,
  onClick,
  showArrow = false,
  buttonStyle = "",
  isLoading = false,
  isLink = false,
  href = null,
  buttonTxtStyle = "",
}) => {
  const isDisabled = useMemo(
    () => disabled || isLoading,
    [disabled, isLoading]
  );

  const Content = () => (
    <>
      {isLoading && <Spinner size={25} />}
      <div className={styles.container}>
        {renderIcon?.()}
        <AppText text={name} classes={buttonTxtStyle} />
      </div>
      {showArrow && <Arrow />}
    </>
  );

  return (
    <Button
      disabled={isDisabled}
      onClick={onClick}
      asChild={isLink}
      className={`${styles.button} ${buttonStyle}`}
    >
      {isLink ? (
        <Link href={href}>
          <Content />
        </Link>
      ) : (
        <Content />
      )}
    </Button>
  );
};

export default AppButton;
