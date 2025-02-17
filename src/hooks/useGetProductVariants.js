import _ from 'lodash';
import {useEffect, useState} from 'react';

const useGetProductVariants = ({
  setSelectedVariant,
  product,
  variantId,
  selectedVariant,
  setIsSearchingForVariant,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [optionsTypes, setOptionsTypes] = useState(null);

  function getPossibleOptionValues(data) {
    const optionValuesByType = _.groupBy(data?.option_types, 'id');

    const result = _.map(optionValuesByType, (optionType, typeId) => {
      const values = _.flatMap(data?.variants, variant => {
        const variantValues = variant?.option_values?.filter(
          value => value?.option_type_id === Number(typeId),
        );
        return variantValues.map(value => ({
          name: value?.name,
          presentation: value?.presentation,
        }));
      });

      return {
        option_type: {
          id: Number(typeId),
          name: optionType?.[0].name,
          presentation: optionType?.[0].presentation,
        },
        values: _.uniqBy(values, 'name'),
      };
    });

    return result;
  }

  useEffect(() => {
    if (product) {
      setOptionsTypes(getPossibleOptionValues(product));
    }
  }, [product]);

  const handleOptionSelection = (optionType, value) => {
    setIsSearchingForVariant(true);
    if (selectedOptions[optionType] == value) {
      setIsSearchingForVariant(false);
      return;
    }
    setSelectedOptions(prevState => ({
      ...prevState,
      [optionType]: value,
    }));
  };

  useEffect(() => {
    if (product) {
      if (variantId && !selectedVariant) {
        const selectedVariant = product?.variants?.find(
          variant => variant?.id == variantId,
        );
        setSelectedVariant(selectedVariant);
      } else {
        if (optionsTypes?.length > 0) {
          const selectedVariant = product.variants.find(variant => {
            return optionsTypes.every(optionType => {
              const selectedOption =
                selectedOptions[optionType.option_type.name];
              return variant.option_values.some(
                optionValue => optionValue.name === selectedOption,
              );
            });
          });
          if (selectedVariant) {
            setSelectedVariant(selectedVariant);
          }
        } else {
          setSelectedVariant(product?.master);
        }
      }
      setIsSearchingForVariant(false);
    }
  }, [product, optionsTypes, selectedOptions]);

  useEffect(() => {
    if (product) {
      let options = {};

      if (variantId) {
        product?.variants
          ?.find(variant => variant?.id == variantId)
          ?.option_values?.forEach(
            option => (options[option?.option_type_name] = option?.name),
          );
      } else {
        product?.master?.option_values?.forEach(
          option => (options[option?.option_type_name] = option?.name),
        );
      }
      setSelectedOptions(options);
    }
  }, [product]);

  return {
    handleOptionSelection,
    optionsTypes,
    selectedOptions,
  };
};

export default useGetProductVariants;
