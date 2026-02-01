import React from 'react';
import { Heart, PlayCircle } from 'lucide-react';
import { useShop } from '../context';
import { getOptimizedImageUrl } from '../utils';

const ProductList: React.FC = () => {
  const { products, selectedCategory, viewProduct } = useShop();

  // ONLY show products if a category is selected
  if (!selectedCategory) return null;

  const filteredProducts = products.filter(p => p.category === selectedCategory);

  return (
    <section id="products" className="pb-24 bg-white min-h-[400px] border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-8 pt-12">
        
        <div className="flex justify-between items-end mb-8">
            <div>
                <h3 className="text-2xl font-serif text-brand-dark">
                    {selectedCategory} Collection
                </h3>
                <p className="text-sm text-gray-500 mt-1">{filteredProducts.length} items found</p>
            </div>
        </div>

        {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
                <p className="text-gray-400">No products found in this category.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
                <div 
                    key={product.id} 
                    className="group flex flex-col items-center cursor-pointer"
                    onClick={() => viewProduct(product)}
                >
                <div className="relative w-full aspect-square overflow-hidden bg-gray-100 mb-4 rounded-sm">
                    <img 
                    src={getOptimizedImageUrl(product.images[0])} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.videos && product.videos.length > 0 && (
                        <div className="absolute top-4 left-4 text-white drop-shadow-md">
                            <PlayCircle size={24} />
                        </div>
                    )}
                    {product.originalPrice && product.originalPrice > product.price && (
                        <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                            Sale
                        </span>
                    )}
                    <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-brand-gold hover:text-white transition-colors shadow-sm z-10" onClick={(e) => {
                        e.stopPropagation();
                        // Add wishlist logic here
                    }}>
                        <Heart size={18} />
                    </button>
                    <div className="absolute bottom-0 left-0 w-full bg-white/95 py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                    <span className="text-xs font-bold tracking-widest uppercase hover:text-brand-gold">View Details</span>
                    </div>
                </div>
                
                <h4 className="text-lg font-serif text-brand-dark mb-1 text-center group-hover:text-brand-gold transition-colors">{product.name}</h4>
                <div className="flex items-center space-x-2">
                    {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                    <p className="text-sm font-medium text-brand-dark">₹{product.price.toLocaleString()}</p>
                </div>
                </div>
            ))}
            </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;