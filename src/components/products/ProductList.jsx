import { ProductCard } from ".";
import styles from "./ProductList.module.css";

const ProductList = ({ products }) => {
  return (
    <div className={styles.container}>
      {products?.map((product) => (
        <ProductCard product={product} key={product?.id} />
      ))}
    </div>
  );
};
export default ProductList;
