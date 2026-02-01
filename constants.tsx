import { Product, NavItem, Category } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'HOME', href: '#' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: 'https://www.instagram.com/jewellsofjoy19823?igsh=MWF6djJ1Z2h6M2V0ZA==' },
];

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Rings', image: 'https://drive.google.com/file/d/1hByLbeyVCW8PDfpKKaZ7D3d9JNe63Iuk/view?usp=drive_link' },
  { id: 2, name: 'Necklaces', image: 'https://drive.google.com/file/d/1WWLf-0wUvP8wOhzFIDdNCkPBm83qFrbC/view?usp=drive_link' },
  { id: 3, name: 'Bangles', image: 'https://picsum.photos/id/146/400/500' },
  { id: 4, name: 'Nath', image: 'https://drive.google.com/file/d/1h-uUh4JJ_XvPbstnMOwjc-1AdO1jscPT/view?usp=drive_link' },
  { id: 5, name: 'Invisible Necklaces', image: 'https://picsum.photos/seed/invisible/400/500' },
  { id: 6, name: 'Nath Bugadi Set', image: './nath-bugadi-set.jpg' },
  { id: 7, name: 'Bracelets', image: 'https://picsum.photos/seed/bracelets/400/500' },
  { id: 8, name: 'Earrings', image: 'https://picsum.photos/id/152/400/500' },
  { id: 9, name: 'Hair Accessories', image: 'https://drive.google.com/file/d/1ySjqfQ8nL3b--b67ahP6zCFOdfuLDs7i/view?usp=drive_link' },
  { id: 10, name: 'Mundavali', image: 'https://picsum.photos/seed/mundavali/400/500' },
  { id: 11, name: 'Bajuband', image: 'https://picsum.photos/seed/bajuband/400/500' },
  { id: 12, name: 'Mangalsutra', image: 'https://picsum.photos/seed/mangalsutra/400/500' },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Ruby Heritage Ring',
    price: 2450,
    category: 'Rings',
    images: ['https://picsum.photos/id/111/800/800', 'https://picsum.photos/id/111/400/400?grayscale'], 
    description: 'A stunning ruby ring crafted with traditional techniques, perfect for special occasions.'
  },
  {
    id: 2,
    name: 'Gold Temple Bangles',
    price: 1800,
    category: 'Bangles',
    images: ['https://picsum.photos/id/146/800/800'], 
    description: 'Intricate temple design bangles that add a touch of royalty to your attire.'
  },
  {
    id: 3,
    name: 'Pearl Drop Jhumkas',
    price: 1200,
    category: 'Earrings',
    images: ['https://picsum.photos/id/152/800/800'], 
    description: 'Elegant pearl drops suspended from gold-plated jhumkas.'
  },
  {
    id: 4,
    name: 'Solitaire Gold Stack',
    price: 1980,
    category: 'Rings',
    images: ['https://picsum.photos/id/157/800/800'], 
    description: 'A modern stackable ring set featuring high-quality solitaires.'
  },
];