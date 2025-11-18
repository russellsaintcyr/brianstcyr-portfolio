export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  description?: string;
  year?: string;
  medium?: string;
  forSale?: boolean;
  price?: number;
}

export interface PortfolioData {
  items: PortfolioItem[];
}