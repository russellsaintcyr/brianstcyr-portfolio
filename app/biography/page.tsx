import Header from '@/components/Header';
import { getEntriesByType } from '@/services/PortfolioService';


// BiographyPage Component - Fetches biography from Contentful
export default async function BiographyPage() {
  const [bioEntry] = await getEntriesByType<any>('biography', { limit: 1 });
  const content = bioEntry?.fields?.biographyText || '';
  const exhibitions = bioEntry?.fields?.exhibitions || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {/* Dynamic Contentful Content */}
          <div className="text-gray-700 leading-relaxed space-y-6">
            {content ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              <p>No biography found.</p>
            )}
          </div>
          {exhibitions && exhibitions.length > 0 && (
            <div className="mt-16 pt-8 border-t border-gray-200">
              <h2 className="text-3xl font-bold text-black tracking-tight mb-8">
                Exhibitions
              </h2>
              <div className="space-y-8">
                {exhibitions.map((ex: any, idx: number) => (
                  <div key={idx} className="border-l-4 border-black pl-6">
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {ex.title}
                    </h3>
                    <p className="text-gray-700 mb-1">
                      <span className="font-medium">{ex.venue}</span>{ex.location ? ` • ${ex.location}` : ''}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {ex.dates}
                    </p>
                    {ex.description && (
                      <p className="text-gray-700 mt-2 text-sm">
                        {ex.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <hr className="my-12 border-t-2 border-gray-300" />

          {/* Static Content (old content) */}
          <div className="text-gray-700 leading-relaxed space-y-6">
            <p>
              Brian St. Cyr is a contemporary artist whose work explores themes of identity, 
              transformation, and the human condition through a diverse range of media including 
              painting, drawing, sculpture, and digital collage.
            </p>
            <p>
              Born and raised in Louisiana, St. Cyr's work is deeply influenced by the rich 
              cultural landscape of the American South, incorporating elements of folklore, 
              mythology, and personal narrative into his artistic practice.
            </p>
            <p>
              His recent body of work includes the provocative "All Marlboro Men Go To Heaven" 
              series (2025), featuring custom cigarette boxes that challenge notions of 
              masculinity and mortality, and the haunting "Pinocchio Covid" series (2023), 
              which examines themes of truth, deception, and isolation during the pandemic era.
            </p>
            <p>
              St. Cyr's digital collages, including pieces like "Motherfuckers!" and "Jesus Christ!" 
              (2024), demonstrate his ability to seamlessly blend traditional artistic techniques 
              with contemporary digital media, creating works that are both visually striking and 
              conceptually challenging.
            </p>
            <p>
              Through his photography series "Liminal Space" (2024), St. Cyr explores the 
              psychological landscapes that exist between reality and imagination, creating 
              surreal environments that invite viewers to question their perceptions of space 
              and place.
            </p>
            <p>
              His work has been featured in numerous exhibitions and continues to evolve as 
              he pushes the boundaries of contemporary art practice, always maintaining a 
              commitment to authentic expression and meaningful dialogue with his audience.
            </p>
          </div>

          {/* Static Exhibitions Section */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-black tracking-tight mb-8">
              Exhibitions
            </h2>
            <div className="space-y-8">
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-xl font-semibold text-black mb-2">
                  "Liminal Spaces: Contemporary Visions"
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Gallery 1850</span> • New Orleans, Louisiana
                </p>
                <p className="text-gray-600 text-sm">
                  March 15 - May 10, 2025
                </p>
                <p className="text-gray-700 mt-2 text-sm">
                  Group exhibition featuring digital collage and photography works
                </p>
              </div>
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-xl font-semibold text-black mb-2">
                  "All Marlboro Men Go To Heaven" (Solo Exhibition)
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Contemporary Arts Center</span> • New Orleans, Louisiana
                </p>
                <p className="text-gray-600 text-sm">
                  January 8 - February 28, 2025
                </p>
                <p className="text-gray-700 mt-2 text-sm">
                  Solo exhibition showcasing the complete cigarette box series
                </p>
              </div>
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-xl font-semibold text-black mb-2">
                  "Southern Narratives: Myth and Memory"
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Louisiana Museum of Modern Art</span> • Baton Rouge, Louisiana
                </p>
                <p className="text-gray-600 text-sm">
                  September 12 - December 3, 2024
                </p>
                <p className="text-gray-700 mt-2 text-sm">
                  Group exhibition exploring Southern identity in contemporary art
                </p>
              </div>
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-xl font-semibold text-black mb-2">
                  "Digital Collage: New Media Expressions"
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Ogden Museum of Southern Art</span> • New Orleans, Louisiana
                </p>
                <p className="text-gray-600 text-sm">
                  June 5 - August 20, 2024
                </p>
                <p className="text-gray-700 mt-2 text-sm">
                  Group exhibition featuring contemporary digital art practices
                </p>
              </div>
              <div className="border-l-4 border-black pl-6">
                <h3 className="text-xl font-semibold text-black mb-2">
                  "Pandemic Reflections" (Solo Exhibition)
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Studio Space Gallery</span> • Lafayette, Louisiana
                </p>
                <p className="text-gray-600 text-sm">
                  October 15 - November 30, 2023
                </p>
                <p className="text-gray-700 mt-2 text-sm">
                  Solo exhibition featuring the "Pinocchio Covid" series and related works
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}