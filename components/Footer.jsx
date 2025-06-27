'use client';

import Link from 'next/link';
import { Container } from '.';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/1diazdev/',
      icon: 'mdi:linkedin'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/JuanPabloDiaz',
      icon: 'mdi:github'
    },
    {
      name: 'Portfolio',
      url: 'https://jpdiaz.dev',
      icon: 'mdi:web'
    }
  ];

  return (
    <footer className="bg-blue-900 text-white py-8 mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-yellow-400 font-bold text-lg">The Full Stack Simpsons</p>
            <p className="text-sm text-gray-300">© {currentYear} Juan Diaz</p>
          </div>
          
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition-colors flex items-center"
                aria-label={link.name}
              >
                <iconify-icon icon={link.icon} width="24" height="24"></iconify-icon>
                <span className="ml-2 hidden sm:inline">{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
