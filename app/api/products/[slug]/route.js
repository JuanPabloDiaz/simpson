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
    
    // Generate placeholder image URLs with the product name
    // Using placeholder.com for simple colored placeholders with text
    const backgroundColor = Math.floor(Math.random() * 16777215).toString(16) // Random color
    const imageUrl = `https://via.placeholder.com/200x200/${backgroundColor}/FFFFFF?text=${encodeURIComponent(product.name)}`
    
    // Create different placeholder images for the detail view
    const image1 = `https://via.placeholder.com/400x300/${backgroundColor}/FFFFFF?text=${encodeURIComponent(product.name)}+View+1`
    const image2 = `https://via.placeholder.com/400x300/${(parseInt(backgroundColor, 16) + 1000).toString(16)}/FFFFFF?text=${encodeURIComponent(product.name)}+View+2`
    
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
    
    return response
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
