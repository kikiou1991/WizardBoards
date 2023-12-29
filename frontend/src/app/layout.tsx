// app/layout.tsx
import {Providers} from "../components/providers";
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}