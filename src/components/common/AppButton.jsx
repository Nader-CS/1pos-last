'use client';
import {Button} from '@nextui-org/button';
import Image from 'next/image';
import {Link} from '@/i18n/routing';
import Arrow from './Arrow';

const AppButton = ({
  icon,
  name,
  disabled,
  onClick,
  showArrow = false,
  buttonStyle = {},
  isLoading = false,
  isLinK = false,
  href = null,
}) => {
  return (
    <Button
      isDisabled={disabled || isLoading}
      onClick={onClick}
      as={isLinK ? Link : Button}
      href={href}
      isLoading={isLoading}
      spinner={
        <svg
          className="h-6 w-6 animate-spin text-current"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
      }
      className={`flex h-[56px] flex-row items-center justify-between rounded-[10px] text-[1rem] capitalize ${buttonStyle} `}>
      <div className="m-0 flex flex-row items-center gap-3 p-0">
        {icon && <Image src={icon} alt="icon" width={24} height={24} />}
        <p className="m-0 p-0">{name}</p>
      </div>
      {showArrow && <Arrow />}
    </Button>
  );
};

export default AppButton;
