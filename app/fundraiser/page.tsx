import Image from 'next/image';
import Link from 'next/link';
import { getPortfolioData } from '@/lib/portfolio';
import Header from '@/components/Header';
import PurchaseButton from '@/components/PurchaseButton';

// FundraiserPage Component - Shows items available for purchase
// Route: /fundraiser

export default async function FundraiserPage() {
  const portfolioData = await getPortfolioData();
  // Filter items that are for sale
  const forSaleItems = portfolioData.items.filter(item => item.forSale);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-black tracking-tight mb-6">
            “All Marlboro Men Go To Heaven”
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed">
              Thank You for looking at my new artwork fundraiser. I am currently in PT due to shoulder surgery. 
              Each piece will be custom made according to the brand you pick and will be VERY close to but not exact, 
              as they are all handmade. Only 150$ Each! Just hit the purchase button on each page, 
              It will take you to an email form and my PP and Venmo contacts. 
              Attach mailing address if needed and feel free to post or share.
            </p>
          </div>
        </div>

        {/* For Sale Items Grid */}
        {forSaleItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {forSaleItems.map((item) => (
              <div key={item.id} className="group">
                <Link href={`/portfolio/${item.slug}`} className="block mb-4">
                  <div className="aspect-[10/13] relative overflow-hidden bg-gray-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start">
                      <div className="p-4 text-white w-full">
                        <h2 className="text-lg font-bold tracking-tight mb-1">
                          {item.title}
                        </h2>
                        {item.description && (
                          <p className="text-sm text-white/90">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
                
                <div className="text-center">
                  <PurchaseButton itemTitle={item.title} price={item.price} className="w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              No items are currently available for purchase.
            </p>
          </div>
        )}

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">Payment & Contact</h2>
          <p className="text-gray-600 mb-4">
            All purchases are handled via email. Payment accepted through PayPal and Venmo.
          </p>
          <div className="mb-6">
            <p className="text-gray-700 mb-1">
              <span className="font-medium">PAYPAL:</span> newyorksaint@gmail.com
            </p>
            <p className="text-gray-700">
              <span className="font-medium">VENMO:</span> @BrianStCyr2
            </p>
          </div>
          <Link 
            href="/contact"
            className="inline-block px-6 py-3 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors"
          >
            Contact Information
          </Link>
        </div>
      </main>
    </div>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'All Marlboro Men Go To Heaven - Fundraiser | Brian St. Cyr',
  description: 'Support Brian St. Cyr\'s recovery with custom cigarette box artwork. Each handmade piece is $150. Browse available works from the "All Marlboro Men Go To Heaven" collection.',
  keywords: 'Brian St. Cyr, fundraiser, art for sale, custom cigarette boxes, handmade art, All Marlboro Men Go To Heaven',
};