'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components'

export default function EpisodeDetailPage() {
  const params = useParams()
  const { slug } = params
  
  const [episode, setEpisode] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchEpisodeDetail() {
      try {
        const timestamp = Date.now()
        const response = await fetch(`/api/episodes/${slug}?t=${timestamp}`, {
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
        setEpisode(data.episode)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching episode details:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    if (slug) {
      fetchEpisodeDetail()
    }
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 py-10">
        <Container>
          <div className="text-center py-20">
            <div className="inline-block animate-bounce bg-white p-6 rounded-full shadow-lg mb-4">
              <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h1 className="text-3xl font-bold text-blue-900">Loading Episode Details...</h1>
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
              <div className="w-12 h-12 text-white flex items-center justify-center">❌</div>
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-4">D&apos;oh! Something went wrong</h1>
            <p className="text-xl text-red-600 mb-6">{error}</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => window.location.reload()} 
                className="bg-blue-900 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-blue-800 transition-colors"
              >
                Try Again
              </button>
              <Link 
                href="/episodes" 
                className="bg-yellow-600 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-yellow-700 transition-colors"
              >
                Back to Episodes
              </Link>
            </div>
          </div>
        </Container>
      </main>
    )
  }

  if (!episode) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 py-10">
        <Container>
          <div className="text-center py-20">
            <div className="inline-block bg-red-500 p-6 rounded-full shadow-lg mb-4">
              <div className="w-12 h-12 text-white flex items-center justify-center">❓</div>
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-4">Episode Not Found</h1>
            <p className="text-xl text-blue-800 mb-6">We couldn&apos;t find the episode you&apos;re looking for.</p>
            <Link 
              href="/episodes" 
              className="bg-blue-900 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-blue-800 transition-colors"
            >
              Back to Episodes
            </Link>
          </div>
        </Container>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 py-10">
      <Container>
        <div className="mb-6">
          <Link 
            href="/episodes" 
            className="inline-flex items-center text-blue-900 hover:text-blue-700 transition-colors font-bold"
          >
            ← Back to Episodes
          </Link>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-xl border-2 border-blue-900">
          {/* Episode Header */}
          <div className="p-4 bg-blue-400 border-b-2 border-blue-900">
            <h1 className="text-3xl font-bold text-blue-900">{episode.name}</h1>
            <div className="flex items-center mt-2 text-blue-800">
              <span className="mr-4">Season {episode.season}</span>
              <span className="mr-4">Episode {episode.episode}</span>
              <span>Rating: {episode.rating}/10</span>
            </div>
          </div>

          {/* Episode Image */}
          <div className="relative h-64 md:h-96 w-full">
            <Image 
              src={episode.fullSizeImageUrl || episode.thumbnailUrl || 'https://via.placeholder.com/800x400?text=Episode+Image'} 
              alt={episode.name} 
              fill
              className="object-cover"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = 'https://via.placeholder.com/800x400?text=Episode+Image'
              }}
            />
          </div>

          {/* Episode Details */}
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Description</h2>
              <p className="text-gray-700">{episode.description || 'No description available'}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Air Date</h2>
              <p className="text-gray-700">
                {new Date(episode.airDate).toLocaleDateString('en-US', {
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })}
              </p>
            </div>

            {episode.characters && episode.characters.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Featured Characters</h2>
                <div className="flex flex-wrap gap-2">
                  {episode.characters.map((character, index) => (
                    <span 
                      key={index} 
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {character}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {episode.director && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Director</h2>
                <p className="text-gray-700">{episode.director}</p>
              </div>
            )}

            {episode.writer && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Writer</h2>
                <p className="text-gray-700">{episode.writer}</p>
              </div>
            )}

            {episode.funFacts && episode.funFacts.length > 0 && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Fun Facts</h2>
                <ul className="list-disc pl-5 text-gray-700">
                  {episode.funFacts.map((fact, index) => (
                    <li key={index} className="mb-1">{fact}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </main>
  )
}
