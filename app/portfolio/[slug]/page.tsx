import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPortfolioData, getPortfolioItemBySlug } from '@/services/portfolioService';
import KeyboardNavigation from './KeyboardNavigation';
import Header from '@/components/Header';
import PurchaseButton from '@/components/PurchaseButton';

interface PortfolioPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const portfolioData = await getPortfolioData();
  return portfolioData.items.map((item) => ({
    slug: item.slug,
  }));
}

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// PortfolioItemPage Component - Individual artwork detail page
// Route: /portfolio/[slug]

export default async function PortfolioItemPage({ params }: PortfolioPageProps) {
  const { slug } = await params;
  const [item, portfolioData] = await Promise.all([
    getPortfolioItemBySlug(slug),
    getPortfolioData()
  ]);

  if (!item) {
    notFound();
  }

  // Get 4 random items excluding the current one
  const otherItems = portfolioData.items.filter((otherItem) => otherItem.slug !== slug);
  const randomOtherItems = getRandomItems(otherItems, 4);

  // Get current item index for navigation
  const currentIndex = portfolioData.items.findIndex((portfolioItem) => portfolioItem.slug === slug);
  const previousItem = currentIndex > 0 ? portfolioData.items[currentIndex - 1] : portfolioData.items[portfolioData.items.length - 1];
  const nextItem = currentIndex < portfolioData.items.length - 1 ? portfolioData.items[currentIndex + 1] : portfolioData.items[0];

  return (
    <div className="min-h-screen bg-white">
      <KeyboardNavigation 
        previousSlug={previousItem.slug} 
        nextSlug={nextItem.slug} 
      />
      <Header showBackButton={true} />

      {/* Main Content */}
      <main className="mx-auto px-4 py-1 pb-10">
        <div className="text-center mb-1">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-4">
            {item.title}
          </h1>
          {item.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {item.description}
            </p>
          )}
          {item.year && (
            <p className="text-gray-500 mt-2">{item.year}</p>
          )}
          {item.forSale && (
            <div className="mt-6">
              <PurchaseButton itemTitle={item.title} price={item.price} />
            </div>
          )}
        </div>

        {/* Navigation Arrows - Above Image */}
        <div className="flex justify-between items-center mb-4 px-4">
          <Link
            href={`/portfolio/${previousItem.slug}`}
            className="flex items-center text-gray-600 hover:text-black transition-colors group"
            aria-label={`Previous: ${previousItem.title}`}
          >
            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Previous</span>
          </Link>
          
          <Link
            href={`/portfolio/${nextItem.slug}`}
            className="flex items-center text-gray-600 hover:text-black transition-colors group"
            aria-label={`Next: ${nextItem.title}`}
          >
            <span className="text-sm font-medium">Next</span>
            <svg className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Artwork Image */}
        <div className="w-full flex justify-center">
          <Image
            src={item.imageUrl}
            alt={item.title}
            width={0}
            height={0}
            className="max-w-[95vw] h-auto"
            sizes="95vw"
            style={{ width: 'auto', height: 'auto', maxWidth: '95vw' }}
            priority
          />
        </div>

        {/* Additional Details */}
        {item.medium && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              <span className="font-medium">Medium:</span> {item.medium}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}