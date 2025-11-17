import Link from 'next/link';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolio';
import Header from '@/components/Header';
import PortfolioGrid from '@/components/PortfolioGrid';

// HomePage Component - Main portfolio landing page
// Route: /

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <PortfolioGrid />
    </div>
  );
}
