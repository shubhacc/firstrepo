import React from 'react';
import { useShop } from '../context';
import { getOptimizedImageUrl } from '../utils';

const CategoryGrid: React.FC = () => {
  const { setSelectedCategory, selectedCategory, categories } = useShop();

  const handleCategoryClick = (categoryName: string) => {
    // Toggle selection
    if (selectedCategory === categoryName) {
        setSelectedCategory(null);
    } else {
        setSelectedCategory(categoryName);
    }
    
    // Smooth scroll to products
    setTimeout(() => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <section id="categories" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-serif text-brand-dark mb-4">Explore Our Collections</h2>
           <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
           <p className="mt-4 text-gray-500 font-light">Find the perfect piece for every moment</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat) => (
            <div 
                key={cat.id} 
                className={`group cursor-pointer relative transition-all duration-300 ${selectedCategory === cat.name ? 'ring-4 ring-brand-gold ring-offset-2' : ''}`}
                onClick={() => handleCategoryClick(cat.name)}
            >
              <div className="relative overflow-hidden aspect-[3/4] mb-3 bg-gray-100">
                <img
                  src={getOptimizedImageUrl(cat.image)}
                  alt={cat.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className={`absolute inset-0 transition-colors duration-300 ${selectedCategory === cat.name ? 'bg-brand-gold/20' : 'bg-brand-dark/20 group-hover:bg-brand-dark/40'}`}></div>
                
                {/* Text centered on image */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                   <h3 className="text-white text-lg md:text-xl font-serif tracking-widest text-center uppercase border-b border-transparent group-hover:border-white/80 pb-1 transition-all duration-300 drop-shadow-lg">
                    {cat.name}
                   </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;