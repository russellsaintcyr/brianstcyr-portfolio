'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
}

export default function Header({ showBackButton = false, title }: HeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
          <Link href="/">
            <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight hover:text-gray-700 transition-colors cursor-pointer">
              {title || 'BRIAN ST. CYR'}
            </h1>
          </Link>
        )}
        
        {/* Menu Icon */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-600 hover:text-black transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          <div className={`absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-lg transition-all duration-200 z-50 ${
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
            <Link 
              href="/contact" 
              className={`block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 ${pathname === '/contact' ? 'bg-gray-50' : ''}`}
            >
              Contact
            </Link>
            <Link 
              href="/biography" 
              className={`block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 ${pathname === '/biography' ? 'bg-gray-50' : ''}`}
            >
              Biography
            </Link>
            <Link 
              href="/exhibitions" 
              className={`block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 ${pathname === '/exhibitions' ? 'bg-gray-50' : ''}`}
            >
              Exhibitions
            </Link>
            <Link 
              href="/fundraiser" 
              className={`block px-4 py-3 text-gray-700 hover:bg-gray-50 ${pathname === '/fundraiser' ? 'bg-gray-50' : ''}`}
            >
              Fundraiser
            </Link>            
          </div>
        </div>
      </div>
    </header>
  );
}