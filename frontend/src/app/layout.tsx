// app/layout.tsx
import {Providers} from './providers';

import {UserContextProvider} from '@/contexts/Usercontext';
import {Playfair_Display} from 'next/font/google';
import './globals.css';

const playFair = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});
export const metadata = {
  title: 'WizardBoards - See the future',
  icons: {
    icon: 'https://barsoft.hu/ipanel/favicon.ico',
    shortcut: 'https://barsoft.hu/ipanel/favicon-32x32.png',
    apple: 'https://barsoft.hu/ipanel/apple-touch-icon.png',
  },
  description: 'WizardBoards for those who can see the future.',
};
export default function RootLayout({children}: {children: React.ReactNode}) {
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
