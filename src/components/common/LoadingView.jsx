'use client';
import React from 'react';
import Image from 'next/image';

function LoadingView({children, isLoading}) {
  return isLoading ? (
    <div className="flex w-full flex-1 items-center justify-center bg-white">
      <Image
        src="/logo.png"
        alt="loading-logo"
        className="h-[40px] w-[150px] animate-continuousFadeInOut"
        width={150}
        height={40}
      />
    </div>
  ) : (
    children
  );
}

export default LoadingView;
