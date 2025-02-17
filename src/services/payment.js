import {api} from './api';

export const paymentApi = api.injectEndpoints({
  endpoints: build => ({
    createPayment: build.mutation({
      query: data => ({
        url: `api/v1/orders/${data.orderId}/payments`,
        method: 'POST',
        body: data.body,
      }),
      invalidatesTags: ['order'],
    }),
    deletePayment: build.mutation({
      query: data => ({
        url: `api/v1/orders/${data?.orderId}/payments/${data?.payment_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['order'],
    }),
    updatePaymentMethod: build.mutation({
      query: data => ({
        url: `api/v1/orders/${data?.orderId}/payments/${data?.payment_id}`,
        method: 'PUT',
        body: data?.body,
      }),
      invalidatesTags: ['order'],
    }),
    checkout: build.mutation({
      query: orderId => ({
        url: `api/v1/orders/${orderId}/checkout`,
        method: 'PUT',
      }),
      invalidatesTags: ['order'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useDeletePaymentMutation,
  useUpdatePaymentMethodMutation,
  useCreatePaymentMutation,
  useCheckoutMutation,
} = paymentApi;
