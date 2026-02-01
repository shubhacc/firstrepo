import React from 'react';

export interface Product {
  id: number | string;
  name: string;
  price: number;
  originalPrice?: number; // For strike-through price
  category: string;
  images: string[]; // Changed from single image to array
  videos?: string[]; // Changed from single video to array
  description?: string;
  isNew?: boolean;
}

export interface Category {
  id: number | string;
  name: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}