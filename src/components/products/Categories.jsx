'use client';
import {useEffect, useMemo, useRef} from 'react';
import {CategoryItem} from '.';
import styles from './Categories.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {setCategory} from '@/slices';
import {getActiveCategory} from '@/selectors';

const Categories = ({categories}) => {
  const dispatch = useDispatch();
  const currentCategory = useSelector(getActiveCategory);
  const containerRef = useRef(null);
  const activeIndex = useMemo(() => {
    return categories?.findIndex(c => c?.id === currentCategory);
  }, [categories, currentCategory]);

  useEffect(() => {
    if (categories?.length > 0 && !currentCategory) {
      dispatch(setCategory(categories[0]?.id));
    }
  }, [categories, currentCategory]);

  useEffect(() => {
    if (containerRef.current && activeIndex !== -1) {
      const activeElement = containerRef.current?.children?.[activeIndex];
      activeElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [activeIndex]);

  return (
    <div ref={containerRef} className={styles.container}>
      {categories?.map(category => (
        <CategoryItem key={category?.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
