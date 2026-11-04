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




export const featuredGuides = [
  { name: 'Shanti Luca', image: 'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/massage.mp4?alt=media&token=cf4a2dcb-c420-4429-9d04-14e007b7bd20', url:"https://retreatsaroundtheworld.net/retreatcenterdetails/52af8973-8025-46e4-9f77-4588b6387a06undefined" },
  {name:'Rita Anthony', image:'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/chef.mp4?alt=media&token=f04acf8f-8c71-4d17-83e9-5b4b3f364d3d', url:"https://retreatsaroundtheworld.net/retreatcenters" },
  {name:'Habib Malik', image:'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/coach.mp4?alt=media&token=c19f4a52-2847-456b-bd22-acdfe9c217ed', url:"https://retreatsaroundtheworld.net/retreatcenters"}

];