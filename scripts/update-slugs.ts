import pkg from 'contentful-management';
const { createClient } = pkg;

// Load environment variables from .env.local
import dotenv from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env.local') });

// Import portfolio data directly from TypeScript file
import { portfolioData } from '../data/PortfolioData.js';

// --- CONFIGURATION ---
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID! || 'master';
const LOCALE = 'en-US';

console.log('Using Contentful Space ID:', SPACE_ID);
console.log('Using Contentful Management Token:', MANAGEMENT_TOKEN ? '[SET]' : '[NOT SET]');

// Initialize client using the imported function
const client = createClient({ accessToken: MANAGEMENT_TOKEN });
 
async function updateSlugs() {
  console.log(`Starting slug update for ${portfolioData.items.length} items...`);
  try {
    const space = await client.getSpace(SPACE_ID);
    const env = await space.getEnvironment(ENVIRONMENT_ID);
 
    for (const item of portfolioData.items) {
      try {
        console.log(`\nProcessing: ${item.title} (ID: ${item.id})`);
        
        // Try to get the existing entry
        const entry = await env.getEntry(item.id);
        console.log(`  -> Entry found. Current slug: ${entry.fields.slug?.[LOCALE] || 'NOT SET'}`);
        
        // Only update the slug field, preserve all other existing fields
        if (!entry.fields.slug || entry.fields.slug[LOCALE] !== item.slug) {
          entry.fields.slug = { [LOCALE]: item.slug };
          const updatedEntry = await entry.update();
          console.log(`  -> Slug updated to: ${item.slug}`);
          
          // Publish the entry
          await updatedEntry.publish();
          console.log(`  -> SUCCESS: Entry published with new slug.`);
        } else {
          console.log(`  -> Slug already correct, skipping.`);
        }
 
      } catch (itemError: any) {
        if (itemError.name === 'NotFound') {
          console.error(`  -> ERROR: Entry ${item.id} not found in Contentful`);
        } else {
          console.error(`  -> ERROR processing item ${item.id}:`, itemError.message);
        }
      }
    }
 
    console.log('\n--- Slug Update Complete ---');
 
  } catch (error) {
    console.error('Fatal Error:', error);
  }
}
 
updateSlugs();