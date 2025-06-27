/**
 * @swagger
 * /api/episodes:
 *   get:
 *     summary: Retrieves a list of all Simpsons episodes
 *     tags: [Episodes]
 *     responses:
 *       200:
 *         description: A list of episodes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 episodes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Episode'
 *       500:
 *         description: Server error
 */

/**
 * Retrieves a list of episodes from the episodes.json file.
 * @returns {Promise<Object>} A promise that resolves to an object containing The Simpsons episodes data.
 */

import episodes from '@/data/episodes.json'
import { NextResponse } from 'next/server'
import { setCorsHeaders, handleCorsOptions } from '@/lib/cors'

export async function OPTIONS() {
  return handleCorsOptions()
}

export async function GET() {
  // Transform Simpsons episodes data to match the expected format
  const transformedEpisodes = episodes.map(episode => {
    // Create a slug from the episode name
    const slug = episode.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    
    return {
      id: episode.id,
      name: episode.name,
      slug: slug,
      season: episode.season,
      episode: episode.episode,
      description: episode.description,
      rating: episode.rating,
      airDate: episode.airDate,
      thumbnailUrl: episode.thumbnailUrl
    }
  })

  // Add cache control headers to prevent caching
  const response = NextResponse.json({ episodes: transformedEpisodes })
  response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  
  // Add CORS headers
  return setCorsHeaders(response)
}
