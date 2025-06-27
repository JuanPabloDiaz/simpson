'use client';

import { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocs() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    // Fetch the OpenAPI spec from our API endpoint
    fetch('/api/docs')
      .then(response => response.json())
      .then(data => setSpec(data))
      .catch(err => console.error('Failed to load API docs:', err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">The Simpsons API Documentation</h1>
      {spec ? (
        <SwaggerUI spec={spec} />
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading API documentation...</p>
        </div>
      )}
    </div>
  );
}
