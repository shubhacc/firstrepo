import React, { useState } from 'react';
import { ArrowLeft, Play, Phone, Send, X } from 'lucide-react';
import { useShop } from '../context';
import { getOptimizedImageUrl, isDriveVideo, getDriveVideoEmbedUrl } from '../utils';

const ProductDetail: React.FC = () => {
  const { activeProduct, closeProduct } = useShop();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  
  if (!activeProduct) return null;

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! Your inquiry has been sent. We will contact you shortly.");
    setShowInquiryModal(false);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Back Button */}
        <button 
            onClick={closeProduct}
            className="flex items-center text-gray-500 hover:text-brand-gold mb-8 transition-colors"
        >
            <ArrowLeft size={20} className="mr-2" /> Back to {activeProduct.category}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Gallery */}
            <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-square bg-gray-50 overflow-hidden rounded-sm relative">
                    <img 
                        src={getOptimizedImageUrl(activeProduct.images[selectedImage])} 
                        alt={activeProduct.name} 
                        className="w-full h-full object-contain md:object-cover"
                    />
                </div>
                
                {/* Thumbnail Strip */}
                {activeProduct.images.length > 1 && (
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {activeProduct.images.map((img, idx) => (
                            <button 
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`w-20 h-20 flex-shrink-0 border-2 ${selectedImage === idx ? 'border-brand-gold' : 'border-transparent'} hover:border-brand-gold transition-all`}
                            >
                                <img src={getOptimizedImageUrl(img)} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}

                {/* Video Section */}
                {activeProduct.videos && activeProduct.videos.length > 0 && (
                    <div className="mt-8 border-t pt-8">
                        <h3 className="text-lg font-serif mb-4 flex items-center"><Play size={18} className="mr-2"/> Product Videos</h3>
                        <div className="space-y-4">
                            {activeProduct.videos.map((videoUrl, idx) => (
                                <div key={idx} className="aspect-video bg-black rounded overflow-hidden">
                                     {isDriveVideo(videoUrl) ? (
                                         <iframe 
                                            src={getDriveVideoEmbedUrl(videoUrl)} 
                                            className="w-full h-full border-0" 
                                            allow="autoplay; fullscreen"
                                            title={`Product Video ${idx + 1}`}
                                         ></iframe>
                                     ) : (
                                         <video controls className="w-full h-full" src={videoUrl}>
                                            <source src={videoUrl} type="video/mp4" />
                                            Your browser does not support the video tag.
                                         </video>
                                     )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right: Details */}
            <div>
                <h1 className="text-3xl md:text-5xl font-serif text-brand-dark mb-4">{activeProduct.name}</h1>
                
                <div className="flex items-center space-x-4 mb-6">
                    <span className="text-2xl font-medium text-brand-gold">₹{activeProduct.price.toLocaleString()}</span>
                    {activeProduct.originalPrice && (
                         <span className="text-lg text-gray-400 line-through">₹{activeProduct.originalPrice.toLocaleString()}</span>
                    )}
                </div>

                <div className="prose text-gray-600 mb-8 font-light leading-relaxed">
                    <p>{activeProduct.description || "A masterpiece of craftsmanship, designed to elevate your elegance. This piece features intricate detailing and premium finish."}</p>
                </div>

                <div className="flex gap-4 mb-8">
                    <button 
                        onClick={() => setShowInquiryModal(true)}
                        className="flex-1 bg-brand-gold text-white py-4 px-8 uppercase tracking-widest text-sm font-bold hover:bg-yellow-700 transition-colors shadow-lg"
                    >
                        Interested? Inquire Now
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowInquiryModal(false)}></div>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative z-10 p-8">
                <button 
                    onClick={() => setShowInquiryModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-black"
                >
                    <X size={24} />
                </button>
                
                <h3 className="text-2xl font-serif text-brand-dark mb-2">Send Inquiry</h3>
                <p className="text-gray-500 text-sm mb-6">Enter your details and we will call you back regarding {activeProduct.name}.</p>
                
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Your Name</label>
                        <input required type="text" className="w-full p-3 border border-gray-300 rounded focus:border-brand-gold outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Phone Number</label>
                        <input required type="tel" className="w-full p-3 border border-gray-300 rounded focus:border-brand-gold outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Message</label>
                        <textarea className="w-full p-3 border border-gray-300 rounded focus:border-brand-gold outline-none" rows={3} defaultValue="I am interested in this product. Please share more details." />
                    </div>
                    <button type="submit" className="w-full bg-brand-dark text-white py-3 font-bold uppercase tracking-wide hover:bg-gray-800 transition">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetail;