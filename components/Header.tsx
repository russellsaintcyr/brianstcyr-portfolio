'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
}

export default function Header({ showBackButton = false, title }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-2 py-4 flex justify-between items-center">
        {showBackButton ? (
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <span className="mr-2">←</span>
            Back to Portfolio
          </Link>
        ) : (
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight">
            {title || 'BRIAN ST. CYR'}
          </h1>
        )}
        
        {/* Menu Icon */}
        <div className="relative group">
          <button className="p-2 text-gray-600 hover:text-black transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <Link 
              href="/contact" 
              className={`block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 ${pathname === '/contact' ? 'bg-gray-50' : ''}`}
            >
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
            <Link 
              href="/biography" 
              className={`block px-4 py-3 text-gray-700 hover:bg-gray-50 ${pathname === '/biography' ? 'bg-gray-50' : ''}`}
            >
              Biography
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}