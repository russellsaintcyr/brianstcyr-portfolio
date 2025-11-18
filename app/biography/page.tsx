import Link from 'next/link';
import Header from '@/components/Header';

// BiographyPage Component - Artist biography and background
// Route: /biography

export default function BiographyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-8">
            Biography
          </h1>
          
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
        </div>
      </main>
    </div>
  );
}