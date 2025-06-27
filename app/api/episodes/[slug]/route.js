/**
 * @swagger
 * /api/episodes/{slug}:
 *   get:
 *     summary: Retrieves a specific Simpsons episode by slug
 *     tags: [Episodes]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the episode
 *     responses:
 *       200:
 *         description: Episode details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 episode:
 *                   allOf:
 *                     - $ref: '#/components/schemas/Episode'
 *                     - type: object
 *                       properties:
 *                         characters:
 *                           type: array
 *                           items:
 *                             type: string
 *                         director:
 *                           type: string
 *                         writer:
 *                           type: string
 *                         funFacts:
 *                           type: array
 *                           items:
 *                             type: string
 *       404:
 *         description: Episode not found
 *       500:
 *         description: Server error
 */

/**
 * Retrieves a Simpsons episode based on the provided slug.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.slug - The slug of the episode.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the episode data, or an error response.
 */

import episodes from '@/data/episodes.json'
import { NextResponse } from 'next/server'
import { setCorsHeaders, handleCorsOptions } from '@/lib/cors'

export async function OPTIONS() {
  return handleCorsOptions()
}

export async function GET(req, { params }) {
  try {
    // Find the episode by slug
    const episode = episodes.find(
      item => item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === params.slug
    )
    
    if (!episode) {
      return new NextResponse('not found', { status: 404 })
    }

    // Create a slug from the episode name
    const slug = episode.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    
    // Create a more detailed episode object with additional fields
    const enhancedEpisode = {
      id: episode.id,
      name: episode.name,
      slug: slug,
      season: episode.season,
      episode: episode.episode,
      description: episode.description,
      rating: episode.rating,
      airDate: episode.airDate,
      thumbnailUrl: episode.thumbnailUrl,
      fullSizeImageUrl: episode.thumbnailUrl, // Using the same image for now
      characters: [
        "Homer Simpson", 
        "Marge Simpson", 
        "Bart Simpson", 
        "Lisa Simpson", 
        "Maggie Simpson"
      ],
      director: "Various",
      writer: "Various",
      funFacts: [
        `This episode has a rating of ${episode.rating} out of 10.`,
        `It originally aired on ${new Date(episode.airDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}.`,
        "The Simpsons is the longest-running American animated television series."
      ]
    }

    // Add specific details for well-known episodes
    if (episode.name === "Homer the Heretic") {
      enhancedEpisode.funFacts = [
        "This episode won an Emmy Award for Outstanding Animated Program.",
        "It's considered one of the best episodes of the series.",
        "The episode explores themes of religion and personal freedom."
      ]
    } else if (episode.name === "Marge vs. the Monorail") {
      enhancedEpisode.funFacts = [
        "This episode was written by Conan O'Brien.",
        "It features a guest appearance by Leonard Nimoy.",
        "It's frequently ranked as one of the best episodes of the series."
      ]
    } else if (episode.name === "Last Exit to Springfield") {
      enhancedEpisode.funFacts = [
        "This episode contains numerous film parodies including The Godfather and Batman.",
        "The episode's title is a reference to the novel 'Last Exit to Brooklyn'.",
        "It's considered by many critics to be the best episode of the series."
      ]
    }

    // Add cache control headers to prevent caching
    const response = NextResponse.json({
      episode: enhancedEpisode
    })
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    // Add CORS headers
    return setCorsHeaders(response)
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
