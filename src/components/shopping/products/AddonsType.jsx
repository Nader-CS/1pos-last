'use client';
import {useEffect, useMemo, useRef} from 'react';
import Collapsible from 'react-collapsible';
import _ from 'lodash';
import {AppText, CheckBox} from '../../common';
import {FaAngleDown, FaAngleUp} from 'react-icons/fa';
import {useTranslations} from 'next-intl';

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
        className="mt-2 flex cursor-pointer items-center"
        onClick={() => toggleSection(index)}>
        <div className="flex items-center space-x-2">
          <AppText classes="font-bold">
            {addonType?.presentation} {addonType?.required && '*'}
          </AppText>
          {shouldShowLimit && (
            <AppText classes={`opacity-70 ${limitTextColor}`}>
              ({selectedCount}/
              {addonType?.multiselect ? addonType?.addons?.length : 1})
            </AppText>
          )}
          {expandedSection === index ? <FaAngleUp /> : <FaAngleDown />}
        </div>
        {addonType?.required && (
          <div
            className={`rounded-lg px-3 py-1 ${highlightedSection?.presentation === addonType?.presentation ? 'bg-red' : 'bg-wildSand'}`}>
            <AppText text={t('required')} classes={`text-scooter`} />
          </div>
        )}
      </div>

      <Collapsible open={expandedSection === index}>
        <div className="mt-4 space-y-4">
          {addonType?.addons?.map((addon, idx) => {
            const isDisabled =
              (!addonType?.multiselect &&
                selectedCount >= addonType?.limit &&
                !selectedAddonsOptions?.includes(addon?.id)) ||
              (!addonType?.multiselect && addonType?.limit > 1);
            return (
              <div
                key={idx}
                className="flex cursor-pointer items-center justify-between"
                onClick={() =>
                  !isDisabled && handleAddonsSelection(addon, addon?.id)
                }>
                <div className={`flex items-center gap-2 space-x-3`}>
                  <CheckBox
                    selected={selectedAddonsOptions?.includes(addon?.id)}
                  />
                  <AppText classes={`${isDisabled && 'text-gray'} `}>
                    {_.capitalize(addon?.presentation)}
                  </AppText>
                </div>
                {addon?.price > 0 && (
                  <AppText>
                    + {addon?.price} {currency}
                  </AppText>
                )}
              </div>
            );
          })}
        </div>
      </Collapsible>
    </div>
  );
};

export default AddonsType;
