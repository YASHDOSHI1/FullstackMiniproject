
import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';

import heroBg from '../Assets/image1.png';

// ============================================================
// CONFIGURATION: HERO BACKGROUND IMAGE
// Replace the URL below with your local image path 
// Example: "/assets/images/my-vintage-car.jpg" or "./my-car.png"
// ============================================================
const HERO_BG_IMAGE = heroBg;

interface HomeProps {
  cars: Car[];
}

const Home: React.FC<HomeProps> = ({ cars }) => {
  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <div className="relative h-[700px] bg-slate-950 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_BG_IMAGE}
            className="w-full h-full object-cover opacity-40 scale-110"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent"></div>
          {/* Subtle overlay patterns */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-blue-600"></div>
              <h4 className="text-blue-500 font-black tracking-[0.5em] uppercase text-[10px]">Elite Automotive Portfolio</h4>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tighter uppercase italic">
              ENGINEERED <br />
              <span className="text-blue-600">FOR LEGENDS.</span>
            </h1>
            <p className="text-xl text-slate-400 mb-12 max-w-lg leading-relaxed font-medium">
              Access the world's most exclusive collection of historical assets. Each vehicle is a verified masterpiece of automotive engineering.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/cars" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-blue-900/40 hover:-translate-y-1 active:scale-95">
                Explore Registry
              </Link>
              <button className="group flex items-center gap-4 text-white font-black text-xs uppercase tracking-[0.2em] hover:text-blue-500 transition-colors">
                <span className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
                </span>
                The Story
              </button>
            </div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <div className="w-[1px] h-12 bg-white"></div>
          <span className="text-[8px] text-white font-black uppercase tracking-widest">Scroll</span>
        </div>
      </div>

      {/* Stats / Value Props */}
      <div className="bg-white border-b border-slate-100 relative z-20">
        <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Assets Verified", value: "100%" },
            { label: "Global Reach", value: "24/7" },
            { label: "Years of History", value: "80+" },
            { label: "Secure Escrow", value: "Direct" }
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left border-l border-slate-100 pl-8 first:border-l-0">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-950 italic">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Grid */}
      <div className="max-w-7xl mx-auto px-8 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] mb-2 block">Curated Selection</span>
            <h2 className="text-5xl font-black text-slate-950 tracking-tighter uppercase italic">Iconic <span className="text-blue-600">Specimens</span></h2>
          </div>
          <Link to="/cars" className="group flex items-center gap-3 text-slate-400 font-black hover:text-blue-600 transition text-[10px] uppercase tracking-[0.2em]">
            View All Archives
            <span className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {cars.map(car => (
            <div key={car.id} className="group bg-white rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.03)] overflow-hidden border border-slate-100 hover:-translate-y-3 transition-all duration-500">
              <div className="relative h-72 overflow-hidden">
                <img src={car.images[0]} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg italic">{car.year}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-10">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.3em] block">{car.brand}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-950 mb-8 tracking-tight uppercase italic leading-tight group-hover:text-blue-600 transition-colors">{car.name}</h3>
                <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Portfolio Value</p>
                    <span className="text-2xl font-black text-slate-950 leading-none">₹{(car.price / 100).toLocaleString('en-IN')}</span>
                  </div>
                  <Link to={`/cars/${car.id}`} className="bg-slate-950 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl shadow-slate-950/10 active:scale-90">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
