'use client';
import {useEffect, useMemo, useRef} from 'react';
import Collapsible from 'react-collapsible';
import _ from 'lodash';
import {FaAngleDown, FaAngleUp} from 'react-icons/fa';
import {useTranslations} from 'next-intl';
import {AppText, CheckBox} from '../common';
import styles from './AddonsType.module.css';
import AppButton from '../common/AppButton';

const AddonsType = ({
  addonType,
  index,
  toggleSection,
  expandedSection,
  handleAddonsSelection,
  highlightedSection,
  setHighlightedSection,
  requiredAddonRefs,
  selectedAddonsOptions,
  currency,
}) => {
  const t = useTranslations();
  const selectedCount = useMemo(
    () =>
      selectedAddonsOptions?.filter(id =>
        addonType?.addons.some(a => a.id === id),
      )?.length || 0,
    [selectedAddonsOptions, addonType],
  );

  const limitTextColor = useMemo(
    () => (selectedCount >= addonType?.limit ? 'text-green' : 'text-red'),
    [selectedCount, addonType],
  );

  useEffect(() => {
    if (
      selectedCount >= addonType?.limit &&
      highlightedSection?.presentation === addonType?.presentation
    ) {
      setHighlightedSection(null);
    }
  }, [selectedCount, highlightedSection, addonType, setHighlightedSection]);

  useEffect(() => {
    if (
      selectedCount === 0 &&
      highlightedSection?.presentation === addonType?.presentation &&
      expandedSection !== index
    ) {
      toggleSection(index);
    }
  }, [selectedCount, highlightedSection, addonType]);

  const sectionRef = useRef();

  useEffect(() => {
    if (sectionRef.current) {
      const y = sectionRef.current.offsetTop;
      requiredAddonRefs.current[index] = {y};
    }
  }, [sectionRef, requiredAddonRefs, index]);

  const shouldShowLimit = useMemo(() => addonType?.limit !== 0, [addonType]);

  return (
    <div ref={sectionRef}>
      <div
        className={styles.headerContainer}
        onClick={() => toggleSection(index)}>
        <div className={styles.headerSubContainer}>
          <AppText
            classes={styles.boldText}
            text={`${addonType?.presentation} ${addonType?.required ? '*' : ''}`}
          />

          {shouldShowLimit && (
            <AppText
              classes={`${styles.opacity} ${limitTextColor}`}
              text={`(${selectedCount}/
              ${addonType?.multiselect ? addonType?.addons?.length : 1})`}
            />
          )}
          {expandedSection === index ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        {addonType?.required && (
          <div className={styles.requiredContainer}>
            <AppText text={t('required')} classes={styles.requiredText} />
          </div>
        )}
      </div>

      <Collapsible open={expandedSection === index} aria-controls={Date.now()}>
        <div className={styles.addonContainer}>
          {addonType?.addons?.map((addon, idx) => {
            const isDisabled =
              (!addonType?.multiselect &&
                selectedCount >= addonType?.limit &&
                !selectedAddonsOptions?.includes(addon?.id)) ||
              (!addonType?.multiselect && addonType?.limit > 1);
            return (
              <AppButton
                key={idx}
                buttonStyle={styles.addonSubContainer}
                onClick={() =>
                  !isDisabled && handleAddonsSelection(addon, addon?.id)
                }>
                <div className={styles.addonItem}>
                  <CheckBox
                    selected={selectedAddonsOptions?.includes(addon?.id)}
                  />
                  <AppText
                    classes={isDisabled && styles.grayText}
                    text={_.capitalize(addon?.presentation)}
                  />
                </div>
                {addon?.price > 0 && (
                  <AppText text={`+ ${addon?.price} ${currency}`} />
                )}
              </AppButton>
            );
          })}
        </div>
      </Collapsible>
    </div>
  );
};

export default AddonsType;
