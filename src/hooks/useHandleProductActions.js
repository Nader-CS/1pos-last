'use client';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {debounce} from 'lodash';
import {
  useAddCartItemMutation,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from '@/services/order';
import useAlerts from './useAlerts';
import serverRevalidateTag from '@/lib/server-actions';

const useHandleProductActions = ({
  product,
  variantId,
  order,
  selectedAddonsOptions,
}) => {
  const [variantQuantity, setVariantQuantity] = useState(null);
  const [productTotalQuantity, setProductTotalQuantity] = useState(null);
  const item = order?.line_items?.find(
    item => item?.line_item?.variant?.id === variantId,
  );
  const {errorAlert} = useAlerts();

  useEffect(() => {
    setVariantQuantity(item?.line_item?.quantity ?? 0);
  }, [item]);

  useEffect(() => {
    const totalProductItems = order?.line_items?.reduce(
      (accumulator, currentValue) => {
        const isProductItem =
          currentValue?.line_item?.variant?.product?.id === product?.id;
        if (isProductItem) {
          return accumulator + currentValue?.line_item?.quantity;
        }
        return accumulator;
      },
      0,
    );
    setProductTotalQuantity(totalProductItems ?? 0);
  }, [order, product]);

  const [addCartItem, {isLoading: isAdding}] = useAddCartItemMutation({
    fixedCacheKey: 'addToCart',
  });
  const [updateCartItem] = useUpdateCartItemMutation({
    fixedCacheKey: 'updateCart',
  });
  const [deleteCartItem, {isLoading: isDeleting}] = useDeleteCartItemMutation({
    fixedCacheKey: 'deleteCart',
  });

  const debouncedUpdateCartItem = useMemo(
    () =>
      debounce(params => {
        updateCartItem(params).then(res => {
          if (res?.error) {
            const error = res?.error?.error || res?.error?.errors?.[0];
            errorAlert(error);
            setVariantQuantity(params?.actionQuantity);
            return;
          }
          serverRevalidateTag('Order');
        });
      }, 1500),
    [updateCartItem],
  );

  const applyAction = useCallback(
    (action, actionQuantity = variantQuantity) => {
      let newQuantity = actionQuantity;
      const selectedVariant = product?.variants?.find(
        variant => variant?.id == variantId,
      );
      if (action === 'add') {
        newQuantity = variantQuantity + 1;
        console.log(newQuantity);
      } else if (action === 'remove') {
        newQuantity = variantQuantity - 1;
      }

      if (newQuantity < 0) return;

      const isAdding = newQuantity == 1 && action == 'add';
      const price =
        selectedVariant?.price ||
        product?.variants?.price ||
        product?.master?.price;
      const sku =
        selectedVariant?.sku || product?.variants?.sku || product?.master?.sku;

      const params = {
        orderId: order?.id,
        line_item: {
          quantity: newQuantity,
          price,
          ...(isAdding && {
            sku,
          }),
          ...(isAdding && {addon_ids: selectedAddonsOptions}),
        },
        storeId: order?.store?.id,
        line_item_id: item?.line_item?.id,
        actionQuantity,
      };

      if (action === 'add' && newQuantity === 1) {
        addCartItem(params).then(res => {
          if (res.error) {
            const error =
              res?.error?.errors?.addons?.[0] ||
              res?.error?.error ||
              res?.error?.errors?.[0];
            errorAlert(error);
            setVariantQuantity(actionQuantity);
            return;
          }
          serverRevalidateTag('Order');
        });
      } else if (newQuantity === 0) {
        debouncedUpdateCartItem.cancel();
        deleteCartItem(params).then(res => {
          if (res?.error) {
            const error = res?.error?.error || res?.error?.errors?.[0];
            errorAlert(error);
            setVariantQuantity(actionQuantity);
            return;
          }
          serverRevalidateTag('Order');
        });
      } else {
        debouncedUpdateCartItem(params);
      }
      setVariantQuantity(newQuantity);
      setProductTotalQuantity(prev => prev - variantQuantity + newQuantity);
    },
    [
      addCartItem,
      debouncedUpdateCartItem,
      deleteCartItem,
      order,
      variantId,
      product,
      variantQuantity,
      selectedAddonsOptions,
    ],
  );

  return {
    applyAction,
    variantQuantity,
    productTotalQuantity,
    isAdding,
    debouncedUpdateCartItem,
    deleteCartItem,
    item,
    isDeleting,
    lineItemId: item?.line_item?.id,
  };
};

export default useHandleProductActions;
