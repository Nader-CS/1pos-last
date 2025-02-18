"use client";

import { api } from "./api";

export const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    createOrder: build.mutation({
      query: (data) => ({
        url: "api/v1/orders/create_cart",
        method: "POST",
        body: data,
      }),
    }),
    getOrder: build.query({
      query: (id) => ({
        url: `api/v1/orders/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
      providesTags: ["Order"],
    }),
    addCartItem: build.mutation({
      query: (data) => ({
        url: `api/v1/orders/${data.orderId}/line_items`,
        method: "POST",
        body: {
          line_item: data.line_item,
        },
      }),
      invalidatesTags: ["Order"],
    }),
    updateCartItem: build.mutation({
      query: (data) => ({
        url: `api/v1/orders/${data.orderId}/line_items/${data.line_item_id}`,
        method: "PUT",
        body: {
          line_item: data.line_item,
        },
      }),
      invalidatesTags: ["Order"],
    }),
    deleteCartItem: build.mutation({
      query: (data) => ({
        url: `api/v1/orders/${data.orderId}/line_items/${data.line_item_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrderDeliveryMethod: build.mutation({
      query: (data) => ({
        url: `api/v1/orders/${data?.orderId}`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["Order"],
    }),

    updateCartItemAddons: build.mutation({
      query: (data) => ({
        url: `api/v1/orders/${data.orderId}/line_items/${data.line_item_id}`,
        method: "PUT",
        body: {
          line_item: data.line_item,
        },
      }),
      invalidatesTags: ["Order"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useLazyGetOrderQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useUpdateOrderDeliveryMethodMutation,
  useUpdateCartItemAddonsMutation,
} = orderApi;
