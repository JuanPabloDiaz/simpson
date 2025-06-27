/**
 * Simpsons-themed homepage with links to main sections
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components'

export default function HomePage() {
  const sections = [
    {
      title: 'Episodes',
      description: 'Browse all episodes from the series',
      link: '/episodes',
      color: 'bg-blue-400',
      icon: 'mdi:television-classic'
    },
    {
      title: 'Products',
      description: 'Shop Simpsons merchandise',
      link: '/products',
      color: 'bg-green-400',
      icon: 'mdi:cart'
    },
    {
      title: 'Characters',
      description: 'Meet your favorite Springfield residents (Coming soon)',
      link: '/characters',
      color: 'bg-yellow-400',
      icon: 'mdi:account-group'
    },
    {
      title: 'API Docs',
      description: 'Developer documentation',
      link: '/api-docs',
      color: 'bg-purple-400',
      icon: 'mdi:book-open-page-variant'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-yellow-300 to-yellow-500 py-10">
      <Container>
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image src="/logo.png" alt="The Simpsons" width={200} height={120} priority />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">
            Welcome to Springfield!
          </h1>
          <p className="text-xl text-blue-800 max-w-2xl mx-auto">
            Your ultimate guide to The Simpsons universe. Explore characters, episodes, and more!  
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sections.map((section) => (
            <Link 
              href={section.link} 
              key={section.title}
              className={`${section.color} rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105 flex items-center border-4 border-white`}
            >
              <div className="mr-4">
                <iconify-icon icon={section.icon} width="48" height="48"></iconify-icon>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900">{section.title}</h2>
                <p className="text-blue-800">{section.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
