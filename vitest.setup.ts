import { vi } from 'vitest'
import React from 'react'

// Mock IntersectionObserver
(global as any).IntersectionObserver = class IntersectionObserver {
  callback: any
  options: any
  observedElements: Set<any>

  constructor(callback: any, options: any) {
    this.callback = callback
    this.options = options
    this.observedElements = new Set()
  }

  observe(element: any) {
    this.observedElements.add(element)
    // Simulate immediate intersection for testing
    setTimeout(() => {
      this.callback([{
        target: element,
        isIntersecting: true,
        intersectionRatio: 1,
      }])
    }, 0)
  }

  unobserve(element: any) {
    this.observedElements.delete(element)
  }

  disconnect() {
    this.observedElements.clear()
  }
}

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: (props: any) => {
    return React.createElement('img', props)
  },
}))

// Mock window.innerWidth for responsive testing
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
})

// Mock window.addEventListener
Object.defineProperty(window, 'addEventListener', {
  writable: true,
  configurable: true,
  value: vi.fn(),
})

Object.defineProperty(window, 'removeEventListener', {
  writable: true,
  configurable: true,
  value: vi.fn(),
})