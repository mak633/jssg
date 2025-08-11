'use client';
import { Card, CardContent } from '@ui/shared/components/primitives/card';
import React, { PropsWithChildren } from 'react';

const WelcomeBanner = ({ children }: PropsWithChildren) => {
  return (
    <Card className="h-fit min-h-96 w-full bg-cover bg-center p-0">
      <CardContent>
        <div className="flex flex-col border-none px-8 pb-6 pt-8 text-xl font-semibold leading-[30px] text-white">
          <span className="text-4xl">Quiz</span>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};

export default WelcomeBanner;
