import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-brand-light relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-8">Our Story</h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto mb-10"></div>
            
            <div className="prose prose-lg mx-auto text-gray-600 font-light leading-relaxed">
                <p className="mb-8 text-xl italic text-gray-800">
                    "We design unique, handcrafted jewelry made with love, passion, and attention to detail. Every piece is thoughtfully created to reflect timeless beauty and modern elegance."
                </p>
                <p className="mb-8">
                    Our collection includes <strong className="text-gray-800">nath, necklaces, hair accessories, rings, pendants, bangles, invisible necklaces, nath bugadi sets, bracelets, mundavali, and mangalsutra</strong>, crafted to complement both traditional and contemporary styles.
                </p>
                <p className="font-medium text-brand-dark tracking-wide">
                    We believe jewelry is a personal expression—beautiful, meaningful, and made to be cherished.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default About;