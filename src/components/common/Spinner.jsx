import {colors} from '@/lib';
import {MoonLoader} from 'react-spinners';

const Spinner = props => {
  return <MoonLoader size={40} color={colors.white} {...props} />;
};
export default Spinner;
