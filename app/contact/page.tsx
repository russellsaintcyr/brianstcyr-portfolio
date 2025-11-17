import Link from 'next/link';
import Header from '@/components/Header';

// ContactPage Component - Contact form and information
// Route: /contact

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header showBackButton={true} />

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