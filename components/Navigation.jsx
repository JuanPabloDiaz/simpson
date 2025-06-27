/**
Renders a navigation component with a sticky header, containing a logo.
@component
@returns {JSX.Element} The rendered navigation component.
*/

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '.';
import Image from 'next/image';
import { FaUsers, FaTv, FaShoppingCart, FaBook } from 'react-icons/fa';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Characters', href: '/characters', icon: <FaUsers size={20} /> },
    { name: 'Episodes', href: '/episodes', icon: <FaTv size={20} /> },
    { name: 'Products', href: '/products', icon: <FaShoppingCart size={20} /> },
    { name: 'API Docs', href: '/api-docs', icon: <FaBook size={20} /> }
  ];

  return (
    <div className="sticky top-0 bg-blue-900 border-b-4 border-yellow-400 z-50 shadow-lg">
      <Container className="flex justify-between items-center py-3" as="nav">
        <Link href="/" className="flex-shrink-0">
          <div className="flex items-center">
            <Image 
              src="/logo.png" 
              alt="The Simpsons" 
              width={60} 
              height={40} 
              className="mr-2"
            />          </div>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-yellow-400 p-2 rounded-md focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex space-x-4 items-center">
          {navItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href}
              className="text-white hover:text-yellow-400 px-3 py-2 rounded-md font-medium transition-colors flex items-center"
            >
              <span className="mr-1">
                {item.icon}
              </span>
              {item.name}
            </Link>
          ))}
        </div>
      </Container>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 border-t border-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:bg-blue-700 hover:text-yellow-400 block px-3 py-2 rounded-md text-base font-medium flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="mr-3">
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
