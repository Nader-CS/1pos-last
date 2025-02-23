import {Categories, ErrorView, Products, ProductsHeader} from '@/components';
import {getCategories} from '@/services';

const ProductsPage = async () => {
  const categoriesResponse = await getCategories();

  if (categoriesResponse?.errors) {
    return (
      <ErrorView
        hasError={true}
        error={categoriesResponse?.errors?.[0]}
        refreshOnRetry
      />
    );
  }

  return (
    <div>
      <ProductsHeader />
      <Categories categories={categoriesResponse?.categories} />
      <Products categories={categoriesResponse?.categories} />
    </div>
  );
};
export default ProductsPage;
