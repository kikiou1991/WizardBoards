// app/layout.tsx
import { Providers } from './providers';

import { UserContextProvider } from '@/contexts/Usercontext';
import { Playfair_Display } from 'next/font/google';
import './globals.css';

const playFair = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={playFair.className}>
        <UserContextProvider>
          <Providers>{children}</Providers>
        </UserContextProvider>
      </body>
    </html>
  );
}
