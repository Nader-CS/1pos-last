'use client';

import {useMemo, useState} from 'react';
import {ProductCard} from '.';
import styles from './ProductList.module.css';
import {useGetProductsQuery} from '@/services';
import {ErrorView, LoadingView, Spinner} from '../common';
import {colors} from '@/lib';

const ProductList = ({storeId, categoryId}) => {
  const [productsCurrentPage, setProductsCurrentPage] = useState(1);
  const {
    currentData: {products, pagination} = {},
    isError: isGettingProductsError,
    refetch: refetchProducts,
    isFetching: isFetchingProducts,
    isLoading: isLoadingProducts,
  } = useGetProductsQuery(
    {
      category_id: categoryId,
      store_id: storeId,
      page: productsCurrentPage,
    },
    {skip: !storeId || !categoryId},
  );

  const shouldShowSpinner = useMemo(
    () => isFetchingProducts && !isLoadingProducts,
    [isFetchingProducts, isLoadingProducts],
  );
  const handleScroll = event => {
    const {scrollTop, scrollHeight, clientHeight} = event.target;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (productsCurrentPage < pagination?.pages && !isFetchingProducts) {
        setProductsCurrentPage(prevPage => prevPage + 1);
      }
    }
  };
  return (
    <LoadingView isLoading={isLoadingProducts}>
      <ErrorView hasError={isGettingProductsError} onRetry={refetchProducts}>
        <div className={styles.container} onScroll={handleScroll}>
          {products?.map(product => (
            <ProductCard product={product} key={product?.id} />
          ))}

          {shouldShowSpinner && (
            <div className={styles.spinnerContainer}>
              <Spinner color={colors.primary} />
            </div>
          )}
        </div>
      </ErrorView>
    </LoadingView>
  );
};
export default ProductList;
