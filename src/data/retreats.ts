
export interface Retreat {
  id: string;
  title: string;
  location: string;
  country: string;
  price: number;
  image: string;
  rating: number;
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
    title: 'Peaceful Mountain Yoga Retreat',
    location: 'Bali',
    country: 'Indonesia',
    price: 199,
    image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
    rating: 4.9,
    reviewCount: 124,
    categories: ['Yoga', 'Meditation', 'Wellness'],
    description: 'Immerse yourself in nature with this rejuvenating yoga retreat nestled in the lush mountains of Bali. Daily yoga, meditation, and organic meals included.',
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
  { name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23', count: 94 },
  { name: 'Tulum, Mexico', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb', count: 67 },
  { name: 'Sedona, United States', image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb', count: 45 },
  { name: 'Lake Como, Italy', image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7', count: 38 },
];
