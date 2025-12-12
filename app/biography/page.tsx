import Header from '@/components/Header';
import { getEntriesByType } from '@/services/PortfolioService';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';

// BiographyPage Component - Fetches biography from Contentful
export default async function BiographyPage() {
  const [bioEntry] = await getEntriesByType<any>('biography', { limit: 1 });
  const content = bioEntry?.fields?.biographyText || null;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="text-gray-700 leading-relaxed space-y-6">
            <h1 className="text-4xl font-bold text-black tracking-tight mb-8">
              Biography
            </h1>
            {content ? (
              documentToReactComponents(content as Document)
            ) : (
              <p>No biography found.</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}