export interface Properties {
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




export const featuredProperties = [
  { name: 'Retreat Centers', image: 'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/retreatcenter.mp4?alt=media&token=b7274d06-d8c7-43d2-9a3c-d53bb7ea393f', url:"https://retreatsaroundtheworld.net/retreatcenterdetails/52af8973-8025-46e4-9f77-4588b6387a06undefined" },
  {name:'Farms', image:'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/farm.mp4?alt=media&token=00fa85fb-9de7-4200-a3a0-f6fe98ce1643', url:"https://retreatsaroundtheworld.net/retreatcenters" },
  {name:'Airbnbs/Hotels', image:'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/homes.mp4?alt=media&token=37da4f22-d497-485a-9408-3b47a9b86876', url:"https://retreatsaroundtheworld.net/retreatcenters"},
    {name:'Rent for remote workers', image:'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/remoteworkers.mp4?alt=media&token=71d28f7c-d21e-42d5-8846-5d4202f13d0e', url:"https://retreatsaroundtheworld.net/retreatcenters"}


];
