/**
 * Simple character detail page that displays information about a single Simpsons character
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.slug - Character slug
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CharacterDetailPage({ params }) {
  const [character, setCharacter] = useState(null)
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch character details directly from the API
    async function fetchCharacterDetails() {
      try {
        // Add cache-busting timestamp
        const timestamp = Date.now()
        const response = await fetch(`/api/characters/${params.slug}?t=${timestamp}`, {
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
        console.log('Fetched character details:', data)
        setCharacter(data.character || null)
        setQuotes(data.character_quotes || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching character details:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchCharacterDetails()
  }, [params.slug])

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Loading Character Details...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Error Loading Character</h1>
        <p className="text-red-500">{error}</p>
        <div className="mt-4">
          <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
            Back to Home
          </Link>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!character) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Character Not Found</h1>
        <p>Sorry, we couldn't find this character.</p>
        <Link href="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="inline-block mb-4 text-blue-500 hover:underline">
        &larr; Back to All Characters
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Character header */}
        <div className="bg-yellow-400 p-4">
          <h1 className="text-3xl font-bold text-center">{character.name}</h1>
        </div>
        
        <div className="p-4">
          {/* Character image and basic info */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <img 
                src={character.avatar} 
                alt={character.name} 
                className="w-full h-auto rounded-lg shadow-md"
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = 'https://via.placeholder.com/300x300?text=Character'
                }}
              />
            </div>
            
            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="mb-4">{character.description}</p>
              
              {character.gender && (
                <p className="mb-2"><span className="font-semibold">Gender:</span> {character.gender}</p>
              )}
              
              {character.occupations && character.occupations.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-1">Occupations:</h3>
                  <ul className="flex flex-wrap gap-2">
                    {character.occupations.map((occupation, index) => (
                      <li key={index} className="bg-blue-100 px-3 py-1 rounded-full text-sm">
                        {occupation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {character.skills && character.skills.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-1">Skills:</h3>
                  <ul className="flex flex-wrap gap-2">
                    {character.skills.map((skill, index) => (
                      <li key={index} className="bg-green-100 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          
          {/* Character images */}
          {character.images && character.images.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {character.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md">
                    <img 
                      src={image} 
                      alt={`${character.name} ${index+1}`} 
                      className="w-full h-auto"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Character quotes */}
          {quotes && quotes.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Famous Quotes</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                {quotes.map((item, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <blockquote className="italic border-l-4 border-yellow-400 pl-4 py-1">
                      "{item.quote}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
