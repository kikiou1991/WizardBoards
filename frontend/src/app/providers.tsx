// app/providers.tsx
'use client';

import {NextUIProvider} from '@nextui-org/react';
import {Toaster} from 'react-hot-toast';

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <NextUIProvider>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='w-screen h-screen overflow-hidden'>{children}</div>
    </NextUIProvider>
  );
}
