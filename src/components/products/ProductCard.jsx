"use client";

import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { AppText } from "../common";
import { logo } from "@/assets";
import { useMemo } from "react";
import styles from "./ProductCard.module.css";
import { ProductActionButton } from ".";

function ProductCard({ product }) {
  const productImage = useMemo(
    () => product?.images_urls?.[0] || logo,
    [product]
  );

  const router = useRouter();

  const navigateToProduct = () => {
    router.push(`/products/${product?.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.subContainer} onClick={navigateToProduct}>
        <Image
          src={productImage}
          alt={product?.presentation}
          width={60}
          height={60}
          className={styles.productImg}
          priority
          fetchPriority="high"
        />
        <div className={styles.details}>
          <AppText text={product?.presentation} classes={styles.productName} />
          <AppText
            text={product?.description}
            classes={styles.productDescription}
          />
        </div>
      </div>
      <ProductActionButton product={product} />
    </div>
  );
}

export default ProductCard;
