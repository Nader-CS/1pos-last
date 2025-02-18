"use client";
import { api } from "./api";

export const catalogApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: (params) => ({
        url: "api/v1/products",
        method: "GET",
        params,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetProductsQuery } = catalogApi;
