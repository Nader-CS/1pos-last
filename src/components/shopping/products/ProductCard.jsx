'use client';

import Image from 'next/image';
import {AppText, ImageSkelton} from '../../common';
import {ProductActionButton} from '.';
import {motion} from 'framer-motion';
import {useState} from 'react';
import {useRouter} from '@/i18n/routing';

function ProductCard({product}) {
  const productImage = product?.images_urls?.[0] || '/logo.png';
  const [isProductImageLoading, setIsProductImageLoading] = useState(false);
  const router = useRouter();

  const navigateToProduct = () => {
    router.push(`${product?.id}`);
  };

  return (
    <motion.div
      className="flex h-[60px] w-[100%] items-center justify-between py-1"
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        opacity: {duration: 0.4},
        y: {type: 'spring', stiffness: 100, damping: 25, delay: 0.2},
        scale: {duration: 0.3, delay: 0.2},
      }}>
      <div
        className="flex w-[80%] cursor-pointer gap-2"
        onClick={navigateToProduct}>
        {isProductImageLoading && <ImageSkelton circle />}
        <Image
          onLoadStart={() => setIsProductImageLoading(true)}
          onLoad={() => setIsProductImageLoading(false)}
          src={productImage}
          alt={product?.presentation}
          className="h-full w-[60px]"
          width={60}
          height={60}
          hidden={isProductImageLoading}
        />
        <div className="flex flex-col justify-center gap-1">
          <AppText
            text={product?.presentation}
            classes={'text-black text-[0.9rem] font-[regular] line-clamp-1'}
          />
          <AppText
            text={product?.description || ''}
            classes={
              'text-doveGray text-[12px] font-[regular] max-w-[85%] line-clamp-2 leading-tight'
            }
          />
        </div>
      </div>
      <ProductActionButton product={product} />
    </motion.div>
  );
}

export default ProductCard;
