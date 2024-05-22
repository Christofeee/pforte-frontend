import './globals.css'
import { Inter } from 'next/font/google'
import Nav from '@/components/nav'
import SessionProviderWrapper from '@/utils/sessionProviderWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pforte',
  description: 'Developed by Zin Phyo Min',
}

export default function RootLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        <body className={inter.className}>
          <div className=''><Nav /></div>
          <div>{children}</div>
          <div>Footer</div>
        </body>
      </html>
    </SessionProviderWrapper>
  )
}