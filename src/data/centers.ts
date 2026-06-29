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
  { name: 'Costa Rica', image: 'https://image.urlaubspiraten.de/640/image/upload/v1603282785/mediavault_images/njj86gxaivachs4slnzf.jpg', count: 67, url:"https://retreatsaroundtheworld.net/retreatcenters" },
  { name: 'Andalusia', image: 'https://shegowandering.com/wp-content/uploads/2020/05/DSC07765-1024x683.jpg', count: 45, url:"https://retreatsaroundtheworld.net/retreatcenters" },
  { name: 'Hawaii', image: 'https://www.retreatfinder.com/custom/domain_1/image_files/1660_photo_1047.jpg', count: 38, url:"https://retreatsaroundtheworld.net/retreatcenters" },
    { name: 'Japan', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmU3wbekINKc6bMIEPzXoB7rA9ryti4D048OMJIReU_IVxwfOwb1JfwRY&s=10', count: 38, url:"https://retreatsaroundtheworld.net/retreatcenters" },
     { name: 'India', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf2pCFLrIYFl7p2tyLcOd0D1aFL9pczuiPzXOMw3tgtIktLjL0lEYcMnZc&s=10', count: 38, url:"https://retreatsaroundtheworld.net/retreatcenters" },

  
];
