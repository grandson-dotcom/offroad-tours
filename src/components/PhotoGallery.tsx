import React, { useState } from 'react';
import { PHOTO_GALLERY } from '../data/kenyaData';
import { Camera, MapPin, Sparkles, X, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PhotoGallery: React.FC = () => {
  const { setTab } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'Wildlife', label: '🦁 Big 5 Wildlife' },
    { id: 'Coast', label: '🏖️ Indian Ocean Beaches' },
    { id: 'Landscape', label: '🌋 Rift Valley & Mountains' },
    { id: 'Culture', label: '🎭 Culture & People' }
  ];

  const filteredPhotos = PHOTO_GALLERY.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <section id="gallery-section" className="py-16 bg-stone-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Exploration</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            Kenya In Pictures
          </h2>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            High-resolution visual journey across savanna migrations, turquoise coral reefs, volcanic escarpments, and vibrant traditions.
          </p>
        </div>

        {/* Categories */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-amber-500 text-stone-950 shadow-lg'
                  : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Gallery Masonry/Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-stone-900 border border-stone-800 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  📍 {photo.location}
                </span>
                <h4 className="font-serif font-bold text-base text-white">{photo.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl relative">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-stone-950/80 text-white flex items-center justify-center hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-400 font-bold">📍 {selectedPhoto.location}</span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">{selectedPhoto.title}</h3>
              </div>
              <button
                onClick={() => {
                  setSelectedPhoto(null);
                  setTab('safaris');
                }}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs px-5 py-2.5 rounded-xl shadow"
              >
                Find Tours Here
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
