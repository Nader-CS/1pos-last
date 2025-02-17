import {memo} from 'react';

const SkeletonLoadingView = ({isLoading, SkeletonComponent, children}) => {
  if (isLoading) {
    return <SkeletonComponent />;
  }

  return children;
};
export default memo(SkeletonLoadingView);
