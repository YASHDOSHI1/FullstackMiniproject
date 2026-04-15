
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-500 py-24 px-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-8 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-white group-hover:rotate-12 transition-transform">C</div>
            <span className="text-2xl font-black text-white tracking-tighter italic uppercase">
              CLASSIC<span className="text-blue-500">DRIVE</span>
            </span>
          </Link>
          <p className="max-w-md leading-relaxed font-medium text-slate-400">
            Curating the finest collection of historical automobiles for the discerning modern collector. 
            We believe every car has a soul, and we're here to help you own a piece of it.
          </p>
        </div>
        <div>
          <h3 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8">The Collection</h3>
          <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
            <li><Link to="/cars" className="hover:text-blue-500 transition">Latest Inventory</Link></li>
            <li><a href="#" className="hover:text-blue-500 transition">Sell Your Asset</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Valuation Lab</a></li>
            <li><a href="#" className="hover:text-blue-500 transition">Concierge Support</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8">Connect</h3>
          <div className="flex space-x-4">
             <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 cursor-pointer transition-all duration-300 font-black italic">IG</div>
             <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 cursor-pointer transition-all duration-300 font-black italic">FB</div>
             <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white hover:bg-blue-600 hover:border-blue-500 cursor-pointer transition-all duration-300 font-black italic">TW</div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-20 pt-10 text-[10px] font-black uppercase tracking-[0.3em] text-center text-slate-700">
        &copy; 2024 ClassicDrive Global Marketplace. All Assets Secured. Private & Confidential Access Only.
      </div>
    </footer>
  );
};

export default Footer;
