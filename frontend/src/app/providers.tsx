// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <div className='w-screen h-screen overflow-hidden'>
        {children}

      </div>
    </NextUIProvider>
  )
}