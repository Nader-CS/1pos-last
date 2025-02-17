import {colors} from '@/utils/colors';
import {useLocale} from 'next-intl';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';

const Arrow = () => {
  const locale = useLocale();

  return locale == 'ar' ? (
    <FaChevronLeft color={colors.black} size={12} />
  ) : (
    <FaChevronRight color={colors.black} size={12} />
  );
};
export default Arrow;
