import React from 'react';

const MosaicGrid: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[350px]">
          
          {/* Item 1: Product Focus */}
          <div className="col-span-1 bg-gray-50 flex flex-col items-center justify-center p-6 text-center border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative group">
             <span className="absolute top-4 text-xs tracking-[0.2em] text-gray-400 font-medium">CATEGORY</span>
             <h3 className="text-2xl font-serif text-brand-dark mb-4 group-hover:text-brand-gold transition-colors">RINGS</h3>
             <img 
               src="https://picsum.photos/id/157/200/200" 
               alt="Rings" 
               className="w-32 h-32 object-cover rounded-full shadow-md mt-2 transform group-hover:scale-110 transition-transform duration-500"
             />
          </div>

          {/* Item 2: Lifestyle Image */}
          <div className="col-span-1 relative overflow-hidden group">
            <img 
              src="https://picsum.photos/id/342/400/600" 
              alt="Lifestyle" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
          </div>

          {/* Item 3: Text Box - Engagement */}
          <div className="col-span-1 bg-white flex items-center justify-center p-8 text-center border border-gray-100 hover:border-brand-gold transition-colors cursor-pointer group">
            <div>
               <h3 className="text-xl md:text-2xl font-serif text-brand-dark group-hover:text-brand-gold transition-colors tracking-widest">ENGAGEMENT</h3>
               <div className="w-12 h-0.5 bg-gray-300 mx-auto mt-4 group-hover:w-24 bg-brand-gold transition-all duration-300"></div>
            </div>
          </div>

          {/* Item 4: Text Box - Gifts */}
          <div className="col-span-1 bg-gray-50 flex items-center justify-center p-8 text-center border border-gray-100 hover:border-brand-gold transition-colors cursor-pointer group">
             <div>
               <h3 className="text-xl md:text-2xl font-serif text-brand-dark group-hover:text-brand-gold transition-colors tracking-widest">GIFTS</h3>
               <p className="text-xs text-gray-500 mt-2 font-sans tracking-wide">FOR EVERY OCCASION</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MosaicGrid;