import Link from 'next/link';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolio';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-2 py-4 flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
            BRIAN ST. CYR
          </h1>
          
          {/* Menu Icon */}
          <div className="relative group">
            <button className="p-2 text-gray-600 hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link href="/contact" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                Contact
              </Link>
              <a 
                href="https://2025stcyrfundraiser.myportfolio.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
              >
                Fundraiser
              </a>
              <Link href="/biography" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                Biography
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
    </div>
  );
}
