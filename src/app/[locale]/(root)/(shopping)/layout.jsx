import {ShoppingErrors} from '@/components/shopping/shoppingCommon';
import {cookies} from 'next/headers';

const ShoppingLayout = async ({children}) => {
  const appCookies = await cookies();
  const cartId = appCookies?.get('cartId')?.value;
  const storeId = appCookies?.get('storeId')?.value;

  if (!storeId) {
    return <ShoppingErrors error="no_store_defined" />;
  }
  if (!cartId) {
    return <ShoppingErrors error="no_cart_found" />;
  }
  return children;
};

export default ShoppingLayout;
