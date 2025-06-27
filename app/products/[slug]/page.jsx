'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components'

export default function ProductDetailPage() {
  const params = useParams()
  const { slug } = params
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const timestamp = Date.now()
        const response = await fetch(`/api/products/${slug}?t=${timestamp}`, {
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
        setProduct(data.product)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching product details:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    if (slug) {
      fetchProductDetail()
    }
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 py-10">
        <Container>
          <div className="text-center py-20">
            <div className="inline-block animate-bounce bg-white p-6 rounded-full shadow-lg mb-4">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h1 className="text-3xl font-bold text-blue-900">Loading Product Details...</h1>
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
                href="/products" 
                className="bg-yellow-600 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-yellow-700 transition-colors"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </Container>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 py-10">
        <Container>
          <div className="text-center py-20">
            <div className="inline-block bg-red-500 p-6 rounded-full shadow-lg mb-4">
              <div className="w-12 h-12 text-white flex items-center justify-center">❓</div>
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-4">Product Not Found</h1>
            <p className="text-xl text-blue-800 mb-6">We couldn&apos;t find the product you&apos;re looking for.</p>
            <Link 
              href="/products" 
              className="bg-blue-900 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-blue-800 transition-colors"
            >
              Back to Products
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
            href="/products" 
            className="inline-flex items-center text-blue-900 hover:text-blue-700 transition-colors font-bold"
          >
            ← Back to Products
          </Link>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-xl border-2 border-blue-900">
          {/* Product Header */}
          <div className="p-4 bg-green-400 border-b-2 border-blue-900">
            <h1 className="text-3xl font-bold text-blue-900">{product.name}</h1>
            <div className="flex items-center mt-2">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {product.category}
              </span>
              <div className="ml-4 flex items-center">
                <span className="text-yellow-500 mr-1">★</span>
                <span className="text-blue-800">{product.rating}/5</span>
              </div>
            </div>
          </div>

          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2 p-4">
              <div className="relative h-64 md:h-80 w-full mb-4 border-2 border-gray-200 rounded-lg overflow-hidden">
                <Image 
                  src={product.image || '/homer-toy.jpg'} 
                  alt={product.name} 
                  fill
                  className="object-contain"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`
                  }}
                />
              </div>
    
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-3xl font-bold text-green-700">${product.price}</span>
                <span className={`text-sm px-3 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              {product.details && (
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-blue-900 mb-2">Details</h2>
                  <p className="text-gray-700">{product.details}</p>
                </div>
              )}
              
              <button 
                className={`w-full py-3 rounded-full text-white font-bold mb-4 ${product.inStock ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!product.inStock}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="font-bold text-blue-900 mb-2">Shipping</h3>
                <p className="text-gray-700 text-sm">Free shipping on orders over $35</p>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {product.relatedProducts && product.relatedProducts.length > 0 && (
            <div className="p-6 border-t-2 border-blue-900">
              <h2 className="text-2xl font-bold text-blue-900 mb-4">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.relatedProducts.map((relatedProduct, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center"
                  >
                    <div className="w-16 h-16 relative flex-shrink-0 mr-4">
                      <div className="absolute inset-0 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-2xl">
                        🛒
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900">{relatedProduct}</h3>
                      <p className="text-sm text-gray-600">Check it out!</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  )
}
