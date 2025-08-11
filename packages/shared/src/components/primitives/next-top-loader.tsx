'use client';

import NexTopLoader, { NextTopLoaderProps } from 'nextjs-toploader';
import * as React from 'react';
import defaultTheme from 'tailwindcss/defaultTheme';

export const themeShadow = defaultTheme.boxShadow.DEFAULT;

const TopLoader = ({ ...props }: NextTopLoaderProps) => {
  return (
    <NexTopLoader
      color="var(--primary)"
      shadow={themeShadow}
      showSpinner={false}
      {...props}
    />
  );
};

export { TopLoader };
