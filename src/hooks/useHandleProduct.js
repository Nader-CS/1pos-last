import {useEffect, useMemo, useRef, useState} from 'react';

import {useGetOrderQuery} from '@/services/order';
import {getCookie} from 'cookies-next';
import {convertEnglishNumbersToArabic} from '@/utils';

const useHandleProduct = ({product}) => {
  const [isSearchingForVariant, setIsSearchingForVariant] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAddonsOptions, setSelectedAddonsOptions] = useState([]);
  const [highlightedSection, setHighlightedSection] = useState(null);
  const cartId = getCookie('cartId');

  const {currentData: {orders: order} = {}} = useGetOrderQuery(cartId, {
    skip: !cartId,
  });

  const requiredAddonRefs = useRef({});

  const currency = useMemo(() => product?.master?.currency, [product]);

  const lastProductWord = useMemo(() => {
    const splitting = product?.presentation?.trim().split(' ');
    return splitting?.[splitting?.length - 1]?.trim();
  }, [product]);

  const ProductNameExceptLastWord = useMemo(
    () =>
      product?.presentation
        ?.trim()
        ?.split(' ')
        ?.slice(0, -1)
        ?.join(' ')
        ?.trim(),
    [product],
  );

  const isAddonsExist = useMemo(
    () => product?.addon_types?.length > 0,
    [product],
  );

  const selectedVariantPrice = useMemo(() => {
    let price = Number(selectedVariant?.price) || 0;

    const addonTypes = product?.addon_types || [];
    addonTypes.forEach(addonType => {
      const selectedAddons = addonType?.addons?.filter(addon =>
        selectedAddonsOptions?.find(
          selectAddonId => selectAddonId === addon?.id,
        ),
      );
      selectedAddons?.forEach(addon => (price += Number(addon?.price)));
    });
    return convertEnglishNumbersToArabic(Number(price).toFixed(2));
  }, [
    selectedVariant,
    convertEnglishNumbersToArabic,
    selectedAddonsOptions,
    product,
  ]);

  const allRequiredAddonsSelected = useMemo(() => {
    if (!product?.addon_types) return true; // If there are no addon types, there are no requirements

    // Get all required addon types
    const requiredAddonTypes = product.addon_types.filter(
      type => type.required,
    );

    // If there are no required addon types, return true
    if (requiredAddonTypes.length === 0) return true;

    // Check if all required addon types have at least one selected addon
    return requiredAddonTypes.every(type => {
      // Get the selected addons for the current type
      const selectedAddonsForType = selectedAddonsOptions.filter(addonId =>
        type.addons.some(addon => addon.id === addonId),
      );
      // Check if selected addon match limit for the type
      return selectedAddonsForType.length >= type?.limit;
    });
  }, [product, selectedAddonsOptions]);

  const handleAllRequiredAddonsNotSelected = () => {
    const requiredAddonType = product?.addon_types?.find(addonType => {
      if (addonType.required) {
        const selectedAddonsCount = addonType.addons.filter(addon =>
          selectedAddonsOptions.includes(addon.id),
        ).length;
        return selectedAddonsCount < addonType.limit;
      }
      return false;
    });

    if (requiredAddonType) {
      setHighlightedSection({...requiredAddonType});
    }
  };

  useEffect(() => {
    if (order && selectedVariant) {
      const targetVariant = order?.line_items?.find(
        lineItems => lineItems?.line_item?.variant?.id == selectedVariant?.id,
      );

      if (targetVariant?.line_item?.addons) {
        setSelectedAddonsOptions(
          targetVariant?.line_item?.addons?.map(addon => addon?.id),
        );
      } else {
        setSelectedAddonsOptions([]);
      }
    }
  }, [order, selectedVariant, order]);

  return {
    selectedVariantPrice,
    currency,
    selectedVariant,
    selectedAddonsOptions,
    allRequiredAddonsSelected,
    handleAllRequiredAddonsNotSelected,
    isSearchingForVariant,
    ProductNameExceptLastWord,
    lastProductWord,
    setSelectedVariant,
    setIsSearchingForVariant,
    isAddonsExist,
    setSelectedAddonsOptions,
    requiredAddonRefs,
    highlightedSection,
    setHighlightedSection,
  };
};

export default useHandleProduct;
