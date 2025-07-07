/**
 * Test page to directly fetch and display Simpsons character data
 */

'use client'

import { useState, useEffect } from 'react'
import { Container } from '@/components'
import Image from 'next/image'
import Link from 'next/link'

export default function TestPage() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Add timestamp to prevent caching
        const timestamp = new Date().getTime()
        const response = await fetch(`/api/characters?t=${timestamp}`, {
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log('Fetched characters:', data)
        setCharacters(data.characters || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching characters:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 flex items-center justify-center">
        <Container>
          <div className="text-center">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-900 border-solid"></div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-900 opacity-30"></div>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
                  Loading Simpsons...
                </h1>
                <p className="text-xl text-blue-800 animate-pulse">
                  Getting ready to meet Springfield&apos;s finest!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <h1 className="text-2xl font-bold mb-4">Error Loading Characters</h1>
        <p className="text-red-500">{error}</p>
      </Container>
    )
  }

  return (
    <Container className="py-5">
      <h1 className="text-2xl font-bold mb-4">Simpsons Characters Test Page</h1>
      <p className="mb-4">Found {characters.length} characters</p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {characters.map(character => (
          <div key={character.id} className="border rounded-md p-2">
            <h2 className="font-semibold mb-2">{character.name}</h2>
            <div className="overflow-hidden rounded-md mb-2">
              <Image
                src={character.avatar}
                alt={character.name}
                width={200}
                height={200}
                className="w-full h-auto"
              />
            </div>
            <Link
              href={`/characters/${character.slug}`}
              className="block text-center bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </Container>
  )
}
