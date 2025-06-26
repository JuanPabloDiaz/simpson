import { endpoint } from '@/utils/endpoint'

export async function getAllCharacters() {
  // Add cache-busting timestamp to prevent caching
  const timestamp = new Date().getTime()
  const data = await fetch(`${endpoint}/characters?t=${timestamp}`, { cache: 'no-store' })

  if (!data.ok) {
    throw new Error('Failed to fetch data')
  }

  return data.json()
}

export async function getCharacterBySlug(slug) {
  // Add cache-busting timestamp to prevent caching
  const timestamp = new Date().getTime()
  const data = await fetch(`${endpoint}/characters/${slug}?t=${timestamp}`, { cache: 'no-store' })

  if (!data.ok) {
    throw new Error('Failed to fetch data')
  }

  return data.json()
}
