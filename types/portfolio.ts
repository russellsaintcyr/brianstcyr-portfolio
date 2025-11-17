export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  description?: string;
  year?: string;
  medium?: string;
}

export interface PortfolioData {
  items: PortfolioItem[];
}