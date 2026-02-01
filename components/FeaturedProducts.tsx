import React from 'react';
import { Heart } from 'lucide-react';
import { FEATURED_PRODUCTS } from '../constants';

const FeaturedProducts: React.FC = () => {
  return (
    <section className="pb-24 bg-brand-light">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {FEATURED_PRODUCTS.map((product) => (
            <div key={product.id} className="group flex flex-col items-center">
              <div className="relative w-full aspect-square overflow-hidden bg-white mb-4">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-brand-gold hover:text-white transition-colors">
                  <Heart size={18} />
                </button>
                <div className="absolute bottom-0 left-0 w-full bg-white/90 py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="text-xs font-bold tracking-widest uppercase hover:text-brand-gold">Add to Cart</button>
                </div>
              </div>
              
              <h4 className="text-lg font-serif text-brand-dark mb-1 text-center">{product.name}</h4>
              <p className="text-sm font-medium text-brand-gold text-center">${product.price.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">{product.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;