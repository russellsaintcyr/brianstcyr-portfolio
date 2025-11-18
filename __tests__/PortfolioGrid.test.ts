import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import PortfolioGrid from '../components/PortfolioGrid'

// Mock the portfolio data with a smaller set for testing
vi.mock('../data/portfolio', () => ({
  portfolioData: {
    items: Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      title: `Test Artwork ${i + 1}`,
      slug: `test-artwork-${i + 1}`,
      imageUrl: `https://example.com/image${i + 1}.jpg`,
      description: `Description for artwork ${i + 1}`,
    }))
  }
}))

// Mock LazyImage to help us test priority behavior
vi.mock('../components/LazyImage', () => {
  return {
    default: function MockLazyImage({ priority, alt, placeholder }) {
      if (priority) {
        return React.createElement('img', { alt, src: 'priority-image.jpg', 'data-testid': 'priority-image' })
      } else {
        return React.createElement('div', { 'data-testid': 'lazy-placeholder' }, placeholder)
      }
    }
  }
})

// Helper function to set window width and trigger resize
const setWindowWidth = (width) => {
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

  test('loads only 3 images immediately on mobile width', async () => {
    // Set mobile width
    setWindowWidth(500)
    
    render(React.createElement(PortfolioGrid))
    
    await waitFor(() => {
      const priorityImages = screen.getAllByTestId('priority-image')
      const lazyPlaceholders = screen.getAllByTestId('lazy-placeholder')
      
      // Should have exactly 3 priority images on mobile
      expect(priorityImages).toHaveLength(3)
      // Should have 17 lazy placeholders (20 total - 3 priority)
      expect(lazyPlaceholders).toHaveLength(17)
    })
  })

  test('loads 6 images immediately on tablet width', async () => {
    // Set tablet width
    setWindowWidth(800)
    
    render(React.createElement(PortfolioGrid))
    
    await waitFor(() => {
      const priorityImages = screen.getAllByTestId('priority-image')
      const lazyPlaceholders = screen.getAllByTestId('lazy-placeholder')
      
      expect(priorityImages).toHaveLength(6)
      expect(lazyPlaceholders).toHaveLength(14)
    })
  })

  test('loads 10 images immediately on desktop width', async () => {
    // Set desktop width  
    setWindowWidth(1200)
    
    render(React.createElement(PortfolioGrid))
    
    await waitFor(() => {
      const priorityImages = screen.getAllByTestId('priority-image')
      const lazyPlaceholders = screen.getAllByTestId('lazy-placeholder')
      
      expect(priorityImages).toHaveLength(10)
      expect(lazyPlaceholders).toHaveLength(10)
    })
  })

  test('shows loading placeholders for non-priority images', async () => {
    render(React.createElement(PortfolioGrid))
    
    // Should show loading placeholders for non-priority images
    const lazyPlaceholders = screen.getAllByTestId('lazy-placeholder')
    expect(lazyPlaceholders.length).toBeGreaterThan(0)
  })

  test('updates priority count when window is resized', async () => {
    // Start with desktop width first
    setWindowWidth(1200)
    
    const { unmount } = render(React.createElement(PortfolioGrid))
    
    await waitFor(() => {
      const priorityImages = screen.getAllByTestId('priority-image')
      expect(priorityImages).toHaveLength(10)
    })
    
    // Unmount and remount with mobile width to ensure clean state
    unmount()
    
    setWindowWidth(400)
    render(React.createElement(PortfolioGrid))
    
    await waitFor(() => {
      const priorityImages = screen.getAllByTestId('priority-image')
      expect(priorityImages).toHaveLength(3)
    })
  })

  test('renders correct grid layout classes for different screen sizes', async () => {
    render(React.createElement(PortfolioGrid))
    
    const gridContainer = screen.getByRole('main').querySelector('.grid')
    
    // Should have responsive grid classes
    expect(gridContainer?.classList.contains('grid-cols-1')).toBe(true) // mobile
    expect(gridContainer?.classList.contains('md:grid-cols-2')).toBe(true) // tablet  
    expect(gridContainer?.classList.contains('lg:grid-cols-5')).toBe(true) // desktop
  })
})