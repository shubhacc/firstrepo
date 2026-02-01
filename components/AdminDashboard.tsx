import React, { useState, useEffect } from 'react';
import { useShop } from '../context';
import { Product, Category } from '../types';
import { Trash2, Edit2, Plus, X, Video, Image as ImageIcon, Link, Layers, Package } from 'lucide-react';
import { getOptimizedImageUrl } from '../utils';

const AdminDashboard: React.FC = () => {
  const { 
    products, categories, 
    addProduct, updateProduct, deleteProduct,
    addCategory, updateCategory, deleteCategory
  } = useShop();
  
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');

  // --- PRODUCT STATE ---
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const initialProductFormState = {
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    images: [''],
    videos: [] as string[],
    description: '',
  };
  const [productFormData, setProductFormData] = useState(initialProductFormState);

  // --- CATEGORY STATE ---
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const initialCategoryFormState = {
    name: '',
    image: '',
  };
  const [categoryFormData, setCategoryFormData] = useState(initialCategoryFormState);

  // Sync category for product form if categories load later or change
  useEffect(() => {
    if (categories.length > 0 && !productFormData.category && activeTab === 'products') {
        setProductFormData(prev => ({ ...prev, category: categories[0].name }));
    }
  }, [categories, activeTab, productFormData.category]);


  // ===================== PRODUCT HANDLERS =====================

  const handleArrayInput = (type: 'images' | 'videos', index: number, value: string) => {
    const newArray = [...(type === 'images' ? productFormData.images : productFormData.videos)];
    newArray[index] = value;
    setProductFormData({ ...productFormData, [type]: newArray });
  };

  const addArrayField = (type: 'images' | 'videos') => {
    setProductFormData({ ...productFormData, [type]: [...(type === 'images' ? productFormData.images : productFormData.videos), ''] });
  };

  const removeArrayField = (type: 'images' | 'videos', index: number) => {
    const currentArray = type === 'images' ? productFormData.images : productFormData.videos;
    if (currentArray.length === 1 && type === 'images') {
        handleArrayInput('images', 0, '');
        return;
    }
    const newArray = currentArray.filter((_, i) => i !== index);
    setProductFormData({ ...productFormData, [type]: newArray });
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validImages = productFormData.images.filter(url => url.trim() !== '');
    const validVideos = productFormData.videos.filter(url => url.trim() !== '');

    const productData = {
      name: productFormData.name,
      category: productFormData.category,
      price: parseFloat(productFormData.price),
      originalPrice: productFormData.originalPrice ? parseFloat(productFormData.originalPrice) : undefined,
      images: validImages.length > 0 ? validImages : ['https://picsum.photos/400/400'], 
      videos: validVideos,
      description: productFormData.description,
    };

    if (editingProduct) {
      updateProduct({ ...productData, id: editingProduct.id });
      setEditingProduct(null);
    } else {
      addProduct(productData);
    }
    setProductFormData({ ...initialProductFormState, category: productFormData.category });
  };

  const handleEditProductClick = (product: Product) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      images: product.images.length > 0 ? product.images : [''],
      videos: product.videos && product.videos.length > 0 ? product.videos : [],
      description: product.description || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  // ===================== CATEGORY HANDLERS =====================

  const handleCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const catData = {
        name: categoryFormData.name,
        image: categoryFormData.image || 'https://picsum.photos/seed/new/400/500' // Fallback
    };

    if (editingCategory) {
        updateCategory({ ...catData, id: editingCategory.id });
        setEditingCategory(null);
    } else {
        addCategory(catData);
    }
    setCategoryFormData(initialCategoryFormState);
  };

  const handleEditCategoryClick = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryFormData({
        name: cat.name,
        image: cat.image
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    if (activeTab === 'products') {
        setEditingProduct(null);
        setProductFormData(initialProductFormState);
    } else {
        setEditingCategory(null);
        setCategoryFormData(initialCategoryFormState);
    }
  };


  // ===================== RENDER =====================

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h1 className="text-4xl font-serif text-brand-dark">Admin Dashboard</h1>
            
            {/* Tab Switcher */}
            <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                <button 
                    onClick={() => setActiveTab('products')}
                    className={`flex items-center px-6 py-2 rounded-md transition-all text-sm font-bold uppercase tracking-wide ${activeTab === 'products' ? 'bg-brand-gold text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                    <Package size={16} className="mr-2" /> Products
                </button>
                <button 
                    onClick={() => setActiveTab('categories')}
                    className={`flex items-center px-6 py-2 rounded-md transition-all text-sm font-bold uppercase tracking-wide ${activeTab === 'categories' ? 'bg-brand-gold text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                    <Layers size={16} className="mr-2" /> Categories
                </button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
              
              {/* ------------ PRODUCT FORM ------------ */}
              {activeTab === 'products' && (
                  <>
                    <h2 className="text-xl font-bold mb-4 text-brand-dark flex items-center">
                        {editingProduct ? <Edit2 className="mr-2" size={20}/> : <Plus className="mr-2" size={20}/>}
                        {editingProduct ? 'Edit Product' : 'Add New Item'}
                    </h2>
                    
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                        <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category</label>
                        <select
                            className="w-full p-2 border border-gray-300 rounded focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none"
                            value={productFormData.category}
                            onChange={(e) => setProductFormData({...productFormData, category: e.target.value})}
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                        </div>

                        <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Product Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded focus:border-brand-gold outline-none"
                            value={productFormData.name}
                            onChange={(e) => setProductFormData({...productFormData, name: e.target.value})}
                            required
                        />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Price (₹)</label>
                            <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded focus:border-brand-gold outline-none"
                            value={productFormData.price}
                            onChange={(e) => setProductFormData({...productFormData, price: e.target.value})}
                            required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Old Price (₹)</label>
                            <input
                            type="number"
                            className="w-full p-2 border border-gray-300 rounded focus:border-brand-gold outline-none"
                            value={productFormData.originalPrice}
                            onChange={(e) => setProductFormData({...productFormData, originalPrice: e.target.value})}
                            placeholder="Optional"
                            />
                        </div>
                        </div>

                        {/* Images */}
                        <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1 flex items-center justify-between">
                            <span className="flex items-center"><ImageIcon size={14} className="mr-1" /> Image URLs</span>
                            <button type="button" onClick={() => addArrayField('images')} className="text-brand-gold text-xs hover:underline">+ Add URL</button>
                        </label>
                        <div className="space-y-2">
                            {productFormData.images.map((url, idx) => (
                                <div key={idx} className="flex gap-1">
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded focus:border-brand-gold outline-none text-sm"
                                        value={url}
                                        onChange={(e) => handleArrayInput('images', idx, e.target.value)}
                                        placeholder="Paste Drive Link or Image URL"
                                    />
                                    <button type="button" onClick={() => removeArrayField('images', idx)} className="text-gray-400 hover:text-red-500">
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        </div>

                        {/* Videos */}
                        <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1 flex items-center justify-between">
                            <span className="flex items-center"><Video size={14} className="mr-1" /> Video URLs</span>
                            <button type="button" onClick={() => addArrayField('videos')} className="text-brand-gold text-xs hover:underline">+ Add URL</button>
                        </label>
                        <div className="space-y-2">
                            {productFormData.videos.map((url, idx) => (
                                <div key={idx} className="flex gap-1">
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded focus:border-brand-gold outline-none text-sm"
                                        value={url}
                                        onChange={(e) => handleArrayInput('videos', idx, e.target.value)}
                                        placeholder="Paste Video URL"
                                    />
                                    <button type="button" onClick={() => removeArrayField('videos', idx)} className="text-gray-400 hover:text-red-500">
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                            {productFormData.videos.length === 0 && (
                                <button type="button" onClick={() => addArrayField('videos')} className="w-full py-2 border border-dashed border-gray-300 text-gray-400 text-xs rounded hover:border-brand-gold hover:text-brand-gold">
                                    + Add Video Link
                                </button>
                            )}
                        </div>
                        </div>
                        
                        <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Description</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded focus:border-brand-gold outline-none"
                            rows={3}
                            value={productFormData.description}
                            onChange={(e) => setProductFormData({...productFormData, description: e.target.value})}
                        />
                        </div>

                        <div className="pt-2 flex gap-2">
                        <button
                            type="submit"
                            className="flex-1 bg-brand-gold text-white py-3 rounded hover:bg-yellow-700 transition font-bold uppercase text-sm tracking-wide"
                        >
                            {editingProduct ? 'Update Item' : 'Add Item'}
                        </button>
                        {editingProduct && (
                            <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="px-4 py-3 border border-gray-300 rounded hover:bg-gray-100 transition"
                            >
                            <X size={20} />
                            </button>
                        )}
                        </div>
                    </form>
                  </>
              )}

              {/* ------------ CATEGORY FORM ------------ */}
              {activeTab === 'categories' && (
                  <>
                    <h2 className="text-xl font-bold mb-4 text-brand-dark flex items-center">
                        {editingCategory ? <Edit2 className="mr-2" size={20}/> : <Plus className="mr-2" size={20}/>}
                        {editingCategory ? 'Edit Category' : 'Add New Category'}
                    </h2>
                    
                    <form onSubmit={handleCategorySubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Category Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded focus:border-brand-gold outline-none"
                                value={categoryFormData.name}
                                onChange={(e) => setCategoryFormData({...categoryFormData, name: e.target.value})}
                                required
                                placeholder="e.g. Diamond Rings"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Cover Image</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full p-2 pr-10 border border-gray-300 rounded focus:border-brand-gold outline-none text-sm"
                                    value={categoryFormData.image}
                                    onChange={(e) => setCategoryFormData({...categoryFormData, image: e.target.value})}
                                    placeholder="Paste Image URL"
                                    required
                                />
                                <div className="absolute right-3 top-2 text-gray-400 pointer-events-none">
                                    <Link size={16} />
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-400 mt-1 italic">
                                Paste a link from Google Drive or any image hosting site.
                            </p>
                        </div>

                        {/* Image Preview for Category */}
                        {categoryFormData.image && (
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                                <div className="w-full h-48 bg-gray-100 rounded overflow-hidden">
                                    <img 
                                        src={getOptimizedImageUrl(categoryFormData.image)} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover" 
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="pt-2 flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 bg-brand-gold text-white py-3 rounded hover:bg-yellow-700 transition font-bold uppercase text-sm tracking-wide"
                            >
                                {editingCategory ? 'Update Category' : 'Save Category'}
                            </button>
                            {editingCategory && (
                                <button
                                type="button"
                                onClick={handleCancelEdit}
                                className="px-4 py-3 border border-gray-300 rounded hover:bg-gray-100 transition"
                                >
                                <X size={20} />
                                </button>
                            )}
                        </div>
                    </form>
                  </>
              )}

            </div>
          </div>

          {/* Right Column: List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
               
               {/* ------------ PRODUCT LIST ------------ */}
               {activeTab === 'products' && (
                   <>
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h2 className="font-bold text-gray-700">Product Inventory ({products.length})</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                                <tr>
                                <th className="p-4">Product</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="p-4 flex items-center space-x-3">
                                    <img src={getOptimizedImageUrl(product.images[0])} alt={product.name} className="w-12 h-12 object-cover rounded bg-gray-100" />
                                    <div>
                                        <p className="font-bold text-gray-800">{product.name}</p>
                                        <div className="flex gap-2 text-[10px] text-gray-400">
                                        <span>{product.images.length} img</span>
                                        </div>
                                    </div>
                                    </td>
                                    <td className="p-4 text-gray-600">{product.category}</td>
                                    <td className="p-4 font-medium">
                                    <div className="flex flex-col">
                                        <span>₹{product.price.toLocaleString()}</span>
                                    </div>
                                    </td>
                                    <td className="p-4 text-right">
                                    <div className="flex justify-end space-x-2">
                                        <button 
                                        onClick={() => handleEditProductClick(product)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                        title="Edit"
                                        >
                                        <Edit2 size={18} />
                                        </button>
                                        <button 
                                        onClick={() => deleteProduct(product.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                        title="Delete"
                                        >
                                        <Trash2 size={18} />
                                        </button>
                                    </div>
                                    </td>
                                </tr>
                                ))}
                                {products.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-8 text-center text-gray-400">
                                    No products found. Start adding some!
                                    </td>
                                </tr>
                                )}
                            </tbody>
                            </table>
                        </div>
                   </>
               )}

               {/* ------------ CATEGORY LIST ------------ */}
               {activeTab === 'categories' && (
                   <>
                        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                            <h2 className="font-bold text-gray-700">Categories ({categories.length})</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 uppercase font-medium">
                                <tr>
                                <th className="p-4">Cover Image</th>
                                <th className="p-4">Category Name</th>
                                <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        <img src={getOptimizedImageUrl(cat.image)} alt={cat.name} className="w-16 h-20 object-cover rounded bg-gray-100" />
                                    </td>
                                    <td className="p-4 font-bold text-gray-800 text-lg">
                                        {cat.name}
                                    </td>
                                    <td className="p-4 text-right">
                                    <div className="flex justify-end space-x-2">
                                        <button 
                                        onClick={() => handleEditCategoryClick(cat)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                        title="Edit"
                                        >
                                        <Edit2 size={18} />
                                        </button>
                                        <button 
                                        onClick={() => deleteCategory(cat.id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                                        title="Delete"
                                        >
                                        <Trash2 size={18} />
                                        </button>
                                    </div>
                                    </td>
                                </tr>
                                ))}
                                {categories.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-8 text-center text-gray-400">
                                    No categories found.
                                    </td>
                                </tr>
                                )}
                            </tbody>
                            </table>
                        </div>
                   </>
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;