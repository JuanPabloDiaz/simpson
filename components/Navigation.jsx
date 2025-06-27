/**
Renders a navigation component with a sticky header, containing a logo.
@component
@returns {JSX.Element} The rendered navigation component.
*/

import Link from 'next/link'
import { Container } from '.'
import Image from 'next/image'

export const Navigation = () => {
  return (
    <div className="sticky top-0 backdrop-blur-xl bg-[rgba(0,0,0,0.8)] border-b border-slate-800 z-50">
      <Container className="flex justify-between py-5" as="nav">
        <Link href="/">
          <Image src="/logo.png" alt="The Simpsons" width={70} height={50} />
        </Link>

        <Link href="/characters">
          Characters
        </Link>

        <Link href="/episodes">
          Episodes
        </Link>

        <Link href="/products">
          Products
        </Link>

        <Link href="/api-docs">
          API Docs
        </Link>
      </Container>
    </div>
  )
}
