import React, { useState, useEffect } from 'react';
import { Menu, X, UserCog } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useShop } from '../context';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleAdmin, isAdmin, goHome } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, item: { label: string, href: string }) => {
    if (item.label === 'HOME') {
        e.preventDefault();
        goHome();
        setIsMobileMenuOpen(false);
    } else if (item.label === 'ABOUT') {
        e.preventDefault();
        goHome(); // Ensure we are on the main view so About component is rendered
        setIsMobileMenuOpen(false);
        // Wait for render cycle to complete so the element exists
        setTimeout(() => {
            const element = document.getElementById('about');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    } else if (item.href.startsWith('http')) {
        // Let external links work normally (browser handles redirect)
        setIsMobileMenuOpen(false);
    } else {
        setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isAdmin ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div 
            className="text-2xl md:text-3xl font-serif font-bold tracking-widest text-brand-text cursor-pointer" 
            onClick={() => isAdmin ? toggleAdmin() : goHome()}
        >
          <span className="text-brand-gold">JEWELL</span> OF <span className="text-brand-gold">JOY</span>
          {isAdmin && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded ml-2 align-middle tracking-normal font-sans">ADMIN</span>}
        </div>

        {/* Desktop Menu */}
        {!isAdmin && (
            <div className="hidden md:flex items-center space-x-12">
            {NAV_ITEMS.map((item) => (
                <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? "_blank" : "_self"}
                rel={item.href.startsWith('http') ? "noopener noreferrer" : ""}
                onClick={(e) => handleNavClick(e, item)}
                className="text-sm tracking-[0.2em] text-gray-600 hover:text-brand-gold transition-colors font-medium uppercase"
                >
                {item.label}
                </a>
            ))}
            </div>
        )}

        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-700">
          <button 
            className={`flex items-center space-x-1 hover:text-brand-gold transition-colors ${isAdmin ? 'text-brand-gold' : ''}`}
            onClick={toggleAdmin}
            title="Toggle Admin Mode"
          >
            <UserCog size={20} />
          </button>
          
          {!isAdmin && (
            <>
                <button 
                    className="md:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && !isAdmin && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg p-6 flex flex-col space-y-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('http') ? "_blank" : "_self"}
              rel={item.href.startsWith('http') ? "noopener noreferrer" : ""}
              className="text-sm tracking-widest text-gray-600 hover:text-brand-gold"
              onClick={(e) => handleNavClick(e, item)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;