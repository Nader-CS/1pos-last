'use client';
import React, {memo, useCallback, useMemo} from 'react';
import Image from 'next/image';
import {AppText, CheckBox} from '../../common';
import useGetProductVariants from '@/hooks/useGetProductVariants';
import {convertEnglishNumbersToArabic} from '@/utils';
import {useTranslations} from 'next-intl';

const getSizes = size => {
  if (size?.toLowerCase()?.includes('tims')) {
    return {width: 10, height: 15};
  } else if (size?.toLowerCase() === 'small') {
    return {width: 15, height: 20};
  } else if (size?.toLowerCase() === 'medium') {
    return {width: 20, height: 25};
  } else {
    return {width: 25, height: 30};
  }
};

const ProductVariants = ({
  setSelectedVariant,
  product,
  currency,
  selectedVariant,
  setIsSearchingForVariant,
}) => {
  const t = useTranslations();
  const {handleOptionSelection, optionsTypes, selectedOptions} =
    useGetProductVariants({
      setSelectedVariant,
      product,
      selectedVariant,
      setIsSearchingForVariant,
    });

  const getVariantContainerStyle = useCallback(
    optionType =>
      optionType?.option_type?.name?.toLowerCase() === 'size'
        ? 'flex-row'
        : 'flex-col',

    [],
  );

  const getVariantCardStyle = useCallback(
    (optionType, value) =>
      selectedOptions[optionType?.option_type?.name] === value
        ? 'bg-scooter'
        : 'bg-white',
    [selectedOptions],
  );

  const onVariantOptionSelection = useCallback(
    (optionType, value) =>
      handleOptionSelection(optionType?.option_type?.name, value),
    [handleOptionSelection],
  );

  const isVariantRadioButtonSelected = useCallback(
    (optionType, value) =>
      selectedOptions[optionType?.option_type?.name] === value,
    [selectedOptions],
  );

  const getColor = useCallback(
    (optionType, value) =>
      selectedOptions[optionType?.option_type?.name] !== value
        ? 'text-black'
        : 'text-white',
    [selectedOptions],
  );

  const masterVariant = useMemo(() => product?.master, [product]);

  return (
    <>
      {optionsTypes?.map(
        (optionType, index) =>
          optionType?.values?.length > 0 && (
            <React.Fragment key={index}>
              <div className="my-3">
                <AppText
                  className="text-gray-800 mb-4 text-lg font-bold"
                  text={t('choose')}>
                  {optionType?.option_type?.presentation} *
                </AppText>
              </div>

              <div
                className={`gap-2 ${getVariantContainerStyle(optionType)} flex`}>
                {optionType?.values?.map((value, subIndex) => {
                  if (optionType?.option_type?.name?.toLowerCase() === 'size') {
                    const variant = product?.variants?.find(variant =>
                      variant?.option_values?.some(
                        optionValue => optionValue?.name == value?.name,
                      ),
                    );

                    const price = Number(
                      Number(variant?.price) - Number(masterVariant?.price),
                    ).toFixed(2);

                    return (
                      <div key={subIndex} className="mb-4 max-w-[25%]">
                        <button
                          className={`flex h-[4rem] w-[4rem] flex-col items-center justify-evenly rounded-md p-1 ${getVariantCardStyle(
                            optionType,
                            value?.name,
                          )}`}
                          onClick={() =>
                            onVariantOptionSelection(optionType, value?.name)
                          }>
                          <Image
                            src={'/cup.png'}
                            {...getSizes(value?.name)}
                            alt={value?.presentation}
                            className={`${getColor(optionType, value?.name)}`}
                          />
                          <AppText
                            classes={`${getColor(
                              optionType,
                              value?.name,
                            )} text-smallFontSize text-center `}
                            text={value?.presentation}
                          />
                        </button>

                        {price != 0 && (
                          <AppText classes="mt-2 text-center text-smallFontSize">
                            {convertEnglishNumbersToArabic(price)} {currency}
                          </AppText>
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={subIndex}
                        className="mb-4 flex items-center gap-2">
                        <CheckBox
                          selected={isVariantRadioButtonSelected(
                            optionType,
                            value?.name,
                          )}
                        />
                        <AppText
                          className="text-gray-800 text-sm"
                          text={value?.presentation}
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </React.Fragment>
          ),
      )}
    </>
  );
};

export default memo(ProductVariants);
