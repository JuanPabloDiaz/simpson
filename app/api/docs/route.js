import { getApiDocs } from '@/lib/swagger'
import { NextResponse } from 'next/server'
import { setCorsHeaders, handleCorsOptions } from '@/lib/cors'

export async function OPTIONS() {
  return handleCorsOptions()
}

export async function GET() {
  const spec = getApiDocs()
  const response = NextResponse.json(spec)

  // Add CORS headers
  return setCorsHeaders(response)
}
