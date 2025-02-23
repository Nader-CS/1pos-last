import React from 'react';
import Image from 'next/image';
import {logo} from '@/assets';

function LoadingView({children, isLoading}) {
  return isLoading ? (
    <div className="flex h-full w-full flex-1 items-center justify-center bg-white">
      <Image
        src={logo}
        alt="loading-logo"
        className="h-[50px] w-[250px] animate-continuousFadeInOut"
        priority
      />
    </div>
  ) : (
    children
  );
}

export default LoadingView;
