// app/layout.tsx
import {Providers} from './providers';

import {UserContextProvider} from '@/contexts/Usercontext';
import {Playfair_Display, Inter} from 'next/font/google';
import './globals.css';
import {WorkspaceContextProvider} from '@/contexts/WorkspaceContext';

const playFair = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});
const roboto = Inter({
  subsets: ['latin'],
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
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 1,
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: 'white'},
    {media: '(prefers-color-scheme: dark)', color: 'black'},
  ],
};
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={roboto.className}>
        <UserContextProvider>
          <WorkspaceContextProvider>
            <Providers>{children}</Providers>
          </WorkspaceContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
