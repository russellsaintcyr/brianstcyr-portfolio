// Script to download all portfolio images to public/images directory
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read and parse portfolio data from TypeScript file
function getPortfolioData() {
  const portfolioPath = resolve(__dirname, '../data/portfolio.ts');
  const content = readFileSync(portfolioPath, 'utf8');
  
  console.log('📖 Parsing portfolio data...');
  
  // Extract the items array using regex - look for the complete structure
  const itemsMatch = content.match(/items:\s*\[([\s\S]*?)\]\s*[,}]/);
  if (!itemsMatch) {
    console.log('❌ Could not find items array structure');
    throw new Error('Could not parse portfolio items from portfolio.ts');
  }
  
  const items = [];
  const itemsContent = itemsMatch[1];
  
  // Split by closing braces that end an item
  const rawItems = itemsContent.split('},');
  
  console.log(`🔍 Found ${rawItems.length} potential item blocks`);
  
  for (let i = 0; i < rawItems.length; i++) {
    let rawItem = rawItems[i];
    
    // Add back the closing brace if it's not the last item
    if (i < rawItems.length - 1) {
      rawItem += '}';
    }
    
    const titleMatch = rawItem.match(/title:\s*'([^']+)'/);
    const slugMatch = rawItem.match(/slug:\s*'([^']+)'/);
    const imageUrlMatch = rawItem.match(/imageUrl:\s*'([^']+)'/);
    const idMatch = rawItem.match(/id:\s*'([^']+)'/);
    
    if (titleMatch && slugMatch && imageUrlMatch && idMatch) {
      items.push({
        id: idMatch[1],
        title: titleMatch[1],
        slug: slugMatch[1],
        imageUrl: imageUrlMatch[1]
      });
      console.log(`✅ Parsed: ${titleMatch[1]} (${slugMatch[1]})`);
    } else {
      console.log(`⚠️  Skipped block ${i + 1} - missing required fields`);
    }
  }
  
  console.log(`📊 Successfully parsed ${items.length} portfolio items\n`);
  
  return { items };
}

// Create images directory
const imagesDir = resolve(__dirname, '../public/images');
try {
  mkdirSync(imagesDir, { recursive: true });
  console.log('✅ Created public/images directory');
} catch (error) {
  console.log('📁 public/images directory already exists');
}

async function downloadImage(url, filename) {
  try {
    console.log(`📥 Downloading: ${filename}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const buffer = await response.arrayBuffer();
    const filePath = resolve(imagesDir, filename);
    
    writeFileSync(filePath, Buffer.from(buffer));
    console.log(`✅ Downloaded: ${filename}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Failed to download ${filename}:`, error.message);
    return false;
  }
}

async function downloadAllImages() {
  const portfolioData = getPortfolioData();
  console.log(`🚀 Starting download of ${portfolioData.items.length} images...\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const item of portfolioData.items) {
    if (item.imageUrl) {
      // Extract file extension from URL or default to .jpg
      const urlParts = item.imageUrl.split('?')[0]; // Remove query parameters
      const extension = urlParts.includes('.jpg') ? '.jpg' : 
                       urlParts.includes('.jpeg') ? '.jpeg' : 
                       urlParts.includes('.png') ? '.png' : '.jpg';
      
      const filename = `${item.slug}${extension}`;
      
      const success = await downloadImage(item.imageUrl, filename);
      
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
      
      // Small delay to be respectful to the server
      await new Promise(resolve => setTimeout(resolve, 500));
    } else {
      console.log(`⚠️  No imageUrl for item: ${item.title}`);
      failCount++;
    }
  }
  
  console.log(`\n📊 Download Summary:`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📁 Images saved to: public/images/`);
}

// Run the download
downloadAllImages().catch(console.error);