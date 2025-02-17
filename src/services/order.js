import {api} from './api';

export const orderApi = api.injectEndpoints({
  endpoints: build => ({
    createOrder: build.mutation({
      query: data => ({
        url: 'api/v1/orders/create_cart',
        method: 'POST',
        body: data,
      }),
    }),
    getOrder: build.query({
      query: id => ({
        url: `api/v1/orders/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
      providesTags: ['order'],
    }),
    addCartItem: build.mutation({
      query: data => ({
        url: `api/v1/orders/${data.orderId}/line_items`,
        method: 'POST',
        body: {
          line_item: data.line_item,
        },
      }),
      invalidatesTags: ['order'],
    }),
    updateCartItem: build.mutation({
      query: data => ({
        url: `api/v1/orders/${data.orderId}/line_items/${data.line_item_id}`,
        method: 'PUT',
        body: {
          line_item: data.line_item,
        },
      }),
      invalidatesTags: ['order'],
    }),
    deleteCartItem: build.mutation({
      query: data => ({
        url: `api/v1/orders/${data.orderId}/line_items/${data.line_item_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['order'],
    }),
    updateOrderDeliveryMethod: build.mutation({
      query: data => ({
        url: `api/v1/orders/${data?.orderId}`,
        method: 'PUT',
        body: data.body,
      }),
      invalidatesTags: ['order'],
    }),
    rateOrder: build.mutation({
      query: data => ({
        url: `api/v1/ratings`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['order'],
    }),
    updateCartItemAddons: build.mutation({
      query: data => ({
        url: `api/v1/orders/${data.orderId}/line_items/${data.line_item_id}`,
        method: 'PUT',
        body: {
          line_item: data.line_item,
        },
      }),
      invalidatesTags: ['order'],
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
  useRateOrderMutation,
  useUpdateCartItemAddonsMutation,
} = orderApi;
