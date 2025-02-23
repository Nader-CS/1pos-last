'use client';
import React, {memo, useCallback, useMemo} from 'react';
import Image from 'next/image';
import {useGetProductVariants} from '@/hooks';
import {useTranslations} from 'next-intl';
import {convertEnglishNumbersToArabic} from '@/lib';
import {AppText, CheckBox} from '../common';
import {cup} from '@/assets';
import styles from './ProductVariants.module.css';

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
        ? 'bg-primary'
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
              <div className={styles.header}>
                <AppText
                  className={styles.headerText}
                  text={`${t('choose')} ${optionType?.option_type?.presentation} *`}
                />
              </div>

              <div
                className={`${styles.mainContainer} ${getVariantContainerStyle(optionType)} `}>
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
                      <div key={subIndex} className={styles.rowSubContainer}>
                        <button
                          className={`${styles.button} ${getVariantCardStyle(
                            optionType,
                            value?.name,
                          )}`}
                          onClick={() =>
                            onVariantOptionSelection(optionType, value?.name)
                          }>
                          <Image
                            src={cup}
                            {...getSizes(value?.name)}
                            alt={value?.presentation}
                            className={`${getColor(optionType, value?.name)} ${styles.variantCupsImage}`}
                          />
                          <AppText
                            classes={`${getColor(
                              optionType,
                              value?.name,
                            )} ${styles.variantName} `}
                            text={value?.presentation}
                          />
                        </button>

                        {price != 0 && (
                          <AppText
                            classes={styles.variantPriceAddition}
                            text={`${convertEnglishNumbersToArabic(price)} ${currency}`}
                          />
                        )}
                      </div>
                    );
                  } else {
                    return (
                      <div key={subIndex} className={styles.columnSubContainer}>
                        <CheckBox
                          selected={isVariantRadioButtonSelected(
                            optionType,
                            value?.name,
                          )}
                        />
                        <AppText
                          className={styles.columnVariantText}
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
