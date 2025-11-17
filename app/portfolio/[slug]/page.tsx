import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { portfolioData } from '@/data/portfolio';

interface PortfolioPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioData.items.map((item) => ({
    slug: item.slug,
  }));
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { slug } = await params;
  const item = portfolioData.items.find((item) => item.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Navigation */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <span className="mr-2">←</span>
            Back to Portfolio
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
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
        </div>

        {/* Artwork Image */}
        <div className="relative aspect-[4/3] w-full max-w-3xl mx-auto bg-gray-100">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
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

      {/* Navigation to Other Works */}
      <section className="border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-black mb-8">Other Works</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {portfolioData.items
              .filter((otherItem) => otherItem.slug !== slug)
              .slice(0, 4)
              .map((otherItem) => (
                <Link 
                  key={otherItem.id}
                  href={`/portfolio/${otherItem.slug}`}
                  className="group block"
                >
                  <div className="aspect-square relative overflow-hidden bg-gray-100 mb-2">
                    <Image
                      src={otherItem.imageUrl}
                      alt={otherItem.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-black group-hover:text-gray-600 transition-colors">
                    {otherItem.title}
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}