'use client';

import _ from 'lodash';
import {useEffect, useState} from 'react';

const useGetProductVariants = ({
  setSelectedVariant,
  product,
  variantId,
  selectedVariant,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [optionsTypes, setOptionsTypes] = useState(null);

  const getPossibleOptionValues = data => {
    return _.map(_.groupBy(data?.option_types, 'id'), (optionType, typeId) => ({
      option_type: {
        id: Number(typeId),
        name: optionType[0]?.name,
        presentation: optionType[0]?.presentation,
      },
      values: _.uniqBy(
        _.flatMap(data?.variants, variant =>
          variant?.option_values?.filter(
            value => value.option_type_id === Number(typeId),
          ),
        ).map(value => ({
          name: value?.name,
          presentation: value?.presentation,
        })),
        'name',
      ),
    }));
  };

  useEffect(() => {
    if (product) setOptionsTypes(getPossibleOptionValues(product));
  }, [product]);

  const handleOptionSelection = (optionType, value) => {
    if (selectedOptions[optionType] === value) return;
    setSelectedOptions(prev => ({...prev, [optionType]: value}));
  };

  useEffect(() => {
    if (!product) return;

    if (variantId && !selectedVariant) {
      setSelectedVariant(
        product.variants?.find(variant => variant.id == variantId),
      );
    } else {
      const selectedVariant = product.variants?.find(variant =>
        optionsTypes?.every(({option_type}) =>
          variant.option_values.some(
            option => option.name === selectedOptions[option_type.name],
          ),
        ),
      );
      setSelectedVariant(selectedVariant || product?.master);
    }
  }, [product, optionsTypes, selectedOptions]);

  useEffect(() => {
    if (!product || selectedVariant) return;

    const defaultVariant = variantId
      ? product.variants?.find(variant => variant.id == variantId)
      : product.master;

    setSelectedOptions(
      defaultVariant?.option_values?.reduce((acc, option) => {
        acc[option.option_type_name] = option.name;
        return acc;
      }, {}) || {},
    );
  }, [product]);

  return {handleOptionSelection, optionsTypes, selectedOptions};
};

export default useGetProductVariants;
