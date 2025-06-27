/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieves a list of all Simpsons products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */

/**
 * Retrieves a list of products from the products.json file.
 * @returns {Promise<Object>} A promise that resolves to an object containing The Simpsons products data.
 */

import products from '@/data/products.json'
import { NextResponse } from 'next/server'

export async function GET() {
  // Transform Simpsons products data to match the expected format
  const transformedProducts = products.map(product => {
    // Create a slug from the product name
    const slug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    
    // Generate a placeholder image URL with the product name
    // Using placeholder.com for simple colored placeholders with text
    const backgroundColor = Math.floor(Math.random() * 16777215).toString(16) // Random color
    const imageUrl = `https://via.placeholder.com/200x200/${backgroundColor}/FFFFFF?text=${encodeURIComponent(product.name)}`
    
    return {
      id: product.id,
      name: product.name,
      slug: slug,
      category: product.category,
      description: product.description,
      image: imageUrl
    }
  })

  // Add cache control headers to prevent caching
  const response = NextResponse.json({ products: transformedProducts })
  response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  
  return response
}
