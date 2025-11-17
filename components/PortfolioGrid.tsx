import Link from 'next/link';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolio';

export default function PortfolioGrid() {
  return (
    <main className="max-w-7xl mx-auto py-4">
      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-0">
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
  );
}