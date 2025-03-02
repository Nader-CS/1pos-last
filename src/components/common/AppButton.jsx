'use client';

import {Button} from '@/components/ui/button';
import {Link} from '@/i18n/routing';
import {useMemo} from 'react';
import Arrow from './Arrow';
import AppText from './AppText';
import styles from './AppButton.module.css';
import {Spinner} from '.';

const AppButton = ({
  children,
  name,
  onClick,
  isLoading = false,
  disabled = false,
  isLink = false,
  href = '#',
  showArrow = false,
  buttonStyle = '',
  renderIcon: Icon = null,
  loaderSize = 25,
  buttonTxtStyle,
  spinnerStyle,
  ...props
}) => {
  const isDisabled = useMemo(
    () => disabled || isLoading,
    [disabled, isLoading],
  );

  const content = () => {
    const shouldRenderHeader = Icon || name;
    return (
      <>
        {isLoading && <Spinner size={25} {...spinnerStyle} />}
        {shouldRenderHeader && (
          <div className={styles.headerContainer}>
            {Icon && <Icon />}
            {name && <AppText text={name} classes={buttonTxtStyle} />}
          </div>
        )}
        {children}
        {showArrow && <Arrow />}
      </>
    );
  };

  return isLink ? (
    <Link href={href} className={`${styles.button} ${buttonStyle}`} {...props}>
      {content()}
    </Link>
  ) : (
    <Button
      disabled={isDisabled}
      onClick={onClick}
      className={`${styles.button} ${buttonStyle}`}
      {...props}>
      {content()}
    </Button>
  );
};

export default AppButton;
