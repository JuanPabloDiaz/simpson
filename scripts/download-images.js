const fs = require('fs')
const path = require('path')
const https = require('https')

// Main Simpsons characters
const characters = [
  'homer-simpson',
  'marge-simpson',
  'bart-simpson',
  'lisa-simpson',
  'maggie-simpson',
  'ned-flanders',
  'moe-szyslak',
  'krusty-the-clown',
  'montgomery-burns',
  'waylon-smithers',
]

// Create directory if it doesn't exist
const imageDir = path.join(__dirname, '../public/images/simpsons')
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true })
}

// Use placeholder images for now
characters.forEach(character => {
  // Main avatar
  const avatarFile = path.join(imageDir, `${character}.png`)
  if (!fs.existsSync(avatarFile)) {
    const placeholderUrl = `https://via.placeholder.com/500x500.png?text=${character.replace(/-/g, '+')}`
    https.get(placeholderUrl, response => {
      const fileStream = fs.createWriteStream(avatarFile)
      response.pipe(fileStream)
      fileStream.on('finish', () => {
        console.log(`Downloaded ${character}.png`)
      })
    })
  }

  // Additional images
  for (let i = 1; i <= 2; i++) {
    const imageFile = path.join(imageDir, `${character}-${i}.jpg`)
    if (!fs.existsSync(imageFile)) {
      const placeholderUrl = `https://via.placeholder.com/760x435.jpg?text=${character.replace(/-/g, '+')}+${i}`
      https.get(placeholderUrl, response => {
        const fileStream = fs.createWriteStream(imageFile)
        response.pipe(fileStream)
        fileStream.on('finish', () => {
          console.log(`Downloaded ${character}-${i}.jpg`)
        })
      })
    }
  }
})

console.log(
  'Image download script started. Please wait for completion messages...',
)
