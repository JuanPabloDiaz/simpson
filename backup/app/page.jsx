/**
Renders a Next.js page component that displays a grid of character avatars with links to individual character pages.
@component
@returns {JSX.Element} The rendered page component.
*/

import { Container } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { getAllCharacters } from '@/lib/characters'

// Disable caching for this page
export const revalidate = 0

export default async function Page() {
  // Force timestamp to prevent caching
  const timestamp = Date.now()
  const data = await getAllCharacters()
  
  console.log('Rendering page with characters:', data?.characters?.length)

  return (
    <main>
      <Container className="grid grid-cols-2 gap-1 py-5 md:grid-cols-3 lg:grid-cols-4">
        {data?.characters?.map(item => {
          return (
            <Link
              href={`/characters/${item.slug}?t=${timestamp}`}
              key={item.slug || item.id}
              className="overflow-hidden rounded-md"
            >
              <Image
                src={`${item.avatar}?t=${timestamp}`}
                alt={item.name || ''}
                className="transition-all duration-500 hover:scale-110 hover:-rotate-2"
                width={500}
                height={500}
              />
            </Link>
          )
        })}
      </Container>
    </main>
  )
}
