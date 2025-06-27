'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components'

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const timestamp = Date.now()
        const response = await fetch(`/api/episodes?t=${timestamp}`, {
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
        setEpisodes(data.episodes || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching episodes:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchEpisodes()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-500 py-10">
        <Container>
          <div className="text-center py-20">
            <div className="inline-block animate-bounce bg-white p-6 rounded-full shadow-lg mb-4">
              <iconify-icon icon="mdi:loading" width="48" height="48"></iconify-icon>
            </div>
            <h1 className="text-3xl font-bold text-blue-900">Loading Simpsons Episodes...</h1>
          </div>
        </Container>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-500 py-10">
        <Container>
          <div className="text-center py-20">
            <div className="inline-block bg-red-500 p-6 rounded-full shadow-lg mb-4">
              <iconify-icon icon="mdi:alert-circle" width="48" height="48" style={{color: 'white'}}></iconify-icon>
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-4">D&apos;oh! Something went wrong</h1>
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
    <main className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-500 py-10">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">
            Simpsons Episodes
          </h1>
          <p className="text-xl text-blue-800 max-w-2xl mx-auto">
            Browse through {episodes.length} amazing episodes from the series!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map(episode => (
            <div 
              key={episode.id || episode.title} 
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-900"
            >
              <div className="p-3 bg-blue-400 text-center font-bold border-b-2 border-blue-900">
                <h2 className="text-lg text-blue-900 truncate">{episode.title}</h2>
              </div>
              
              {episode.image && (
                <div className="relative h-48 w-full">
                  <Image 
                    src={episode.image} 
                    alt={episode.title} 
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = 'https://via.placeholder.com/400x200?text=Episode'
                    }}
                  />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Season {episode.season}</span>
                  <span className="text-sm text-gray-600">Episode {episode.episode}</span>
                </div>
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                  {episode.description || 'No description available'}
                </p>
                <Link 
                  href={`/episodes/${episode.slug}`}
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
