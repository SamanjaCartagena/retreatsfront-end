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




export const featuredEvents= [
  { name: 'Maryland, USA', image: 'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/BOONABET%20COFFFEE%20CREEK%20CEREMONY.mp4?alt=media&token=2ea0db0f-6671-4cb3-97ed-54f499804cb6', url:"https://retreatsaroundtheworld.net/retreatcenterdetails/52af8973-8025-46e4-9f77-4588b6387a06undefined", owner:'Elsa Gebremeskel' },
  {name:'Masai Mara, Kenya', image:'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/download%20(8).mp4?alt=media&token=b928206e-7cda-474f-91ba-2b30d08755cc', url:"https://retreatsaroundtheworld.net/retreatcenters",owner:'The Masaii: Kings of the savannah' },
  {name:'Ankara, Turkey', image:'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/download%20(9).mp4?alt=media&token=026d2cda-4a59-4cd4-845b-9858754d2408', url:"https://retreatsaroundtheworld.net/retreatcenters", owner:'Akın Bağcıoğlu'}

];
