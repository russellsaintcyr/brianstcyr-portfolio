import Header from '@/components/Header';
import PortfolioGrid from '@/components/PortfolioGrid';
import { getPortfolioData } from '@/services/PortfolioService';

// HomePage Component - Main portfolio landing page
// Route: /

export default async function HomePage() {
  const portfolioData = await getPortfolioData();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PortfolioGrid portfolioData={portfolioData} />
    </div>
  );
}
