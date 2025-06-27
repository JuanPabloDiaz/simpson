'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import { Container } from '@/components';
import Image from 'next/image';

export default function ApiDocs() {
  const [spec, setSpec] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the OpenAPI spec from our API endpoint
    fetch('/api/docs')
      .then(response => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then(data => setSpec(data))
      .catch(err => {
        console.error('Failed to load API docs:', err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <main className="min-h-screen py-10">
        <Container>
          <div className="text-center py-20">
            <div className="inline-block bg-red-500 p-6 rounded-full shadow-lg mb-4">
              <iconify-icon icon="mdi:alert-circle" width="48" height="48" style={{color: 'white'}}></iconify-icon>
            </div>
            <h1 className="text-3xl font-bold text-blue-900 mb-4">D&apos;oh! Something went wrong</h1>
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
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-500 py-10">
      <Container>
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image src="/logo.png" alt="The Simpsons" width={150} height={90} priority />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-2">The Simpsons API Documentation</h1>
            <p className="text-xl text-blue-800">
              Explore and test all the available API endpoints
            </p>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <iconify-icon icon="mdi:lightbulb" width="24" height="24" style={{color: '#b45309'}}></iconify-icon>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  This interactive documentation allows you to try out API calls directly from this page.
                  Click on any endpoint, then click the &quot;Try it out&quot; button to make a real API request.
                </p>
              </div>
            </div>
          </div>
          
          {spec ? (
            <div className="swagger-wrapper">
              <SwaggerUI spec={spec} />
            </div>
          ) : (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="inline-block mb-4">
                  <iconify-icon icon="mdi:loading" width="48" height="48" class="animate-spin"></iconify-icon>
                </div>
                <p className="text-xl text-blue-800">Loading API documentation...</p>
              </div>
            </div>
          )}
        </div>
      </Container>

      <style jsx global>{`
        .swagger-ui .topbar { display: none; }
        .swagger-ui .info { margin: 20px 0; }
        .swagger-ui .info .title { color: #1e3a8a !important; }
        .swagger-ui .opblock-tag { font-size: 20px; }
        .swagger-ui .opblock.opblock-get { background: rgba(97, 175, 254, 0.1); }
        .swagger-ui .btn.execute { background-color: #1e3a8a; }
        .swagger-ui .btn.execute:hover { background-color: #2563eb; }
      `}</style>
    </main>
  );
}
