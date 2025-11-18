'use client';

import { useState, useRef, useEffect } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  placeholder?: React.ReactNode;
}

// Generate responsive image URLs based on original URL
const generateResponsiveUrls = (originalUrl: string) => {
  // Just return the original URL for all sizes to avoid CDN issues
  return {
    small: originalUrl,
    medium: originalUrl,
    large: originalUrl,
    original: originalUrl
  };
};

export default function ResponsiveImage({ 
  src, 
  alt, 
  className, 
  priority = false,
  placeholder
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleImageError = () => {
    setHasError(true);
    console.error('Failed to load image:', src);
  };

  const responsiveUrls = generateResponsiveUrls(src);

  return (
    <div ref={imgRef} className="w-full h-full">
      {isInView ? (
        hasError ? (
          <div className="w-full h-full bg-red-100 flex items-center justify-center">
            <div className="text-red-500 text-sm">Failed to load image</div>
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )
      ) : (
        placeholder || (
          <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        )
      )}
    </div>
  );
}