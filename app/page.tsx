import Link from 'next/link';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolio';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
            BRIAN ST. CYR
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Special Link */}
        <div className="mb-12">
          <a 
            href="https://2025stcyrfundraiser.myportfolio.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-lg font-medium text-blue-600 hover:text-blue-800 underline"
          >
            FUNDRAISER SITE
          </a>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {portfolioData.items.map((item) => (
            <Link 
              key={item.id} 
              href={`/portfolio/${item.slug}`}
              className="group block"
            >
              <div className="aspect-[10/13] relative overflow-hidden bg-gray-100">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start">
                  <div className="p-4 text-white w-full">
                    <h2 className="text-lg font-bold tracking-tight mb-1">
                      {item.title}
                    </h2>
                    {item.description && (
                      <p className="text-sm text-white/90">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <nav className="flex gap-6">
            <Link 
              href="/contact" 
              className="text-black hover:text-gray-600 font-medium"
            >
              CONTACT
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
