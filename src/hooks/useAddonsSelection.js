import {useCallback} from 'react';

const useAddonsSelection = ({
  product,
  selectedAddonsOptions,
  setSelectedAddonsOptions,
  selectedVariant,
  order,
  updateCartItemAddon,
}) => {
  const toggleAddonSelection = (addons, id, required, isLineItem) => {
    if (isLineItem && required) return addons;
    return addons.includes(id) ? addons.filter(a => a !== id) : [...addons, id];
  };

  const handleNoTargetLineItem = (addonType, optionId) => {
    let newAddons = toggleAddonSelection(
      [...selectedAddonsOptions],
      optionId,
      addonType?.required,
      false,
    );
    return addonType?.limit > 0 &&
      addonType?.required &&
      !addonType?.multiselect &&
      newAddons.length > addonType.limit
      ? selectedAddonsOptions
      : newAddons;
  };

  const handleTargetLineItem = async (addonType, optionId, targetLineItem) => {
    let newAddons = toggleAddonSelection(
      [...selectedAddonsOptions],
      optionId,
      addonType?.required,
      true,
    );

    if (addonType?.required && newAddons.includes(optionId)) {
      return selectedAddonsOptions;
    }

    if (
      addonType?.required &&
      !addonType?.multiselect &&
      newAddons.length > addonType.limit
    )
      return selectedAddonsOptions;

    await updateCartItemAddon({
      orderId: order?.id,
      line_item_id: targetLineItem?.line_item?.id,
      line_item: {addon_ids: newAddons},
    });

    return newAddons;
  };

  const handleAddonsSelection = useCallback(
    async (addon, optionId) => {
      const targetLineItem = order?.line_items?.find(
        lineItem => lineItem?.line_item?.variant?.id === selectedVariant?.id,
      );
      const addonType = product?.addon_types?.find(at =>
        at.addons.some(a => a.id === addon.id),
      );

      const newAddons = targetLineItem
        ? await handleTargetLineItem(addonType, optionId, targetLineItem)
        : handleNoTargetLineItem(addonType, optionId);

      setSelectedAddonsOptions(newAddons);
    },
    [order, product, selectedAddonsOptions, selectedVariant],
  );

  return {handleAddonsSelection};
};

export default useAddonsSelection;
