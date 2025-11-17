import Link from 'next/link';

export default function Biography() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with Back Navigation */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-2 py-4 flex justify-between items-center">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <span className="mr-2">←</span>
            Back to Portfolio
          </Link>
          
          {/* Menu Icon */}
          <div className="relative group">
            <button className="p-2 text-gray-600 hover:text-black transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <Link href="/contact" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100">
                Contact
              </Link>
              <a 
                href="https://2025stcyrfundraiser.myportfolio.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100"
              >
                Fundraiser
              </a>
              <Link href="/biography" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 bg-gray-50">
                Biography
              </Link>
            </div>
          </div>
        </div>
      </header>

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