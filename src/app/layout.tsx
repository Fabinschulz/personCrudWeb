import QueryWrapper from '@/context/queryWrapper'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Person CRUD',
  description: 'This application is a CRUD of people.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryWrapper>{children}</QueryWrapper>
      </body>
    </html>
  )
}
