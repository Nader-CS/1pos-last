'use client';

import {getActiveCategory} from '@/selectors';
import {PlaceOrderButton} from '../common';
import {getCookie} from 'cookies-next';
import {useDispatch, useSelector} from 'react-redux';
import {ProductList} from '.';
import styles from './Products.module.css';
import {useSwipeable} from 'react-swipeable';
import {setCategory} from '@/slices';
import {useMemo} from 'react';
import {useGetOrderQuery} from '@/services';

const Products = ({categories}) => {
  const currentCategory = useSelector(getActiveCategory);
  const dispatch = useDispatch();
  const storeId = getCookie('storeId');
  const cartId = getCookie('cartId');
  const currentIndex = useMemo(
    () => categories?.findIndex(c => c?.id == currentCategory),
    [categories, currentCategory],
  );

  const {currentData: {orders: order} = {}, isFetching} = useGetOrderQuery(
    cartId,
    {
      skip: !cartId,
    },
  );

  const handleSwipe = direction => {
    let newIndex = currentIndex;

    if (direction == 'left' && currentIndex < categories?.length - 1) {
      newIndex++;
    } else if (direction == 'right' && currentIndex > 0) {
      newIndex--;
    }

    if (newIndex !== currentIndex) {
      dispatch(setCategory(categories?.[newIndex]?.id));
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe('left'),
    onSwipedRight: () => handleSwipe('right'),
    trackMouse: true,
  });

  const shouldShowPlaceOrderButton = useMemo(
    () => order?.line_items?.length > 0,
    [order],
  );

  return (
    <>
      <div {...handlers} className={styles.container}>
        {categories?.map(
          category =>
            category?.id === currentCategory && (
              <ProductList
                key={category.id}
                storeId={storeId}
                categoryId={category.id}
              />
            ),
        )}
      </div>
      {shouldShowPlaceOrderButton && <PlaceOrderButton cartId={cartId} />}
    </>
  );
};
export default Products;
