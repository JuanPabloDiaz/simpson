/**
 * Custom 404 Not Found page for The Simpsons app
 * This page is automatically shown when a route is not found
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Header */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-yellow-400 mb-4 drop-shadow-lg">
            404
          </h1>
          <h2 className="text-3xl font-bold text-white mb-2">
            D&apos;oh! Page Not Found
          </h2>
          <p className="text-xl text-blue-100">
            Looks like you&apos;ve wandered into the wrong Springfield!
          </p>
        </div>

        {/* Homer's Famous Quote */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 border border-white/20">
          <blockquote className="text-2xl italic text-yellow-300 mb-4">
            &ldquo;This is the worst day of my life.&rdquo;
          </blockquote>
          <cite className="text-blue-200">- Homer Simpson</cite>
        </div>

        {/* Character Avatar Placeholder */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-yellow-400 rounded-full flex items-center justify-center text-6xl shadow-lg">
            🍩
          </div>
        </div>

        {/* Navigation Options */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
            >
              🏠 Back to Home
            </Link>
            <Link
              href="/test"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
            >
              📝 Test Page
            </Link>
          </div>

          <button
            onClick={() => window.history.back()}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            ← Go Back
          </button>
        </div>

        {/* Fun Facts */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">
            Did you know?
          </h3>
          <p className="text-blue-100 text-sm">
            The Simpsons has been running for over 30 years and is the
            longest-running American sitcom and animated series!
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-blue-200 text-sm">
          <p>
            Lost in Springfield? Don&apos;t worry, even Homer gets lost
            sometimes!
          </p>
        </div>
      </div>
    </div>
  )
}
