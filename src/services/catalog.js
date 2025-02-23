'use client';
import {api} from './api';

export const catalogApi = api.injectEndpoints({
  endpoints: build => ({
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
  }),
  overrideExisting: true,
});

export const {useGetProductsQuery} = catalogApi;
