import { PortfolioData } from '@/types/portfolio';

// Portfolio data based on Brian's website - Complete gallery with 54 items
// Items are arranged in 11 rows: 10 rows of 5 items + 1 row of 4 items = 54 total
export const portfolioData: PortfolioData = {
  items: [
    // Row 1 (Items 1-5)
    {
      id: '1',
      title: 'RED UNICORN',
      slug: 'red-unicorn',
      imageUrl: 'https://cdn.myportfolio.com/c0f809db-0ad5-4af5-b8cc-71412e32977c/62fa8b45-5ad4-4e23-b482-feeb40143f1d_rw_1920.jpg?h=a5d427c21248519e45183e7416bd4371',
    },
    {
      id: '2',
      title: 'CAMEL BLUE',
      slug: 'camel-blue-castle',
      imageUrl: 'https://cdn.myportfolio.com/c0f809db-0ad5-4af5-b8cc-71412e32977c/d66d64c2-8e5f-4368-9698-c6749c743618_rw_1920.jpg?h=391074acc88d58113eb184bfbb608987',
      description: '"All Marlboro Men Go To Heaven" 2025 Custom Cigarette Box',
      year: '2025',
    },
    {
      id: '3',
      title: 'NEWPORT 100S',
      slug: 'newport-castle',
      imageUrl: 'https://cdn.myportfolio.com/c0f809db-0ad5-4af5-b8cc-71412e32977c/4f67a3c9-e931-49fa-9d3f-202c09760009_rw_1920.jpg?h=e0a7713aa29410b1453c02f2a226a5b9',
      description: '"All Marlboro Men Go To Heaven" 2025 Custom Cigarette Box',
      year: '2025',
    },
    {
      id: '4',
      title: 'MARLBORO BLACK 100S',
      slug: 'marlboro-black-100s',
      imageUrl: 'https://cdn.myportfolio.com/c0f809db-0ad5-4af5-b8cc-71412e32977c/728db64b-6b7d-4544-b0ee-c24493b05ae0_rw_1920.jpg?h=890865e5d861ea0126941ca3b40898a2',
      description: '"All Marlboro Men Go To Heaven" 2025 Custom Cigarette Box',
      year: '2025',
    },
    {
      id: '5',
      title: 'MARLBORO',
      slug: 'marlboro',
      imageUrl: 'https://cdn.myportfolio.com/c0f809db-0ad5-4af5-b8cc-71412e32977c/4cbf8833-e347-475d-8f61-9a3cfbdbd072_rw_1920.jpg?h=4092f9f38067c007ea544823e8075ea5',
      description: '"All Marlboro Men Go To Heaven" 2025 Custom Cigarette Box',
      year: '2025',
    },
    
    // Row 2 (Items 6-10)
    {
      id: '6',
      title: 'NEWPORT',
      slug: 'newport-box',
      imageUrl: 'https://cdn.myportfolio.com/c0f809db-0ad5-4af5-b8cc-71412e32977c/6ee1fcf7-a1ef-46dc-906b-9379126e7f35_rw_1920.jpg?h=87a9acaeb97d8399c368abdd7b954037',
      description: '"All Marlboro Men Go To Heaven" 2025 Custom Cigarette Box',
      year: '2025',
    },
    {
      id: '7',
      title: 'MARLBORO MENTHOL',
      slug: 'all-marlboro-men-go-to-heaven',
      imageUrl: 'https://cdn.myportfolio.com/c0f809db-0ad5-4af5-b8cc-71412e32977c/e418aff1-dfc1-420c-95ed-b462e74eba78_rw_1920.jpg?h=bcc4affefadc47035b32981084704865',
      description: '"All Marlboro Men Go To Heaven" 2025 Custom Cigarette Box',
      year: '2025',
    },
    {
      id: '8',
      title: 'CAMEL',
      slug: 'camel',
      imageUrl: 'https://cdn.myportfolio.com/c0f809db-0ad5-4af5-b8cc-71412e32977c/b043c047-d27c-446f-b7e8-1eafbc039b23_rw_1920.jpg?h=d8d622663a75845eb392d6741ebf479e',
      description: '"All Marlboro Men Go To Heaven" 2025 Custom Cigarette Pack',
      year: '2025',
    },
    {
      id: '9',
      title: 'PORTRAIT... 2025',
      slug: 'd',
      imageUrl: 'https://cdn.myportfolio.com/c0f809db-0ad5-4af5-b8cc-71412e32977c/c83b521c-8d98-46e6-8f46-99d53f00b626_rw_1920.jpg?h=1856875b5f610f2872bb95b63fb9b902',
      year: '2025',
    },
    {
      id: '10',
      title: 'ALTAR 2025',
      slug: 'qdqweqe',
      imageUrl: 'https://cdn.myportfolio.com/c0f809db-0ad5-4af5-b8cc-71412e32977c/9c14b61b-d4d4-4626-be64-d94e25e00652_rw_1920.jpg?h=2176ae734509b7d351bbf565eb701fa0',
      description: '"Altar" 2025 custom cigarette box. #1 of 3',
      year: '2025',
    },

    // Row 3 (Items 11-15) - PLACEHOLDER - Need to be filled with actual data
    {
      id: '11',
      title: 'MICKEY MAR...',
      slug: 'mickey-marlboro', // Placeholder slug
      imageUrl: 'https://picsum.photos/800/600?random=11',
    },
    {
      id: '12',
      title: 'Artwork 12',
      slug: 'artwork-12',
      imageUrl: 'https://picsum.photos/800/600?random=12',
    },
    {
      id: '13',
      title: 'Artwork 13',
      slug: 'artwork-13',
      imageUrl: 'https://picsum.photos/800/600?random=13',
    },
    {
      id: '14',
      title: 'Artwork 14',
      slug: 'artwork-14',
      imageUrl: 'https://picsum.photos/800/600?random=14',
    },
    {
      id: '15',
      title: 'Artwork 15',
      slug: 'artwork-15',
      imageUrl: 'https://picsum.photos/800/600?random=15',
    },

    // Rows 4-11 (Items 16-54) - PLACEHOLDERS
    // TODO: Replace these with actual portfolio data from Brian's site
    ...Array.from({ length: 39 }, (_, index) => ({
      id: String(16 + index),
      title: `Artwork ${16 + index}`,
      slug: `artwork-${16 + index}`,
      imageUrl: `https://picsum.photos/800/600?random=${16 + index}`,
    })),
  ],
};