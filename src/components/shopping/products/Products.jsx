'use client';

import {useGetProductsQuery} from '@/services/catalog';
import {ErrorView, SkeltonLoadingView} from '../../common';
import {ProductCard} from '.';
import {useCallback, useMemo, useState} from 'react';
import {Spinner} from '@nextui-org/react';
import ProductCardSkelton from './ProductCardSkelton';

function Products({storeId, categoryId, isCartEmpty, setPageCat}) {
  const [page, setPage] = useState(1);

  const {
    data,
    isFetching,
    isError: isGettingProductsError,
    refetch: refetchProducts,
    error: productsError,
    isLoading: isLoadingProducts,
  } = useGetProductsQuery(
    {
      category_id: categoryId,
      store_id: storeId,
      page,
    },
    {
      skip: !storeId || !categoryId,
    },
  );
  const shouldShowSpinner = useMemo(
    () => isFetching && !isLoadingProducts,
    [isFetching, isLoadingProducts],
  );

  const handleScroll = useCallback(
    event => {
      const {scrollTop, scrollHeight, clientHeight} = event.target;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        if (page < data?.pagination?.pages && !isFetching) {
          setPage(prevPage => prevPage + 1);
          setPageCat(prevPage => prevPage + 1);
        }
      }
    },
    [isFetching, page],
  );

  return (
    <ErrorView
      hasError={isGettingProductsError}
      onRetry={refetchProducts}
      error={productsError?.error}>
      <div
        onScroll={handleScroll}
        key={categoryId}
        className={`flex h-[75%] flex-col items-center gap-3 overflow-y-auto px-4 ${isCartEmpty ? 'pb-5' : 'pb-16'} pt-5 scrollbar-hide`}>
        <SkeltonLoadingView
          isLoading={isLoadingProducts}
          SkeletonComponent={ProductCardSkelton}>
          {data?.products?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </SkeltonLoadingView>
        {shouldShowSpinner && <Spinner size="lg" />}
      </div>
    </ErrorView>
  );
}

export default Products;
