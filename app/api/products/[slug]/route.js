/**
 * @swagger
 * /api/products/{slug}:
 *   get:
 *     summary: Retrieves a specific Simpsons product by slug
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The slug of the product
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   allOf:
 *                     - $ref: '#/components/schemas/Product'
 *                     - type: object
 *                       properties:
 *                         details:
 *                           type: string
 *                         mainImage:
 *                           type: string
 *                         images:
 *                           type: array
 *                           items:
 *                             type: string
 *                         price:
 *                           type: string
 *                         inStock:
 *                           type: boolean
 *                         rating:
 *                           type: string
 *                         relatedProducts:
 *                           type: array
 *                           items:
 *                             type: string
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * Retrieves a Simpsons product based on the provided slug.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.slug - The slug of the product.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the product data, or an error response.
 */

import products from '@/data/products.json'
import { NextResponse } from 'next/server'
import { setCorsHeaders, handleCorsOptions } from '@/lib/cors'

export async function OPTIONS() {
  return handleCorsOptions()
}

export async function GET(req, { params }) {
  try {
    // Find the product by slug
    const product = products.find(
      item => item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') === params.slug
    )
    
    if (!product) {
      return new NextResponse('not found', { status: 404 })
    }

    // Create a slug from the product name
    const slug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
    
    // Use the image URL from the data or generate a placeholder if not available
    const imageUrl = product.image || `https://via.placeholder.com/200x200/466dc0/FFFFFF?text=${encodeURIComponent(product.name)}`
    
    // Create different placeholder images for the detail view based on the main image
    const colorCode = imageUrl.match(/\/([0-9a-f]{6})\//) ? imageUrl.match(/\/([0-9a-f]{6})\//)[1] : '466dc0'
    const image1 = product.image || `https://via.placeholder.com/400x300/${colorCode}/FFFFFF?text=${encodeURIComponent(product.name)}+View+1`
    const image2 = product.image || `https://via.placeholder.com/400x300/${colorCode}/FFFFFF?text=${encodeURIComponent(product.name)}+View+2`
    
    // Create a more detailed product object with additional fields
    const enhancedProduct = {
      id: product.id,
      name: product.name,
      slug: slug,
      category: product.category,
      description: product.description,
      details: product.Details,
      mainImage: imageUrl,
      images: [image1, image2],
      price: (Math.random() * 50 + 9.99).toFixed(2), // Random price between $9.99 and $59.99
      inStock: Math.random() > 0.3, // 70% chance of being in stock
      rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
      relatedProducts: [
        "Lisa Lionheart",
        "Krusty's Kreepy Konjuring Kit",
        "Lakeside Boggle"
      ].filter(name => name !== product.name).slice(0, 2) // 2 related products excluding current product
    }

    // Add cache control headers to prevent caching
    const response = NextResponse.json({
      product: enhancedProduct
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
