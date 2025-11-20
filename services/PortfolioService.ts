import client from './ContentfulService';
import { PortfolioItem, PortfolioData } from '@/types/portfolio';
// import { portfolioData as staticPortfolioData } from '@/data/PortfolioData';

// Check if Contentful is properly configured
const isContentfulConfigured = () => {
  return process.env.CONTENTFUL_SPACE_ID && 
         process.env.CONTENTFUL_ACCESS_TOKEN && 
         process.env.CONTENTFUL_SPACE_ID !== 'fallback-space';
};

// Transform Contentful entry to PortfolioItem
function transformContentfulEntry(entry: any): PortfolioItem {
  const fields = entry.fields;
  const sys = entry.sys;
  
  return {
    id: sys.id,
    title: fields.displayTitle || '',
    slug: fields.slug || sys.id.toLowerCase(),
    imageUrl: fields.photo?.fields?.file?.url 
      ? `https:${fields.photo.fields.file.url}` 
      : '',
    description: fields.description || '',
    year: fields.year ? fields.year.toString() : '',
    forSale: fields.forSale || false,
    price: fields.price || 0,
  };
}

// Fetch all portfolio items from Contentful
export async function getPortfolioData(): Promise<PortfolioData> {
  // Use static data if Contentful is not configured
  if (!isContentfulConfigured()) {
    console.log('📁 Using static portfolio data (Contentful not configured)');
    // return staticPortfolioData;
    return { items: [] };
  }

  try {
    const response = await client.getEntries({
      content_type: 'art',
      limit: 100, // Adjust if you have more than 100 items
      order: ['sys.createdAt'], // You can change the ordering
    });
    const items: PortfolioItem[] = response.items.map(transformContentfulEntry);

    return {
      items,
    };
  } catch (error) {
    console.error('Error fetching portfolio data from Contentful:', error);
    console.log('📁 No static portfolio data');
    // return staticPortfolioData;
    return { items: [] };
  }
}

// Fetch a single portfolio item by ID
export async function getPortfolioItem(id: string): Promise<PortfolioItem | null> {
  try {
    const entry = await client.getEntry(id);
    return transformContentfulEntry(entry);
  } catch (error) {
    console.error(`Error fetching portfolio item ${id} from Contentful:`, error);
    return null;
  }
}

// Fetch portfolio item by slug (for dynamic routes)
export async function getPortfolioItemBySlug(slug: string): Promise<PortfolioItem | null> {
  // Use static data if Contentful is not configured
  if (!isContentfulConfigured()) {
    console.log(`📁 Using static data to find item with slug: ${slug}`);
    // return staticPortfolioData.items.find(item => item.slug === slug) || null;
    return null;
  }

  try {
    const response = await client.getEntries({
      content_type: 'art',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      // Fallback to static data if not found in Contentful
      console.log(`📁 Item not found in Contentful, checking static data for slug: ${slug}`);
      // return staticPortfolioData.items.find(item => item.slug === slug) || null;
      return null;
    }

    return transformContentfulEntry(response.items[0]);
  } catch (error) {
    console.error(`Error fetching portfolio item with slug ${slug} from Contentful:`, error);
    console.log(`📁 Falling back to static data for slug: ${slug}`);
    // return staticPortfolioData.items.find(item => item.slug === slug) || null;
    return null;
  }
}
