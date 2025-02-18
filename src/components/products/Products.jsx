"use client";

import { getActiveCategory } from "@/selectors";
import { useGetProductsQuery } from "@/services";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { ErrorView, LoadingView, PlaceOrderButton } from "../common";
import { ProductList } from ".";
import styles from "./Products.module.css";
import { useSwipeable } from "react-swipeable";
import { setCategory } from "@/slices";
import { useMemo } from "react";
import { useGetOrderQuery } from "@/services";

const Products = ({ categories }) => {
  const currentCategory = useSelector(getActiveCategory);
  const dispatch = useDispatch();
  const storeId = getCookie("storeId");
  const cartId = getCookie("cartId");

  const currentIndex = categories?.findIndex((c) => c?.id == currentCategory);

  const { currentData: { orders: order } = {}, isFetching } = useGetOrderQuery(
    cartId,
    {
      skip: !cartId,
    }
  );

  const handleSwipe = (direction) => {
    let newIndex = currentIndex;

    if (direction == "left" && currentIndex < categories?.length - 1) {
      newIndex++;
    } else if (direction == "right" && currentIndex > 0) {
      newIndex--;
    }

    if (newIndex !== currentIndex) {
      dispatch(setCategory(categories?.[newIndex]?.id));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackMouse: true,
  });

  const {
    data: { products, pagination } = {},
    isError: isGettingProductsError,
    refetch: refetchProducts,
    isFetching: isFetchingProducts,
  } = useGetProductsQuery(
    {
      category_id: currentCategory,
      store_id: storeId,
    },
    { skip: !storeId || !currentCategory }
  );

  const shouldShowPlaceOrderButton = useMemo(
    () => order?.line_items?.length > 0,
    [order]
  );

  return (
    <>
      <div {...handlers} className={styles.container}>
        <LoadingView isLoading={isFetchingProducts}>
          <ErrorView
            hasError={isGettingProductsError}
            onRetry={refetchProducts}
            showRetryButtonLoading={isFetchingProducts}
          >
            <ProductList products={products} />
          </ErrorView>
        </LoadingView>
      </div>
      {shouldShowPlaceOrderButton && <PlaceOrderButton cartId={cartId} />}
    </>
  );
};
export default Products;
