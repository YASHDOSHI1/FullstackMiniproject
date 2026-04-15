
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';

interface CarListingProps {
  cars: Car[];
  onAddToCart: (car: Car) => void;
}

const CarListing: React.FC<CarListingProps> = ({ cars, onAddToCart }) => {
  const [query, setQuery] = useState('');

  const filtered = cars.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) || 
    c.brand.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">The Registry</h1>
          <p className="text-slate-500 font-medium">Browse our full archival collection.</p>
        </div>
        <div className="relative w-full md:w-[400px]">
          <input 
            type="text" 
            placeholder="Search by model or era..." 
            className="w-full p-4 pl-12 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <svg className="w-5 h-5 absolute left-4 top-4.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filtered.map(car => (
          <div key={car.id} className="group bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden">
            <div className="relative h-60 overflow-hidden">
              <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors"></div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 leading-none mb-1 tracking-tight uppercase italic">{car.name}</h2>
                  <p className="text-xs font-bold text-slate-400 tracking-widest">{car.brand.toUpperCase()} • {car.year}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-blue-600">₹{(car.price / 100).toLocaleString('en-IN')}</p>
                </div>
              </div>
              <div className="mt-auto pt-8 flex gap-3">
                <Link to={`/cars/${car.id}`} className="flex-grow text-center bg-slate-50 py-3.5 rounded-2xl font-bold hover:bg-slate-100 transition text-sm text-slate-600">VIEW SPECS</Link>
                <button 
                  onClick={() => onAddToCart(car)} 
                  className="bg-blue-600 text-white px-6 py-3.5 rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-900/20 active:scale-95"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200">
           <svg className="w-16 h-16 text-slate-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           <h3 className="text-xl font-bold text-slate-400">No vehicles found in archives.</h3>
        </div>
      )}
    </div>
  );
};

export default CarListing;
