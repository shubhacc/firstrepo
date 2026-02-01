import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, Category } from './types';
import { FEATURED_PRODUCTS, CATEGORIES } from './constants';

interface ShopContextType {
  products: Product[];
  categories: Category[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number | string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: number | string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
  activeProduct: Product | null;
  viewProduct: (product: Product) => void;
  closeProduct: () => void;
  goHome: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize products from LocalStorage or fallback to default
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedProducts = localStorage.getItem('joj_products');
      return savedProducts ? JSON.parse(savedProducts) : FEATURED_PRODUCTS;
    } catch (error) {
      console.error("Failed to load products from storage", error);
      return FEATURED_PRODUCTS;
    }
  });

  // Initialize categories from LocalStorage or fallback to default
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const savedCategories = localStorage.getItem('joj_categories');
      return savedCategories ? JSON.parse(savedCategories) : CATEGORIES;
    } catch (error) {
      console.error("Failed to load categories from storage", error);
      return CATEGORIES;
    }
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Save to LocalStorage whenever products change
  useEffect(() => {
    localStorage.setItem('joj_products', JSON.stringify(products));
  }, [products]);

  // Save to LocalStorage whenever categories change
  useEffect(() => {
    localStorage.setItem('joj_categories', JSON.stringify(categories));
  }, [categories]);

  // --- Product Actions ---
  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product = {
      ...newProduct,
      id: Date.now().toString(), // Simple ID generation
    };
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id: number | string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // --- Category Actions ---
  const addCategory = (newCategory: Omit<Category, 'id'>) => {
    const category = {
        ...newCategory,
        id: Date.now().toString(),
    };
    setCategories(prev => [...prev, category]);
  };

  const updateCategory = (updatedCategory: Category) => {
    setCategories((prevCategories) => {
      // Find old category to check for name change
      const oldCategory = prevCategories.find(c => c.id === updatedCategory.id);
      
      // If name changed, update all associated products
      if (oldCategory && oldCategory.name !== updatedCategory.name) {
         setProducts(prevProducts => prevProducts.map(p => 
            p.category === oldCategory.name ? { ...p, category: updatedCategory.name } : p
         ));
      }

      return prevCategories.map((c) => (c.id === updatedCategory.id ? updatedCategory : c));
    });
  };

  const deleteCategory = (id: number | string) => {
    // Optional: Prevent deletion if products exist, or just allow it (orphaning products)
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleAdmin = () => setIsAdmin((prev) => !prev);

  const viewProduct = (product: Product) => {
    setActiveProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeProduct = () => {
    setActiveProduct(null);
  };

  const handleSetCategory = (cat: string | null) => {
    setSelectedCategory(cat);
    setActiveProduct(null); // Close detail view if changing category
  };

  const goHome = () => {
    setSelectedCategory(null);
    setActiveProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        selectedCategory,
        setSelectedCategory: handleSetCategory,
        isAdmin,
        toggleAdmin,
        activeProduct,
        viewProduct,
        closeProduct,
        goHome
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};