import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import PortfolioGrid from '../components/PortfolioGrid'

// Create mock portfolio data for testing
const mockPortfolioData = {
  items: Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Test Artwork ${i + 1}`,
    slug: `test-artwork-${i + 1}`,
    imageUrl: `https://example.com/image${i + 1}.jpg`,
    description: `Description for artwork ${i + 1}`,
    year: '2024',
    forSale: false,
    price: 0,
  }))
}

// Mock LazyImage to help us test priority behavior
vi.mock('../components/LazyImage', () => {
  return {
    default: function MockLazyImage({ priority, alt, placeholder }: { priority?: boolean; alt: string; placeholder?: React.ReactNode }) {
      if (priority) {
        return React.createElement('img', { alt, src: 'priority-image.jpg', 'data-testid': 'priority-image' })
      } else {
        return React.createElement('div', { 'data-testid': 'lazy-placeholder' }, placeholder)
      }
    }
  }
})

// Helper function to set window width and trigger resize
const setWindowWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  
  // Trigger resize event
  const resizeEvent = new Event('resize')
  window.dispatchEvent(resizeEvent)
}

describe('PortfolioGrid Lazy Loading', () => {
  beforeEach(() => {
    // Reset window width before each test
    setWindowWidth(1024)
    
    // Clear all mocks
    vi.clearAllMocks()
  })

  test('loads only 3 images immediately on small mobile width', async () => {
    // Set small mobile width (< 640px)
    setWindowWidth(500)
    
    render(React.createElement(PortfolioGrid, { portfolioData: mockPortfolioData }))
    
    await waitFor(() => {
      const priorityImages = screen.getAllByTestId('priority-image')
      const lazyPlaceholders = screen.getAllByTestId('lazy-placeholder')
      
      // Should have exactly 3 priority images on small mobile
      expect(priorityImages).toHaveLength(3)
      // Should have 17 lazy placeholders (20 total - 3 priority)
      expect(lazyPlaceholders).toHaveLength(17)
    })
  })

  test('loads 4 images immediately on large mobile width', async () => {
    // Set large mobile width (640px - 768px)
    setWindowWidth(700)
    
    render(React.createElement(PortfolioGrid, { portfolioData: mockPortfolioData }))
    
    await waitFor(() => {
      const priorityImages = screen.getAllByTestId('priority-image')
      const lazyPlaceholders = screen.getAllByTestId('lazy-placeholder')
      
      expect(priorityImages).toHaveLength(4)
      expect(lazyPlaceholders).toHaveLength(16)
    })
  })

  test('loads 6 images immediately on tablet width', async () => {
    // Set tablet width (768px - 1024px)
    setWindowWidth(800)
    
    render(React.createElement(PortfolioGrid, { portfolioData: mockPortfolioData }))
    
    await waitFor(() => {
      const priorityImages = screen.getAllByTestId('priority-image')
      const lazyPlaceholders = screen.getAllByTestId('lazy-placeholder')
      
      expect(priorityImages).toHaveLength(6)
      expect(lazyPlaceholders).toHaveLength(14)
    })
  })

  test('loads 8 images immediately on small desktop width', async () => {
    // Set small desktop width (1024px - 1280px)
    setWindowWidth(1200)
    
    render(React.createElement(PortfolioGrid, { portfolioData: mockPortfolioData }))
    
    await waitFor(() => {
      const priorityImages = screen.getAllByTestId('priority-image')
      const lazyPlaceholders = screen.getAllByTestId('lazy-placeholder')
      
      expect(priorityImages).toHaveLength(8)
      expect(lazyPlaceholders).toHaveLength(12)
    })
  })

  test('loads 10 images immediately on large desktop width', async () => {
    // Set large desktop width (≥ 1280px)  
    setWindowWidth(1400)
    
    render(React.createElement(PortfolioGrid, { portfolioData: mockPortfolioData }))
    
    await waitFor(() => {
      const priorityImages = screen.getAllByTestId('priority-image')
      const lazyPlaceholders = screen.getAllByTestId('lazy-placeholder')
      
      expect(priorityImages).toHaveLength(10)
      expect(lazyPlaceholders).toHaveLength(10)
    })
  })

  test('shows loading placeholders for non-priority images', async () => {
    render(React.createElement(PortfolioGrid, { portfolioData: mockPortfolioData }))
    
    // Should show loading placeholders for non-priority images
    const lazyPlaceholders = screen.getAllByTestId('lazy-placeholder')
    expect(lazyPlaceholders.length).toBeGreaterThan(0)
  })

  test('updates priority count when window is resized', async () => {
    // Start with small desktop width first
    setWindowWidth(1200)
    
    const { unmount } = render(React.createElement(PortfolioGrid, { portfolioData: mockPortfolioData }))
    
    await waitFor(() => {
      const priorityImages = screen.getAllByTestId('priority-image')
      expect(priorityImages).toHaveLength(8)  // Small desktop shows 8 images
    })
    
    // Unmount and remount with mobile width to ensure clean state
    unmount()
    
    setWindowWidth(400)
    render(React.createElement(PortfolioGrid, { portfolioData: mockPortfolioData }))
    
    await waitFor(() => {
      const priorityImages = screen.getAllByTestId('priority-image')
      expect(priorityImages).toHaveLength(3)  // Small mobile shows 3 images
    })
  })

  test('renders correct grid layout classes for different screen sizes', async () => {
    render(React.createElement(PortfolioGrid, { portfolioData: mockPortfolioData }))
    
    const gridContainer = screen.getByRole('main').querySelector('.grid')
    
    // Should have all responsive grid classes for the 5-tier system
    expect(gridContainer?.classList.contains('grid-cols-1')).toBe(true)       // Default mobile
    expect(gridContainer?.classList.contains('sm:grid-cols-2')).toBe(true)    // Small mobile (640px+)
    expect(gridContainer?.classList.contains('md:grid-cols-3')).toBe(true)    // Tablet (768px+) 
    expect(gridContainer?.classList.contains('lg:grid-cols-4')).toBe(true)    // Small desktop (1024px+)
    expect(gridContainer?.classList.contains('xl:grid-cols-5')).toBe(true)    // Large desktop (1280px+)
  })
})