import {memo} from 'react';
import Skeleton from 'react-loading-skeleton';

const ImageSkelton = ({width, height, ...props}) => {
  return <Skeleton width={width || 60} height={height || 60} {...props} />;
};
export default memo(ImageSkelton);
