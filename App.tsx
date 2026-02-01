import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import About from './components/About';
import { ShopProvider, useShop } from './context';

const MainContent: React.FC = () => {
  const { isAdmin, activeProduct } = useShop();

  // Admin View
  if (isAdmin) {
    return (
      <div className="font-sans antialiased text-brand-text bg-white min-h-screen flex flex-col pt-16">
        <Navbar />
        <AdminDashboard />
      </div>
    );
  }

  // Product Detail View
  if (activeProduct) {
    return (
        <div className="font-sans antialiased text-brand-text bg-white min-h-screen flex flex-col">
          <Navbar />
          <ProductDetail />
          <Footer />
        </div>
    );
  }

  // Standard Home View
  return (
    <div className="font-sans antialiased text-brand-text bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CategoryGrid />
        <ProductList />
        <About />
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
};

export default App;