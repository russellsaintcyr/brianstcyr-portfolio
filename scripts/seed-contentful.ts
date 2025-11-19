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
import { createReadStream } from 'fs';

// --- CONFIGURATION ---
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const MANAGEMENT_TOKEN = process.env.CONTENTFUL_MANAGEMENT_TOKEN!;
const ENVIRONMENT_ID = process.env.CONTENTFUL_ENVIRONMENT_ID! || 'master';
const CONTENT_TYPE_ID = process.env.CONTENTFUL_CONTENT_TYPE_ID!;
const LOCALE = 'en-US';

console.log('Using Contentful Space ID:', SPACE_ID);
console.log('Using Contentful Management Token:', MANAGEMENT_TOKEN ? '[SET]' : '[NOT SET]');

// Initialize client using the imported function
const client = createClient({ accessToken: MANAGEMENT_TOKEN });
 
async function runSeed() {
  console.log(`Starting import for ${portfolioData.items.length} items...`);
  try {
    const space = await client.getSpace(SPACE_ID);
    const env = await space.getEnvironment(ENVIRONMENT_ID);
 
    for (const item of portfolioData.items) {
      try {
        console.log(`\nProcessing: ${item.title} (ID: ${item.id})`);
        // --- STEP 1: HANDLE ASSET (IMAGE) ---
        const assetId = `image-${item.id}`; 
        let asset;
        let assetLink = null;
 
        if (item.imageUrl) {
            try {
                // Try to find existing asset
                asset = await env.getAsset(assetId);
                console.log(`  -> Image asset found (${assetId}), skipping upload.`);
            } catch (e) {
                // Create if not found
                const assetData = {
                    fields: {
                        title: { [LOCALE]: `${item.title} Image` },
                        file: {
                            [LOCALE]: {
                                contentType: 'image/jpeg',
                                fileName: `${item.slug}.jpg`,
                                file: createReadStream(resolve(__dirname, `../public/images/${item.slug}.jpg`))
                            }
                        }
                    }
                }
                console.log(`  -> Uploading new image...`, assetData);
                asset = await env.createAssetWithId(assetId, assetData);
            }
 
            // Always process and publish the asset to be safe
            if (!asset.sys.publishedVersion || (asset.sys.version > asset.sys.publishedVersion + 1)) {
                 console.log(`  -> Processing & Publishing Asset...`);
                 asset = await asset.processForAllLocales();
                 await waitForAssetProcessing(asset);
                 asset = await asset.publish();
            }
            // Create the Link Object for the Entry
            assetLink = {
                sys: { type: 'Link', linkType: 'Asset', id: assetId }
            };
        }
 
 
        // --- STEP 2: HANDLE ENTRY (PRODUCT) ---
        let entry;
        const entryFields = {
            displayTitle: { [LOCALE]: item.title },
            slug: { [LOCALE]: item.slug },
            description: { [LOCALE]: item.description ? item.description : '' },
            year: { [LOCALE]: item.year ? parseInt(item.year.toString(), 10) : 0 },
            forSale: { [LOCALE]: item.forSale ? item.forSale : false },
            price: { [LOCALE]: item.price ? parseFloat(item.price.toString()) : 0 }
        };
 
        try {
            // Try to find existing entry
            entry = await env.getEntry(item.id);
            console.log(`  -> Entry found. Updating fields...`);
            // Update fields
            entry.fields = { ...entry.fields, ...entryFields };
            entry = await entry.update();
 
        } catch (e: any) {
             if (e.name === 'NotFound') {
                console.log(`  -> Entry not found. Creating...`);
                entry = await env.createEntryWithId(CONTENT_TYPE_ID, item.id, {
                    fields: entryFields
                });
             } else {
                 throw e;
             }
        }
 
        // --- STEP 3: PUBLISH ENTRY ---
        if (entry.isDraft() || entry.isUpdated()) {
            await entry.publish();
            console.log(`  -> SUCCESS: Entry published.`);
        } else {
            console.log(`  -> SUCCESS: Entry already up to date.`);
        }
 
      } catch (itemError: any) {
        console.error(`  -> ERROR processing item ${item.id}:`, itemError.message);
      }
    }
 
    console.log('\n--- Import Complete ---');
 
  } catch (error) {
    console.error('Fatal Error:', error);
  }
}
 
// Helper function remains the same
async function waitForAssetProcessing(asset: any) {
    return new Promise(resolve => setTimeout(resolve, 2000));
}
 
runSeed();