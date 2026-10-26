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
  { name: 'Puerto Rico', image: 'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/casatortuga.mp4?alt=media&token=f34f5f83-b765-427c-8bd2-6d5e71536273', url:"https://retreatsaroundtheworld.net/retreatcenters" },
  {name:'Morocco', image:'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/sahara.mp4?alt=media&token=3b42aede-03a3-4aa5-989a-76ab1ddf7467', url:"https://retreatsaroundtheworld.net/retreatcenters" },
  {name:'Bali', image:'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/bali.mp4?alt=media&token=5b0bc0fb-79c4-4576-a4e6-54386ce22a68', url:"https://retreatsaroundtheworld.net/retreatcenters"}

];
