'use client';
import AddonsType from './AddonsType';
import {memo, useCallback, useMemo, useState} from 'react';
import {useGetOrderQuery} from '@/services/order';
import {getCookie} from 'cookies-next';
import {useAddonsSelection} from '@/hooks';

const Addons = ({
  product,
  selectedAddonsOptions,
  setSelectedAddonsOptions,
  currency,
  selectedVariant,
  updateCartItemAddon,
  requiredAddonRefs,
  highlightedSection,
  setHighlightedSection,
}) => {
  const cartId = getCookie('cartId');
  const {currentData: {orders: order} = {}} = useGetOrderQuery(cartId, {
    skip: !cartId,
  });
  const {handleAddonsSelection} = useAddonsSelection({
    product,
    selectedAddonsOptions,
    setSelectedAddonsOptions,
    currency,
    selectedVariant,
    order,
    updateCartItemAddon,
    requiredAddonRefs,
  });

  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = useCallback(
    index => {
      setExpandedSection(prevState => (prevState === index ? null : index));
    },
    [setExpandedSection],
  );
  const requiredAddonsFirstSort = useMemo(
    () => product?.addon_types?.slice().sort((a, b) => b.required - a.required),
    [product],
  );
  return (
    <>
      {requiredAddonsFirstSort?.map((addonType, index) => (
        <AddonsType
          addonType={addonType}
          index={index}
          toggleSection={toggleSection}
          expandedSection={expandedSection}
          handleAddonsSelection={handleAddonsSelection}
          highlightedSection={highlightedSection}
          setHighlightedSection={setHighlightedSection}
          requiredAddonRefs={requiredAddonRefs}
          selectedAddonsOptions={selectedAddonsOptions}
          currency={currency}
          key={index}
        />
      ))}
    </>
  );
};

export default memo(Addons);
