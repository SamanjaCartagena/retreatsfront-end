
export interface Retreat {
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




export const featuredDestinations = [
  { name: 'Qatar', image: 'https://assets.bizclikmedia.net/1800/f1f1313ebb40b288bab012fc2eaf77c0:121155a1b0befc19cb3edb2e6dde53ae/490377-wrap-up-a3afe8-large-1687769659.jpg', count: 94, url:"https://qatarairways.com" },
  { name: 'Emirates', image: 'https://media.cntraveler.com/photos/66ec51d7a66d02c5e80a4fe6/4:3/w_4864,h_3648,c_limit/GettyImages-1334589964.jpg', count: 67, url:"https://emirates.com" },
  { name: 'JetBlue', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/cd/51/e3/jetblue-airways.jpg?w=1200&h=-1&s=1', count: 45, url:"https://jetblue.com" },
  { name: 'Hawaiian Airlines', image: 'https://content.r9cdn.net/rimg/dimg/ce/a6/cbbdc66b-al-HA-162b0641d5c.jpg?width=1366&height=768&xhint=1160&yhint=633&crop=true', count: 38, url:"https://hawaiianairlines.com" },
];
