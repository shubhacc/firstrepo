import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[600px] md:h-[800px] bg-gray-100 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://picsum.photos/id/331/1920/1080")', // Using picsum as placeholder
          filter: 'brightness(0.9)'
        }}
      ></div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-xl text-white">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight drop-shadow-md">
              Crafted Heritage.<br />
              <span className="italic font-light">Wear Your Story.</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 font-light text-gray-100 drop-shadow-sm">
              Discover timeless pieces designed to celebrate your unique journey.
            </p>
            <button className="bg-brand-gold text-white px-8 py-3 tracking-[0.2em] text-sm hover:bg-yellow-700 transition-colors duration-300 font-medium uppercase">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;