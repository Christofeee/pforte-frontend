import './globals.css'
import { Inter } from 'next/font/google'
import SessionProviderWrapper from '@/utils/sessionProviderWrapper'
import Nav from '@/components/nav'
import Footer from '@/components/footer'

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
          <div position="sticky"><Nav /></div>
          <div style={{marginTop:'60px'}}>{children}</div>
          <div><Footer /></div>
        </body>
      </html>
    </SessionProviderWrapper>
  )
}