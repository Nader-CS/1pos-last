import {ErrorView, Product} from '@/components';
import {getProduct} from '@/services';

const ProductScreen = async ({params}) => {
  const id = (await params)?.id;
  const productResponse = await getProduct(id);

  if (productResponse?.errors) {
    return (
      <ErrorView hasError error={productResponse?.errors?.[0]} refreshOnRetry />
    );
  }
  return (
    <div className="flex flex-1 flex-col bg-wildSand">
      <Product product={productResponse?.product} />
    </div>
  );
};
export default ProductScreen;
