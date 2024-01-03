// app/layout.tsx
import {Providers} from "./providers";
import { UserContextProvider } from "./Main/contexts/Usercontext";
import "./globals.css";
import {Playfair_Display} from 'next/font/google'

const playFair = Playfair_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en" className='dark'>
      <body 
      className={playFair.className}>
        <UserContextProvider>
          <Providers>
            {children}
          </Providers>
        </UserContextProvider>
      </body>
    </html>
  );
}

