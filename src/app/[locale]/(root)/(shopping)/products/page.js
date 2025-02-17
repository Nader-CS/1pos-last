import {fetchCategoriesServer} from '@/actions';
import {Categories} from '@/components/shopping/products';

async function ProductsPage() {
  const {categories = []} = (await fetchCategoriesServer()) || {};

  return (
    <div className="h-[100%] bg-white">
      <Categories categories={categories} />
    </div>
  );
}

export default ProductsPage;
