const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

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
  'waylon-smithers'
];

// Create directory if it doesn't exist
const imageDir = path.join(__dirname, '../public/images/simpsons');
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

// Generate a random pastel color
function getRandomPastelColor() {
  return `hsl(${Math.random() * 360}, 70%, 80%)`;
}

// Create placeholder images
characters.forEach(character => {
  // Avatar image (500x500)
  const avatarCanvas = createCanvas(500, 500);
  const avatarCtx = avatarCanvas.getContext('2d');
  
  // Fill background with a pastel color
  avatarCtx.fillStyle = getRandomPastelColor();
  avatarCtx.fillRect(0, 0, 500, 500);
  
  // Add text
  avatarCtx.fillStyle = '#000000';
  avatarCtx.font = 'bold 40px Arial';
  avatarCtx.textAlign = 'center';
  avatarCtx.textBaseline = 'middle';
  avatarCtx.fillText(character.replace(/-/g, ' '), 250, 250);
  
  // Save the image
  const avatarBuffer = avatarCanvas.toBuffer('image/png');
  fs.writeFileSync(path.join(imageDir, `${character}.png`), avatarBuffer);
  console.log(`Created ${character}.png`);
  
  // Additional detail images (760x435)
  for (let i = 1; i <= 2; i++) {
    const detailCanvas = createCanvas(760, 435);
    const detailCtx = detailCanvas.getContext('2d');
    
    // Fill background with a pastel color
    detailCtx.fillStyle = getRandomPastelColor();
    detailCtx.fillRect(0, 0, 760, 435);
    
    // Add text
    detailCtx.fillStyle = '#000000';
    detailCtx.font = 'bold 40px Arial';
    detailCtx.textAlign = 'center';
    detailCtx.textBaseline = 'middle';
    detailCtx.fillText(`${character.replace(/-/g, ' ')} - ${i}`, 380, 217);
    
    // Save the image
    const detailBuffer = detailCanvas.toBuffer('image/jpeg');
    fs.writeFileSync(path.join(imageDir, `${character}-${i}.jpg`), detailBuffer);
    console.log(`Created ${character}-${i}.jpg`);
  }
});

console.log('All placeholder images created successfully!');
