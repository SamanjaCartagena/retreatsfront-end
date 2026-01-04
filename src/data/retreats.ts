
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
export const retreats: Retreat[] = [
  {
    id: '1',
    title: 'Spring Equinox Retreat',
    location: 'Paralia Katerinis, Olympus Mountain.',
    country: 'Greece',
    price: 696.40,
    image: 'https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/510360966_10233106609201508_5386818328494829899_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=102&ccb=1-7&_nc_sid=75d36f&_nc_ohc=sPSaOjStahEQ7kNvwE8wYNH&_nc_oc=AdkQr0UN_nJKOk8YPvK7s_8FQ2Nj-tLWStZpZzV9-TAByvtPCavclKl6e_pUh2bHJy8&_nc_zt=23&_nc_ht=scontent-lga3-1.xx&_nc_gid=K8ykXo_jPDckLFo3VA3mZA&oh=00_AfTCF8j7zXz--gWXORUSt4RcfhUuOcWiXymRfyNJGxzr4A&oe=6873BFD2',
    rating: 4.9,
    url:'https://www.facebook.com/events/1249986676495136?active_tab=about',
    reviewCount: 124,
    categories: ['Yoga', 'Meditation', 'Wellness'],
    description: 'Transportation to Olympus mountain and back to the hotel, included. Tour at Mythical Olympus Mountain, (Small hike at Enipeas Gorge), included. Waterfront of Paralia Katerinis, four klms walk included.',
    amenities: ['Daily yoga', 'Pool', 'Organic meals', 'Spa', 'Mountain views'],
    dates: 'Available all year',
    host: {
      name: 'Aria Wellness',
      image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
      rating: 4.8
    }
  },
  {
    id: '2',
    title: 'Beachfront Mindfulness Escape',
    location: 'Tulum',
    country: 'Mexico',
    price: 249,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    rating: 4.8,
    url:'https://www.facebook.com/events/1249986676495136?active_tab=about',
    reviewCount: 89,
    categories: ['Meditation', 'Wellness', 'Beach'],
    description: 'Connect with yourself at our beachfront sanctuary. This mindfulness retreat offers daily meditation, sound healing, and rejuvenating ocean swims.',
    amenities: ['Daily meditation', 'Beach access', 'Organic meals', 'Sound healing', 'Ocean view'],
    host: {
      name: 'Oceanic Mind',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      rating: 4.9
    }
  },
  {
    id: '3',
    title: 'Alpine Forest Writing Retreat',
    location: 'Chamonix',
    country: 'France',
    price: 329,
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
    rating: 4.7,
    url:'https://www.facebook.com/events/1249986676495136?active_tab=about',
    reviewCount: 63,
    categories: ['Creative', 'Writing', 'Mountain'],
    description: 'Find your creative voice in the stunning French Alps. This writing retreat includes workshops, private writing time, and inspiring nature walks.',
    amenities: ['Writing workshops', 'Private cabin', 'Full board', 'Mountain hikes', 'Creative community'],
    host: {
      name: 'Alpine Writers',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      rating: 4.7
    }
  },
  {
    id: '4',
    title: 'Desert Wellness & Art Experience',
    location: 'Sedona',
    country: 'United States',
    price: 279,
    image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    rating: 4.9,
    url:'https://www.facebook.com/events/1249986676495136?active_tab=about',
    reviewCount: 107,
    categories: ['Wellness', 'Art', 'Desert'],
    description: 'Rejuvenate your spirit in the mystical red rocks of Sedona. This unique retreat combines wellness practices with artistic expression.',
    amenities: ['Art workshops', 'Daily yoga', 'Meditation', 'Hiking', 'Vegan meals'],
    host: {
      name: 'Desert Soul',
      image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
      rating: 4.8
    }
  },
  {
    id: '5',
    title: 'Lakeside Digital Detox',
    location: 'Lake Como',
    country: 'Italy',
    price: 389,
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
    rating: 4.8,
    url:'https://www.facebook.com/events/1249986676495136?active_tab=about',
    reviewCount: 75,
    categories: ['Digital Detox', 'Wellness', 'Lake'],
    description: 'Disconnect to reconnect at our serene lakeside haven. This digital detox retreat offers a perfect balance of structured activities and peaceful relaxation.',
    amenities: ['No wifi', 'Lake activities', 'Mindfulness', 'Gourmet Italian food', 'Nature walks'],
    host: {
      name: 'Lago Tranquillo',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
      rating: 4.9
    }
  },
  {
    id: '6',
    title: 'Remote Mountain Fitness Camp',
    location: 'Queenstown',
    country: 'New Zealand',
    price: 299,
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    rating: 4.8,
    url:'https://www.facebook.com/events/1249986676495136?active_tab=about',
    reviewCount: 92,
    categories: ['Fitness', 'Adventure', 'Mountain'],
    description: 'Challenge yourself in the breathtaking mountains of New Zealand. This fitness retreat combines outdoor adventure with expert-led training sessions.',
    amenities: ['Daily workouts', 'Hiking', 'Mountain biking', 'Nutritional meals', 'Hot springs'],
    host: {
      name: 'Peak Performance',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
      rating: 4.8
    }
  }
];

export const categories = [
  { name: 'All', icon: 'home' },
  { name: 'Yoga', icon: 'users' },
  { name: 'Meditation', icon: 'star' },
  { name: 'Wellness', icon: 'star' },
  { name: 'Creative', icon: 'star' },
  { name: 'Fitness', icon: 'star' },
  { name: 'Digital Detox', icon: 'star' },
  { name: 'Beach', icon: 'map-pin' },
  { name: 'Mountain', icon: 'map-pin' },
  { name: 'Desert', icon: 'map-pin' },
  { name: 'Lake', icon: 'map-pin' }
];

export const featuredDestinations = [
  { name: 'Qatar', image: 'https://assets.bizclikmedia.net/1800/f1f1313ebb40b288bab012fc2eaf77c0:121155a1b0befc19cb3edb2e6dde53ae/490377-wrap-up-a3afe8-large-1687769659.jpg', count: 94 },
  { name: 'Emirates', image: 'https://media.cntraveler.com/photos/66ec51d7a66d02c5e80a4fe6/4:3/w_4864,h_3648,c_limit/GettyImages-1334589964.jpg', count: 67 },
  { name: 'JetBlue', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/cd/51/e3/jetblue-airways.jpg?w=1200&h=-1&s=1', count: 45 },
  { name: 'Hawaiian Airlines', image: 'https://content.r9cdn.net/rimg/dimg/ce/a6/cbbdc66b-al-HA-162b0641d5c.jpg?width=1366&height=768&xhint=1160&yhint=633&crop=true', count: 38 },
];
