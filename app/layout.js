import './globals.css'
import { Inter } from 'next/font/google'
import SessionProviderWrapper from '@/utils/sessionProviderWrapper'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
// import { EdgeStoreProvider } from '../lib/edgestore';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pforte',
  description: 'Developed by Zin Phyo Min',
}

export default function RootLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <html lang="en">
        {/* <EdgeStoreProvider> */}
          <body className={inter.className}>
            <div position="sticky"><Nav /></div>
            <div style={{ marginTop: '13vh', minHeight: '83vh' }}>{children}</div>
            <div><Footer /></div>
          </body>
        {/* </EdgeStoreProvider> */}
      </html>
    </SessionProviderWrapper>
  )
}