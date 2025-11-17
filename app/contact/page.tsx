import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
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
              <Link href="/contact" className="block px-4 py-3 text-gray-700 hover:bg-gray-50 border-b border-gray-100 bg-gray-50">
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
              <Link href="/biography" className="block px-4 py-3 text-gray-700 hover:bg-gray-50">
                Biography
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-8">
            CONTACT
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get in touch for inquiries about artwork, commissions, or collaborations.
          </p>
        </div>

        {/* Contact Form */}
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-black mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full px-4 py-3 border border-gray-300 focus:border-black focus:outline-none transition-colors resize-vertical"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 px-6 font-medium hover:bg-gray-800 transition-colors"
          >
            Send Message
          </button>
        </form>

        {/* Alternative Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-600 mb-4">
            Or reach out directly:
          </p>
          <div className="space-y-2">
            <p className="text-black">
              <span className="font-medium">Email:</span>{' '}
              <a href="mailto:brian@example.com" className="hover:text-gray-600 transition-colors">
                brian@example.com
              </a>
            </p>
            {/* Add social media links if available */}
          </div>
        </div>
      </main>
    </div>
  );
}