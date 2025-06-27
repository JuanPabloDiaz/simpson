/**
 * Simple homepage that displays Simpsons characters from the API
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch characters directly from the API
    async function fetchCharacters() {
      try {
        // Add cache-busting timestamp
        const timestamp = Date.now()
        const response = await fetch(`/api/characters?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
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

    fetchCharacters()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading Simpsons Characters...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error Loading Characters</h1>
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">The Simpsons Characters</h1>
      <p className="mb-4">Total characters: {characters.length}</p>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {characters.map(character => (
          <div key={character.id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="p-2 bg-yellow-400 text-center font-bold truncate">
              {character.name}
            </div>
            <div className="p-2">
              <Image 
                src={character.avatar} 
                alt={character.name} 
                width={150}
                height={150}
                className="w-full h-auto rounded"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://via.placeholder.com/150?text=Character'
                }}
              />
            </div>
            <Link 
              href={`/characters/${character.slug}`}
              className="block text-center bg-blue-500 text-white py-2 hover:bg-blue-600 transition-colors"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
