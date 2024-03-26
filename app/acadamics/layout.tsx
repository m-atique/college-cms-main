import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import AcadamicHeader from './acadamicComponents/menubar'
import { Toaster } from '@/components/ui/toaster'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {<AcadamicHeader />}
        <Toaster />
        {children}
        </body>
    </html>
  )
}