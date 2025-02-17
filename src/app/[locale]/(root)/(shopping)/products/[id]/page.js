import {fetchProductServer} from '@/actions';
import {ProductDetails} from '@/components';

const Product = async ({params}) => {
  const id = (await params)?.id;
  const {product = {}} = (await fetchProductServer(id)) || {};
  return (
    <div className="flex flex-1 flex-col bg-wildSand">
      <ProductDetails product={product} />
    </div>
  );
};
export default Product;
