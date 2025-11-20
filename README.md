# Brian St. Cyr - Artist Portfolio

A modern, responsive portfolio website showcasing the contemporary art of Brian St. Cyr. Built with Next.js and integrated with Contentful CMS for dynamic content management, featuring lazy loading optimization and multi-platform navigation.

## 🎨 Features

- **Dynamic Content Management**: Contentful CMS integration for images and metadata, with automatic fallback to static data
- **Responsive Grid Layout**: Adaptive layout that displays 1 column on mobile, 2 on tablet, and 5 on desktop
- **Smart Lazy Loading**: Performance-optimized image loading with responsive priority counts
- **SEO-Friendly URLs**: Slug-based routing (e.g., `/portfolio/marlboro-black-100s/`)
- **Multi-Input Navigation**: 
  - **Keyboard Navigation**: Arrow key support for artwork browsing on desktop
  - **Touch/Swipe Navigation**: Mobile-friendly swipe gestures for portfolio navigation
- **Fundraiser Integration**: Dedicated page for artwork sales with purchase buttons and payment details
- **Analytics Integration**: Google Analytics and Microsoft Clarity for visitor insights
- **Professional File Organization**: PascalCase naming conventions for services and components

## 🚀 Tech Stack

### Content Management
- **[Contentful](https://contentful.com/)** - Headless CMS with Contentful API
- **Dynamic/Static Hybrid** - Contentful data with static fallback for reliability

### Core Framework
- **[Next.js 16.0.3](https://nextjs.org/)** - React framework with App Router and static generation
- **[React 19.2.0](https://react.dev/)** - UI library
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Type safety

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)** - Custom Google Font

### Performance Optimization
- **Custom Lazy Loading** - Intersection Observer API for viewport-based image loading
- **Responsive Priority Loading**:
  - Mobile (< 768px): 3 priority images
  - Tablet (768px-1024px): 6 priority images  
  - Desktop (≥1024px): 10 priority images
- **Next.js Image Optimization** - Automatic image optimization and WebP conversion

### Analytics & Monitoring
- **[Google Analytics](https://analytics.google.com/)** - Via `@next/third-parties/google`
- **[Microsoft Clarity](https://clarity.microsoft.com/)** - Custom implementation with CDN loading

### Testing & Quality
- **[Vitest](https://vitest.dev/)** - Fast unit testing framework that runs on deployment
- **ESLint** - Code linting and quality enforcement

### Deployment & CI/CD
- **GitHub Pages** - Static site hosting
- **GitHub Actions** - Automated testing, building, and deployment
- **Environment Variables** - Secure configuration management

## 🧪 Testing

### Test Coverage
- ✅ Mobile viewport loads exactly 3 images immediately
- ✅ Tablet viewport loads exactly 6 images immediately
- ✅ Desktop viewport loads exactly 10 images immediately
- ✅ Non-priority images show loading placeholders
- ✅ Priority count updates on window resize
- ✅ Correct responsive grid CSS classes

## 🌐 Deployment

### Automatic Deployment
The site automatically deploys to GitHub Pages when changes are pushed to the `main` branch:

1. **Tests Run** - Vitest ensures code quality
2. **Build Process** - Next.js static export generation
3. **Deploy** - Automatic deployment to GitHub Pages


## 📊 Analytics Configuration

### Environment Variables
```bash
# .env.local (development)
NEXT_PUBLIC_CLARITY_PROJECT_ID=u80mdcopyu
NEXT_PUBLIC_GA_ID=G-4ZLBFT7MVY
```

### Production Configuration
Environment variables are set in the GitHub Actions workflow for automatic deployment.

## 🎯 Performance Features

### Lazy Loading Strategy
- **Above-the-fold priority loading** ensures fast initial page load
- **Responsive priority counts** optimize for different screen sizes
- **Intersection Observer API** provides smooth lazy loading experience
- **Loading placeholders** give visual feedback during image load

### CSS Animations
- **Group hover states** for coordinated hover effects
- **Transform transitions** with 300ms duration for smooth interactions
- **Overflow hidden containers** prevent layout shifts during zoom
- **Opacity transitions** for loading states and overlays

## 🛒 E-commerce Features

### Fundraiser Integration
- **Dedicated Fundraiser Page** (`/fundraiser`) showcasing artworks available for purchase
- **Dynamic Pricing System** - Portfolio items support custom pricing 
- **Purchase Buttons** - Email integration with pre-filled purchase inquiries
- **Payment Information** - PayPal and Venmo contact details prominently displayed

## 📱 Navigation & UX

### Multi-Platform Input Support
- **Desktop Navigation**:
  - Arrow keys (left/right) for portfolio browsing
  - Clickable navigation buttons
  - Hover effects and visual feedback
  
- **Mobile Navigation**:
  - Touch/swipe gestures for intuitive navigation
  - Minimum 50px swipe distance prevents accidental navigation
  - Horizontal swipe detection (prevents conflict with vertical scrolling)

### Gesture Recognition
- **Smart Touch Detection** - Distinguishes between intentional swipes and accidental touches
- **Direction Validation** - Only horizontal swipes trigger navigation
- **Event Handling** - Passive listeners for performance, non-passive for gesture control


## 🚀 Future Enhancements

- [ ] Content Management System integration
- [ ] Image optimization with multiple formats
- [ ] Progressive Web App (PWA) features
- [ ] Advanced SEO optimization
- [ ] Performance monitoring dashboard
- [ ] Social media integration
