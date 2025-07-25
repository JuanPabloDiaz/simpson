/**
 * @swagger
 * /api/characters:
 *   get:
 *     summary: Retrieves a list of all Simpsons characters
 *     tags: [Characters]
 *     responses:
 *       200:
 *         description: A list of characters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 characters:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Character'
 *       500:
 *         description: Server error
 */

/**
 * Retrieves a list of characters from the characters.json file.
 * @returns {Promise<Object>} A promise that resolves to an object containing the Simpsons characters data.
 */

import characters from '@/data/characters.json'
import { NextResponse } from 'next/server'
import { setCorsHeaders, handleCorsOptions } from '@/lib/cors'

export async function OPTIONS() {
  return handleCorsOptions()
}

export async function GET() {
  // Transform Simpsons character data to match the expected format
  // Pass all data from characters.json while adding additional useful fields
  const transformedCharacters = characters.map(character => {
    // Create a slug from the normalized name
    const slug = character.normalized_name.toLowerCase().replace(/\s+/g, '-')

    // Generate a placeholder image URL with the character name
    // Using placeholder.com for simple colored placeholders with text
    const backgroundColor = Math.floor(Math.random() * 16777215).toString(16) // Random color
    const avatarUrl = `https://via.placeholder.com/200x200/${backgroundColor}/FFFFFF?text=${encodeURIComponent(character.name)}`

    // Return all original data plus additional fields
    return {
      ...character, // Include all original character data
      slug: slug,
      avatar: avatarUrl,
      description: `${character.name} is a character from The Simpsons.`,
      gender: character.gender || 'unknown',
    }
  })

  // Add cache control headers to prevent caching
  const response = NextResponse.json({ characters: transformedCharacters })
  response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')

  // Add CORS headers
  return setCorsHeaders(response)
}
