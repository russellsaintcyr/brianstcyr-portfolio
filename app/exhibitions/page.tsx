import Header from '@/components/Header';
import { getEntriesByType } from '@/services/PortfolioService';

// ExhibitionsPage Component - Fetches exhibitions from Contentful
export default async function ExhibitionsPage() {
  // Fetch all exhibitions from Contentful
  const exhibitions = await getEntriesByType<any>('exhibition', { order: ['-fields.startDate'] });

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <section className="text-gray-700 leading-relaxed space-y-6">
            <h1 className="text-4xl font-bold text-black tracking-tight mb-8">
              Exhibitions
            </h1>
            <div className="space-y-8">
              {exhibitions.length === 0 && (
                <p className="text-gray-600">No exhibitions found.</p>
              )}
              {exhibitions.map((ex: any, idx: number) => (
                <div key={ex.sys?.id || idx} className="border-l-4 border-black pl-6">
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {ex.fields?.title}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">{ex.fields?.galleryName}</span>
                    {ex.fields?.galleryLocation ? ` • ${ex.fields.galleryLocation}` : ''}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {ex.fields?.startDate} - {ex.fields?.endDate}
                  </p>
                  {ex.fields?.description && (
                    <p className="text-gray-700 mt-2 text-sm">
                      {ex.fields.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}