/**
 * Retrieves a Simpsons character and their associated quotes based on the provided slug.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.slug - The slug of the character.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the character and their quotes, or an error response.
 */

import characters from '@/data/characters.json'
import episodes from '@/data/episodes.json'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    // Find the character by normalized name converted to slug format
    const character = characters.find(
      item => item.normalized_name.toLowerCase().replace(/\s+/g, '-') === params.slug
    )
    
    if (!character) {
      return new NextResponse('not found', { status: 404 })
    }

    // Create a slug from the normalized name
    const slug = character.normalized_name.toLowerCase().replace(/\s+/g, '-')
    
    // Generate placeholder image URLs with the character name
    // Using placeholder.com for simple colored placeholders with text
    const backgroundColor = Math.floor(Math.random() * 16777215).toString(16) // Random color
    const avatarUrl = `https://via.placeholder.com/200x200/${backgroundColor}/FFFFFF?text=${encodeURIComponent(character.name)}`
    
    // Create different placeholder images for the detail view
    const image1 = `https://via.placeholder.com/400x300/${backgroundColor}/FFFFFF?text=${encodeURIComponent(character.name)}+Scene+1`
    const image2 = `https://via.placeholder.com/400x300/${(parseInt(backgroundColor, 16) + 1000).toString(16)}/FFFFFF?text=${encodeURIComponent(character.name)}+Scene+2`
    
    // Create a more detailed character object with additional fields
    const enhancedCharacter = {
      id: character.id,
      name: character.name,
      slug: slug,
      description: `${character.name} is a character from The Simpsons.`,
      gender: character.gender || 'unknown',
      avatar: avatarUrl,
      images: [image1, image2],
      skills: ['Humor', 'Resilience', 'Creativity'],
      occupations: ['Springfield Resident']
    }

    // Generate some quotes based on the character's name
    // Since we don't have actual Simpsons quotes data, we'll create generic ones
    const character_quotes = [
      { quote: `Hi, I'm ${character.name}!` },
      { quote: `Welcome to Springfield!` },
      { quote: `That's just the way things are in Springfield.` }
    ]

    // For main characters, add specific quotes
    if (character.normalized_name === 'Homer Simpson') {
      character_quotes[0].quote = "D'oh!"
      character_quotes[1].quote = "Mmm... donuts."
      character_quotes[2].quote = "Why you little...!"
      enhancedCharacter.occupations = ['Safety Inspector at Springfield Nuclear Power Plant', 'Former Monorail Conductor']
      enhancedCharacter.skills = ['Eating', 'Sleeping', 'Bowling', 'Nuclear Safety (debatable)']
    } else if (character.normalized_name === 'Bart Simpson') {
      character_quotes[0].quote = "Eat my shorts!"
      character_quotes[1].quote = "Don't have a cow, man!"
      character_quotes[2].quote = "I didn't do it!"
      enhancedCharacter.occupations = ['Student at Springfield Elementary', 'Prankster']
      enhancedCharacter.skills = ['Skateboarding', 'Pranking', 'Slingshot Accuracy']
    } else if (character.normalized_name === 'Lisa Simpson') {
      character_quotes[0].quote = "If anyone wants me, I'll be in my room."
      character_quotes[1].quote = "I'm going to become a vegetarian."
      character_quotes[2].quote = "Trust in yourself and you can achieve anything."
      enhancedCharacter.occupations = ['Student at Springfield Elementary', 'Activist']
      enhancedCharacter.skills = ['Saxophone', 'Intelligence', 'Environmental Activism']
    } else if (character.normalized_name === 'Marge Simpson') {
      character_quotes[0].quote = "Hmm..."
      character_quotes[1].quote = "Homer!"
      character_quotes[2].quote = "I don't think that's a very good idea."
      enhancedCharacter.occupations = ['Homemaker', 'Former Police Officer']
      enhancedCharacter.skills = ['Cooking', 'Painting', 'Patience', 'Nurturing']
    }

    // Add cache control headers to prevent caching
    const response = NextResponse.json({
      character: enhancedCharacter,
      character_quotes
    })
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
