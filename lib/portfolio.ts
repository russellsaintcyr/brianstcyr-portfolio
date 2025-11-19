import client from './contentful';
import { PortfolioItem, PortfolioData } from '@/types/portfolio';

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
  try {
    const response = await client.getEntries({
      content_type: 'art',
      limit: 100, // Adjust if you have more than 100 items
      order: 'sys.createdAt', // You can change the ordering
    });

    const items: PortfolioItem[] = response.items.map(transformContentfulEntry);

    return {
      items,
    };
  } catch (error) {
    console.error('Error fetching portfolio data from Contentful:', error);
    throw error;
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
  try {
    const response = await client.getEntries({
      content_type: 'art',
      'fields.slug': slug,
      limit: 1,
    });

    if (response.items.length === 0) {
      return null;
    }

    return transformContentfulEntry(response.items[0]);
  } catch (error) {
    console.error(`Error fetching portfolio item with slug ${slug} from Contentful:`, error);
    return null;
  }
}