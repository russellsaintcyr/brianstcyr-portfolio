import Header from '@/components/Header';
import PortfolioGrid from '@/components/PortfolioGrid';
import { getPortfolioData } from '@/services/PortfolioService';

// HomePage Component - Main portfolio landing page
// Route: /

export default async function HomePage() {
  const portfolioData = await getPortfolioData();

  // Determine render mode for logging
  // If running in static export (GH Pages), set SSG; otherwise SSR
  const isStaticExport = process.env.NEXT_PUBLIC_BASE_PATH || process.env.EXPORT_MODE || process.env.GITHUB_ACTIONS;
  const renderMode = isStaticExport ? 'SSG' : 'SSR';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PortfolioGrid portfolioData={portfolioData} renderMode={renderMode} />
    </div>
  );
}
