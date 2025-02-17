import {memo} from 'react';
import Skeleton from 'react-loading-skeleton';

const ProductCardSkelton = () => {
  return Array(10)
    .fill()
    .map((_, index) => (
      <div
        key={index}
        className="flex w-full items-center justify-between py-1">
        <div className="flex w-[75%] items-center gap-2">
          <Skeleton circle={false} borderRadius={10} height={60} width={60} />
          <div className="flex w-[80%] flex-col justify-center gap-1">
            <Skeleton height={20} width="70%" />
            <Skeleton height={14} width="100%" />
          </div>
        </div>
        <Skeleton height={30} width={60} />
      </div>
    ));
};
export default memo(ProductCardSkelton);
