export interface Centers {
  id: string;
  title: string;
  location: string;
  country: string;
  price: number;
  image: string;
  rating: number;
  url:string;
  reviewCount: number;
  categories: string[];
  description: string;
  amenities: string[];
  dates?: string;
  host: {
    name: string;
    image: string;
    rating: number;
  };
}

// Sample retreat data




export const featuredCenters = [
  { name: 'Bali', image: 'https://deih43ym53wif.cloudfront.net/tanah-temple-bali-indonesia-shutterstock_507089302.jpg_d874b9cc06.jpg', count: 94, url:"https://retreatsaroundtheworld.net/retreatcenters" },
  { name: 'Costa Rica', image: 'https://www.amatierra.com/wp-content/uploads/2018/03/amatierra-yoga-retreat-and-wellness-center-costa-rica.jpg', count: 67, url:"https://retreatsaroundtheworld.net/retreatcenters" },
  { name: 'Andalusia', image: 'https://www.ramahdarom.org/wp-content/uploads/2017/03/campfire-ampitheater.jpg', count: 45, url:"https://retreatsaroundtheworld.net/retreatcenters" },
  { name: 'Hawaii', image: 'https://www.retreatfinder.com/custom/domain_1/image_files/1660_photo_1047.jpg', count: 38, url:"https://retreatsaroundtheworld.net/retreatcenters" },
    
  
];
