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
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        router.push(`/portfolio/${previousSlug}`, { scroll: false });
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        router.push(`/portfolio/${nextSlug}`, { scroll: false });
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.changedTouches[0].screenX;
      touchStartY = event.changedTouches[0].screenY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      touchEndX = event.changedTouches[0].screenX;
      touchEndY = event.changedTouches[0].screenY;
      
      // Calculate the difference
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      
      // Check if it's a horizontal swipe (more horizontal than vertical movement)
      const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);
      const minSwipeDistance = 50; // Minimum distance for a swipe
      
      if (isHorizontalSwipe && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          // Swipe right - go to previous
          event.preventDefault();
          router.push(`/portfolio/${previousSlug}`, { scroll: false });
        } else {
          // Swipe left - go to next
          event.preventDefault();
          router.push(`/portfolio/${nextSlug}`, { scroll: false });
        }
      }
    };

    // Add event listeners
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [previousSlug, nextSlug, router]);

  return null; // This component doesn't render anything visible
}