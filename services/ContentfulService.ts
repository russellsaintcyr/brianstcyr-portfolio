import { createClient } from 'contentful';

// Check for required environment variables
if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  console.warn('⚠️  Contentful environment variables not found. Using fallback configuration.');
}

// Contentful client configuration with fallback
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || 'fallback-space',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || 'fallback-token',
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID || 'master',
});

export default client;