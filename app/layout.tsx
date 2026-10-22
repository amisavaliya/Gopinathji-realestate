
import { Fraunces, Work_Sans, Noto_Serif_Gujarati } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { prisma } from '../lib/prisma'
import ChatBox from '@/components/ChatBox'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['500', '600'] })
const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500'] })
const notoSerifGu = Noto_Serif_Gujarati({ subsets: ['gujarati'], variable: '--font-display-gu', weight: ['500', '600'] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const schemes = await prisma.scheme.findMany({ orderBy: { sortOrder: 'asc' }, select: { slug: true, nameEn: true } })

  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable} ${notoSerifGu.variable}`}>
      <body>
        <header className="site-header">
          <Link href="/"><img src="/logo.png" alt="Gopinathji Group" className="site-logo" /></Link>
<nav className="site-nav">
  <Link href="/#projects">Projects</Link>
  <Link href="/about">Our Story</Link>
  <Link href="/vision">Vision &amp; Mission</Link>
</nav>
        </header>
        {children}
        <ChatBox />
      </body>
    </html>
  )
}
