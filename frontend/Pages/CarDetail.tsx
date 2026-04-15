
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Car } from '../types';

interface CarDetailProps {
  cars: Car[];
  onAddToCart: (car: Car) => void;
}

const CarDetail: React.FC<CarDetailProps> = ({ cars, onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const car = cars.find(c => c.id === id);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    if (car) {
      window.scrollTo(0, 0);
      setActiveImageIdx(0);
    }
  }, [car]);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <h2 className="text-4xl font-black mb-6 italic uppercase">Vehicle Not Found</h2>
          <Link to="/cars" className="bg-blue-600 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition">Back to Registry</Link>
        </div>
      </div>
    );
  }

  const specs = [
    { label: 'Manufacture', value: car.brand, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg> },
    { label: 'Production', value: car.production, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> },
    { label: 'Class', value: car.carClass, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg> },
    { label: 'Body Style', value: car.bodyStyle, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg> },
    { label: 'Fuel Feed', value: car.fuelFeed, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg> },
    { label: 'Weight', value: car.weight, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg> },
    { label: 'Top Speed', value: car.topSpeed, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> },
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="mb-10">
           <Link to="/cars" className="group inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              <span className="text-xs font-black uppercase tracking-widest">Back to Inventory</span>
            </Link>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery Section */}
          <div className="sticky top-24 h-fit space-y-6">
            <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-white aspect-[4/3] relative group">
              <img src={car.images[activeImageIdx]} alt={car.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Authentic Archive</p>
                <p className="text-2xl font-black uppercase italic tracking-tighter leading-none">{car.name}</p>
              </div>
            </div>
            
            {/* Thumbnails */}
            {car.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {car.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImageIdx(idx)}
                    className={`flex-shrink-0 w-24 h-18 rounded-2xl overflow-hidden border-4 transition-all ${activeImageIdx === idx ? 'border-blue-600' : 'border-white hover:border-blue-100'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Thumbnail ${idx}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-12">
              <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs mb-3 block">Global Automotive Registry</span>
              <h1 className="text-6xl font-black text-slate-950 leading-none tracking-tighter uppercase italic mb-6">{car.name}</h1>
              <div className="flex items-center gap-4">
                <p className="text-4xl font-black text-slate-900">₹{(car.price / 100).toLocaleString('en-IN')}</p>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Price on Request</span>
              </div>
            </div>

            {/* TECHNICAL DATA SHEET */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
                <h3 className="text-xs font-black text-slate-950 uppercase tracking-[0.3em]">Technical Specifications</h3>
                <span className="text-[10px] font-bold text-slate-400">Spec-Ref: CD-A-{car.id}</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {specs.map((spec, idx) => (
                  <div key={idx} className="group flex items-center p-5 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all hover:border-blue-200 hover:shadow-lg hover:-translate-y-1">
                    <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {spec.icon}
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{spec.label}</p>
                      <p className="text-sm font-black text-slate-950 uppercase italic group-hover:text-blue-600 transition-colors">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DYNAMIC MULTI-SECTION CONTENT */}
            <div className="space-y-12 mb-12">
              {car.sections.map((section, idx) => (
                <div key={idx} className="border-l-4 border-blue-600 pl-8 py-2">
                  <h3 className="text-xs font-black text-slate-950 uppercase tracking-[0.3em] mb-4">{section.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium text-lg">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => onAddToCart(car)}
              className="w-full bg-slate-950 text-white py-7 rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-4 shadow-xl shadow-slate-900/10 active:scale-95 italic"
            >
              Add to Collection Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
