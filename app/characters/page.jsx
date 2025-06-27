'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components'

export default function CharactersPage() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCharacters() {
      try {
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
      <main className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 py-10">
        <Container>
          <div className="text-center py-20">
            <div className="inline-block animate-bounce bg-white p-6 rounded-full shadow-lg mb-4">
              <div className="text-5xl">🔄</div>
            </div>
            <h1 className="text-3xl font-bold text-blue-900">Loading Simpsons Characters...</h1>
          </div>
        </Container>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 py-10">
        <Container>
          <div className="text-center py-20">
            <div className="inline-block bg-red-500 p-6 rounded-full shadow-lg mb-4">
              <div className="text-5xl">⚠️</div>
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-4">D'oh! Something went wrong</h1>
            <p className="text-xl text-red-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-900 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-blue-800 transition-colors"
            >
              Try Again
            </button>
          </div>
        </Container>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 py-10">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">
            Simpsons Characters
          </h1>
          <p className="text-xl text-blue-800 max-w-2xl mx-auto">
            Meet the residents of Springfield! Total characters: {characters.length}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {characters.map(character => (
            <div 
              key={character.id || character.name} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border-2 border-blue-900"
            >
              <div className="p-2 bg-yellow-400 text-center font-bold truncate border-b-2 border-blue-900">
                {character.name}
              </div>
              <div className="p-4 text-center">
                <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                  {character.avatar && (
                    <Image 
                      src={character.avatar} 
                      alt={character.name} 
                      width={96} 
                      height={96}
                      className="object-cover"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://via.placeholder.com/96?text=?'
                      }}
                    />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {character.normalized_name || 'Springfield Resident'}
                </p>
                <Link 
                  href={`/characters/${character.slug}`}
                  className="block text-center bg-blue-900 text-white py-2 px-4 rounded-full hover:bg-blue-800 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  )
}
