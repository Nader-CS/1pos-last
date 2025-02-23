'use client';

import {useDispatch, useSelector} from 'react-redux';
import styles from './CategoryItem.module.css';
import AppButton from '../common/AppButton';
import {setCategory} from '@/slices';
import {getActiveCategory} from '@/selectors';
const CategoryItem = ({category}) => {
  const dispatch = useDispatch();
  const currentSelectedCategory = useSelector(getActiveCategory);

  const onCategoryClick = () => {
    dispatch(setCategory(category?.id));
  };

  return (
    <div className={styles.category}>
      <AppButton
        name={category?.presentation}
        onClick={onCategoryClick}
        buttonStyle={`${styles['category-button']} ${currentSelectedCategory == category?.id && styles['category-active']}`}
      />
    </div>
  );
};
export default CategoryItem;
