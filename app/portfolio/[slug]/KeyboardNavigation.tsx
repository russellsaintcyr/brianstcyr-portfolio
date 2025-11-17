'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface KeyboardNavigationProps {
  previousSlug: string;
  nextSlug: string;
}

export default function KeyboardNavigation({ previousSlug, nextSlug }: KeyboardNavigationProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        router.push(`/portfolio/${previousSlug}`, { scroll: false });
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        router.push(`/portfolio/${nextSlug}`, { scroll: false });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previousSlug, nextSlug, router]);

  return null; // This component doesn't render anything visible
}