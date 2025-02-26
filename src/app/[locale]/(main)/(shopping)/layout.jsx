import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';

const ShoppingLayout = async ({children}) => {
  const appCookies = await cookies();
  const isOrderExist = appCookies.get('cartId')?.value;

  if (!isOrderExist) {
    redirect('/');
  }

  return children;
};
export default ShoppingLayout;
