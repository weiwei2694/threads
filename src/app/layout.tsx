import './globals.css'
import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Threads',
  description: 'create your first thread',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <main className="flex flex-row">
          {/* LeftSideBar */}
          <section className="main-container">
            <div className="max-w-4xl w-full">
              {children}
            </div>
          </section>
          {/* RightSideBar */}
        </main>
      </body>
    </html>
  )
}
