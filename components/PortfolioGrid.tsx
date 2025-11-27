'use client';

import Link from 'next/link';
import { PortfolioData } from '@/types/portfolio';
import LazyImage from './LazyImage';
import { useState, useEffect } from 'react';

interface PortfolioGridProps {
  portfolioData: PortfolioData;
  renderMode?: 'SSG' | 'SSR';
}


export default function PortfolioGrid({ portfolioData, renderMode }: PortfolioGridProps) {
  const [priorityCount, setPriorityCount] = useState(2); // Default for mobile

  useEffect(() => {
    if (portfolioData?.items?.length) {
      if (renderMode === 'SSG') {
        console.log(`Loaded ${portfolioData.items.length} images at build time (SSG, static export). Content updates require a new deploy.`);
      } else if (renderMode === 'SSR') {
        console.log(`Loaded ${portfolioData.items.length} images at request time (SSR, server-side render). Content updates are live.`);
      } else {
        console.log(`Loaded ${portfolioData.items.length} images.`);
      }
    }
  }, [portfolioData?.items?.length, renderMode]);

  useEffect(() => {
    const updatePriorityCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Small mobile: 1 column, load first 3 images
        setPriorityCount(3);
      } else if (width < 768) {
        // Large mobile: 2 columns, load first 4 images (2 rows)
        setPriorityCount(4);
      } else if (width < 1024) {
        // Tablet: 3 columns, load first 6 images (2 rows)
        setPriorityCount(6);
      } else if (width < 1280) {
        // Small desktop: 4 columns, load first 8 images (2 rows)
        setPriorityCount(8);
      } else {
        // Large desktop: 5 columns, load first 10 images (2 rows)
        setPriorityCount(10);
      }
    };

    // Set initial value
    updatePriorityCount();

    // Listen for resize events
    window.addEventListener('resize', updatePriorityCount);
    
    return () => {
      window.removeEventListener('resize', updatePriorityCount);
    };
  }, []);

  return (
    <main className="max-w-7xl mx-auto py-4">
      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0">
        {portfolioData.items.map((item, index) => (
          <Link 
            key={item.id} 
            href={`/portfolio/${item.slug}`}
            className="group block"
          >
            <div className="aspect-[10/13] relative overflow-hidden bg-gray-100">
              <LazyImage
                src={item.imageUrl}
                alt={item.title}
                fill={true}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                priority={index < priorityCount}
                placeholder={
                  <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  </div>
                }
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