'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const timestamp = Date.now()
        const response = await fetch(`/api/products?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
          },
        })

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        setProducts(data.products || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 flex items-center justify-center">
        <Container>
          <div className="text-center">
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-900 border-solid"></div>
                <div className="absolute inset-0 rounded-full border-2 border-blue-900 opacity-30"></div>
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-900">
                  Loading Simpsons Products...
                </h1>
                <p className="text-xl text-blue-800 animate-pulse">
                  Getting ready to meet Springfield's finest!
                </p>
              </div>
            </div>
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
              <iconify-icon
                icon="mdi:alert-circle"
                width="48"
                height="48"
                style={{ color: 'white' }}
              ></iconify-icon>
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-4">
              D&apos;oh! Something went wrong
            </h1>
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
    <main className="min-h-screen py-10">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">
            Kwik-E-Mart Products
          </h1>
          <p className="text-xl text-blue-800 max-w-2xl mx-auto">
            Shop our selection of {products.length} Simpsons merchandise items!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div
              key={product.id || product.name}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-900"
            >
              <div className="p-3 bg-green-400 text-center font-bold border-b-2 border-blue-900">
                <h2 className="text-lg text-blue-900 truncate">
                  {product.name}
                </h2>
              </div>

              <div className="relative h-48 w-full">
                <Image
                  src={product.image || '/homer-toy.jpg'}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-4">
                <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                  {product.description || 'No description available'}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-green-700">
                    ${(Math.random() * 20 + 5).toFixed(2)}
                  </span>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    In Stock
                  </span>
                </div>
                <Link
                  href={`/products/${product.slug}`}
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
