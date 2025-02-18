"use client";
import { useEffect, useRef } from "react";
import { CategoryItem } from ".";
import styles from "./Categories.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "@/slices";
import { getActiveCategory } from "@/selectors";

const Categories = ({ categories }) => {
  const dispatch = useDispatch();
  const currentCategory = useSelector(getActiveCategory);
  const containerRef = useRef(null);

  useEffect(() => {
    if (categories?.length > 0) {
      dispatch(setCategory(categories[0]?.id));
    }
  }, [categories]);

  useEffect(() => {
    if (containerRef.current && currentCategory) {
      const activeIndex = categories?.findIndex(
        (c) => c?.id === currentCategory,
      );
      if (activeIndex !== -1) {
        const activeElement = containerRef.current?.children?.[activeIndex];
        activeElement?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  }, [currentCategory, categories]);

  return (
    <div ref={containerRef} className={styles.container}>
      {categories?.map((category) => (
        <CategoryItem key={category?.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
