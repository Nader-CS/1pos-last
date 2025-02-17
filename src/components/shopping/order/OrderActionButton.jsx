import {colors} from '@/utils';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';

function OrderActionButton({
  children,
  onClick,
  disabled,
  showArrow = false,
  locale,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex h-[60px] flex-1 items-center justify-between rounded-xl bg-white p-3">
      {children}
      {showArrow &&
        (locale == 'ar' ? (
          <FaChevronLeft color={colors.black} size={12} />
        ) : (
          <FaChevronRight color={colors.black} size={12} />
        ))}
    </button>
  );
}

export default OrderActionButton;
