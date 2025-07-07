/**
 * Utility function to add CORS headers to API responses
 * @param {Response} response - The Next.js response object
 * @returns {Response} - The response with CORS headers
 */
export function setCorsHeaders(response) {
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  )
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  )

  return response
}

/**
 * Handle OPTIONS requests for CORS preflight
 * @returns {Response} - A response with CORS headers
 */
export function handleCorsOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400', // 24 hours
    },
  })
}
