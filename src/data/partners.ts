export interface Partners {
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




export const featuredPartners = [
  { name: 'Clay | Utah ', image: 'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/clay.png?alt=media&token=11586db1-1e7e-4bbc-845f-610f13cb7189', url:"https://retreatsaroundtheworld.net/retreatcenterdetails/842f85e1-9a98-462f-aacd-a04f752d9e47undefined", title:'Four day ' },
  {name:'Peaceful Mind Centers| Beverly Hills, LA', image:"https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/peaceful.png?alt=media&token=11c39738-430e-46b4-a758-992336da2ac2" , url:"https://peacefulmindcenters.com/"},
  {name:'Polynesian Cultural Center| Hawaii', image:'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/Gateway%20Eat%20Free%20300x250.jpeg?alt=media&token=8b1cfc73-b834-4d25-968c-3637d0d92a4d', url:"https://polynesian-cultural-center.wfraqy.net/c/8137118/4071808/10648"},
  {name:'Reset Room| West Hollywood, LA', image:'https://firebasestorage.googleapis.com/v0/b/retreats-fda52.firebasestorage.app/o/reset.jpeg?alt=media&token=73428bd0-deef-4a1a-8bc2-5fc836906e05', url:"https://retreatsaroundtheworld.net/retreatcenterdetails/f5ff77e9-f9a4-4d2c-bfd9-d922494cdbbaundefined"}

];
