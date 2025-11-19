import { createClient, ContentfulApi } from 'contentful';

// Contentful client configuration
const client: ContentfulApi = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID || 'master',
});

export default client;