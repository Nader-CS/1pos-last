import {api} from './api';

export const catalogApi = api.injectEndpoints({
  endpoints: build => ({
    getCategories: build.query({
      query: params => ({
        url: 'api/v1/categories',
        method: 'GET',
        params,
      }),
    }),
    getProducts: build.query({
      query: params => ({
        url: 'api/v1/products',
        method: 'GET',
        params,
      }),
      serializeQueryArgs: ({queryArgs}) => {
        const {page: _, ...restArgs} = queryArgs;
        return restArgs;
      },
      merge: (currentCache, newItems) => {
        if (!currentCache || !currentCache.products) {
          return newItems;
        }
        return {
          ...newItems.pagination,
          products: [...currentCache.products, ...newItems.products],
        };
      },
      forceRefetch: ({currentArg, previousArg}) => {
        if (
          currentArg &&
          previousArg &&
          currentArg.store_id == previousArg.store_id
        ) {
          return currentArg.page > previousArg.page;
        }
        return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
      },
    }),
    getProduct: build.query({
      query: data => ({
        url: `api/v1/products/${data.productId}`,
        method: 'GET',
        params: data,
      }),
    }),
    getStore: build.query({
      query: id => ({
        url: `api/v1/stores/${id}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useGetStoreQuery,
} = catalogApi;
