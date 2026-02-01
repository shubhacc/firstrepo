import React from 'react';
import { Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white py-16" id="contact">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          
          <h5 className="text-sm font-bold tracking-widest mb-6 text-gray-400 uppercase">Connect With Us</h5>
          
          <a 
             href="https://www.instagram.com/jewellsofjoy19823?igsh=MWF6djJ1Z2h6M2V0ZA==" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-3 text-gray-300 hover:text-brand-gold transition-colors mb-8 group"
          >
             <div className="p-2 border border-gray-600 rounded-full group-hover:border-brand-gold transition-colors">
                <Instagram size={20} />
             </div>
             <span className="text-sm tracking-wide">Follow us on Instagram</span>
          </a>

        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-xs text-gray-500 font-light">
            &copy; {new Date().getFullYear()} Jewell of Joy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;