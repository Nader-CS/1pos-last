'use client';
import styles from './Categories.module.css';
import {AppButton, AppText} from '../../common';
import {useEffect, useState, useRef} from 'react';
import {Products} from '.';
import {useStoreAndTableIds} from '@/hooks';
import {useSwipeable} from 'react-swipeable';
import {useLocale, useTranslations} from 'next-intl';
import {useGetProductsQuery} from '@/services/catalog';
import {getCookie} from 'cookies-next';
import {useGetOrderQuery} from '@/services/order';
import {commonQueriesConfig} from '@/utils';

function Categories({categories}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const cartId = getCookie('cartId');
  const {storeId} = useStoreAndTableIds();
  const locale = useLocale();
  const categoriesContainerRef = useRef(null);
  const isTouchingCategory = useRef(false);
  const t = useTranslations();

  const [pageCat, setPageCat] = useState(1);

  const {
    isFetching: isFetchingProducts,
    isUninitialized: isUninitializedProducts,
  } = useGetProductsQuery(
    {
      category_id: selectedCategory,
      store_id: storeId,
      page: pageCat,
    },
    {
      skip: !storeId || !selectedCategory,
    },
  );
  const {currentData: {orders: order} = {}} = useGetOrderQuery(cartId, {
    skip: !cartId,
    ...commonQueriesConfig,
  });

  useEffect(() => {
    if (categories?.length) {
      setSelectedCategory(categories[0]?.id);
    }
  }, [categories]);

  const scrollToCategory = categoryId => {
    const categoryIndex = categories?.findIndex(
      category => category.id === categoryId,
    );
    if (categoriesContainerRef.current && categoryIndex !== -1) {
      const categoryButton =
        categoriesContainerRef.current.children[categoryIndex];
      if (categoryButton) {
        categoriesContainerRef.current.scrollTo({
          left:
            categoryButton.offsetLeft -
            categoriesContainerRef.current.offsetLeft,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleSwipe = direction => {
    if (isTouchingCategory.current) return;
    const currentIndex = categories?.findIndex(
      category => category.id === selectedCategory,
    );
    let newCategory;

    if (locale === 'ar') {
      newCategory =
        direction === 'left'
          ? categories[currentIndex - 1] || categories[categories?.length - 1]
          : categories[currentIndex + 1] || categories[0];
    } else {
      newCategory =
        direction === 'left'
          ? categories[currentIndex + 1] || categories[0]
          : categories[currentIndex - 1] || categories[categories?.length - 1];
    }

    if (newCategory) {
      setSelectedCategory(newCategory.id);
      scrollToCategory(newCategory.id);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true,
  });

  const handleTouchStart = e => {
    if (categoriesContainerRef.current.contains(e.target)) {
      isTouchingCategory.current = true;
    } else {
      isTouchingCategory.current = false;
    }
  };

  const handleTouchEnd = () => {
    isTouchingCategory.current = false;
  };

  return (
    <div
      className="relative flex h-[100%] flex-col"
      {...swipeHandlers}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}>
      <div
        className={`flex items-center bg-center ${styles.header_background}`}>
        <AppText
          text={t('menu')}
          classes="m-0 p-0 font-[bold] text-[1.5rem] text-black ps-10 uppercase"
        />
      </div>
      <div className="relative">
        <div
          ref={categoriesContainerRef}
          className="mt-3 flex items-end gap-3 overflow-x-auto whitespace-nowrap bg-white px-2 scrollbar-hide">
          {categories?.map(category => (
            <div key={category.id} className="flex flex-col gap-1">
              <AppButton
                name={category?.presentation?.toString()}
                buttonStyle="h-[60%] rounded-none px-0 bg-white w-[100%] min-w-fit"
                buttonTxtStyle={`text-[1rem] ${
                  selectedCategory === category?.id
                    ? 'text-black font-[medium]'
                    : 'text-silver font-[regular]'
                }`}
                onClick={() => {
                  setSelectedCategory(category?.id);
                  scrollToCategory(category?.id);
                }}
              />
              <div
                className={`h-[2px] min-w-fit ${
                  selectedCategory === category?.id
                    ? 'z-20 bg-black'
                    : 'bg-white'
                }`}
              />
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 z-10 h-[2px] w-[100%] bg-silver" />
      </div>

      {categories?.map(category =>
        category.id === selectedCategory ? (
          <Products
            key={category.id}
            storeId={storeId}
            categoryId={category.id}
            isCartEmpty={order?.line_items?.length === 0}
            setPageCat={setPageCat}
          />
        ) : null,
      )}
      {!isFetchingProducts &&
        !isUninitializedProducts &&
        order?.line_items?.length > 0 && (
          <AppButton
            name={t('place_order')}
            buttonStyle={`bg-scooter w-[100%] rounded-none uppercase absolute bottom-0 justify-center`}
            buttonTxtStyle={'text-white font-[medium] text-[1.2rem]'}
            isLinK
            href={`/order/${cartId}`}
            disabled={order?.line_items?.length === 0}
          />
        )}
    </div>
  );
}

export default Categories;
