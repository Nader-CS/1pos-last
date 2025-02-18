import Image from "next/image";
import styles from "./Product.module.css";
import { Back } from "../common";
import { ProductDetails } from ".";
const Product = ({ product }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src={product?.images_urls?.[0]}
          width={200}
          height={400}
          className={styles.productImage}
          alt={product?.presentation || "product"}
        />
      </div>
      <div className={styles.backContainer}>
        <Back />
      </div>
      <ProductDetails product={product} />
    </div>
  );
};
export default Product;
