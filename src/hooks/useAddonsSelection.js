import { useCallback } from "react";

const useAddonsSelection = ({
  product,
  selectedAddonsOptions,
  setSelectedAddonsOptions,
  selectedVariant,
  order,
  updateCartItemAddon,
}) => {
  const handleAddonsSelection = useCallback(
    async (addon, optionId) => {
      const targetLineItem = order?.line_items?.find(
        (lineItem) => lineItem?.line_item?.variant?.id === selectedVariant?.id
      );

      const addonType = product?.addon_types?.find((at) =>
        at.addons.some((a) => a.id === addon.id)
      );

      let newAddons = [...selectedAddonsOptions];

      const isAddonIncluded = (id) => newAddons.includes(id);
      const selectedAddonCount = (ids) =>
        newAddons.filter((id) => ids.some((a) => a.id === id)).length;

      const handleNoTargetLineItem = () => {
        if (addonType?.limit > 0) {
          const count = selectedAddonCount(addonType.addons);

          newAddons = isAddonIncluded(optionId)
            ? newAddons.filter((id) => id !== optionId)
            : newAddons.concat(optionId);

          if (
            addonType?.required &&
            count < addonType.limit &&
            !addonType?.multiselect
          ) {
            if (!isAddonIncluded(optionId)) {
              newAddons = newAddons.filter((id) => id !== optionId);
            }
          }
        } else {
          newAddons = isAddonIncluded(optionId)
            ? newAddons.filter((id) => id !== optionId)
            : newAddons.concat(optionId);
        }
      };

      const handleTargetLineItem = async () => {
        const count = selectedAddonCount(addonType.addons);

        if (
          addonType?.required &&
          addonType?.multiselect &&
          count < addonType.addons?.length &&
          count >= 1 &&
          !isAddonIncluded(optionId)
        ) {
          newAddons = isAddonIncluded(optionId)
            ? newAddons.filter((id) => id !== optionId)
            : newAddons.concat(optionId);
        } else if (
          (count >= addonType.limit &&
            !addonType?.multiselect &&
            !isAddonIncluded(optionId)) ||
          (addonType?.required && count == addonType.limit)
        ) {
          return;
        } else {
          newAddons = isAddonIncluded(optionId)
            ? newAddons.filter((id) => id !== optionId)
            : newAddons.concat(optionId);
        }

        await updateCartItemAddon({
          orderId: order?.id,
          line_item_id: targetLineItem?.line_item?.id,
          line_item: { addon_ids: newAddons },
        });
      };

      if (targetLineItem) {
        await handleTargetLineItem();
      } else {
        handleNoTargetLineItem();
      }

      setSelectedAddonsOptions(newAddons);
    },
    [
      order,
      product,
      selectedAddonsOptions,
      selectedVariant,
      updateCartItemAddon,
      setSelectedAddonsOptions,
    ]
  );

  return { handleAddonsSelection };
};

export default useAddonsSelection;
