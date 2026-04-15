import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQty, onRemove }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const appraisalFee = 1500000; // Simplified consistent value

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-32 flex flex-col items-center px-6">
        <div className="w-32 h-32 bg-slate-100 rounded-[40px] flex items-center justify-center mb-10 text-slate-300">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        </div>
        <h2 className="text-4xl font-black text-slate-950 mb-4 tracking-tighter uppercase italic">Registry Empty</h2>
        <p className="text-slate-500 mb-12 max-w-sm text-center font-medium">Your private portfolio currently contains no pending acquisitions.</p>
        <Link to="/cars" className="bg-blue-600 text-white px-12 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20">
          Explore Gallery
        </Link>
      </div>
    );
  }

  return (
    <div className="py-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
           <div>
              <span className="text-blue-600 font-black tracking-[0.4em] uppercase text-[10px] block mb-2">Private Collection</span>
              <h1 className="text-5xl font-black text-slate-950 tracking-tighter uppercase italic">Pending Assets</h1>
           </div>
           <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest bg-white px-4 py-2 rounded-full border border-slate-100 shadow-sm">{items.length} Masterpiece(s) Selected</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-8">
            {items.map(item => (
              <div key={item.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row gap-8 relative group">
                <button 
                  onClick={() => onRemove(item.id)}
                  className="absolute top-8 right-8 text-slate-300 hover:text-red-500 transition-colors bg-slate-50 p-2 rounded-xl"
                  title="Remove from Acquisition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
                
                <div className="w-full sm:w-64 h-44 flex-shrink-0 rounded-[30px] overflow-hidden shadow-lg group-hover:scale-[1.02] transition-transform duration-500 border-4 border-slate-50">
                  {/* Fix: Accessing images array instead of non-existent image property */}
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow flex flex-col">
                  <div className="mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-blue-600 font-black">{item.brand} Registry</span>
                    <h3 className="text-2xl font-black text-slate-950 mt-1 uppercase italic tracking-tight">{item.name}</h3>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-end pt-8 border-t border-slate-50">
                    <div className="flex flex-col gap-2">
                       <span className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400">Quantity</span>
                       <div className="flex items-center bg-slate-50 rounded-2xl overflow-hidden w-fit border border-slate-100 p-1">
                          <button 
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-950 hover:text-white text-slate-600 transition-colors font-black"
                          >-</button>
                          <span className="px-6 py-2 text-xs font-black text-slate-900">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-blue-600 hover:text-white text-slate-600 transition-colors font-black"
                          >+</button>
                        </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400 mb-1">Asset Value</p>
                       <p className="text-2xl font-black text-slate-950 leading-none tracking-tighter">₹{(item.price * item.quantity / 100).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-10 rounded-[40px] shadow-2xl h-fit sticky top-32 text-white border border-slate-800">
            <h3 className="text-2xl font-black text-white mb-10 border-b border-slate-800 pb-6 tracking-tighter uppercase italic">Portfolio Summary</h3>
            <div className="space-y-6 mb-12">
              <div className="flex justify-between items-center text-sm font-medium text-slate-400">
                <span className="uppercase tracking-widest text-[10px]">Asset Subtotal</span>
                <span className="text-white font-bold">₹{(subtotal / 100).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium text-slate-400">
                <span className="uppercase tracking-widest text-[10px]">Appraisal Fee</span>
                <span className="text-white font-bold">₹{(appraisalFee / 100).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center text-sm font-medium text-slate-400">
                <span className="uppercase tracking-widest text-[10px]">Secure Logistics</span>
                <span className="text-blue-400 font-black uppercase tracking-widest text-[9px]">Included</span>
              </div>
              <div className="pt-8 border-t border-slate-800 flex justify-between items-end">
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-slate-500 leading-none mb-1">Acquisition Total</span>
                <span className="text-3xl font-black text-white leading-none tracking-tighter italic">₹{((subtotal + appraisalFee) / 100).toLocaleString('en-IN')}</span>
              </div>
            </div>
            
            <Link to="/checkout" className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.3em] block text-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 hover:-translate-y-1">
              Finalize Acquisition
            </Link>
            
            <div className="mt-10 pt-10 border-t border-slate-800 text-center">
               <div className="flex justify-center gap-6 mb-6 opacity-20">
                  <div className="w-10 h-6 bg-slate-700 rounded-md"></div>
                  <div className="w-10 h-6 bg-slate-700 rounded-md"></div>
                  <div className="w-10 h-6 bg-slate-700 rounded-md"></div>
               </div>
               <p className="text-[9px] text-slate-500 uppercase font-bold tracking-[0.2em] leading-relaxed">
                 Encrypted transaction environment <br /> Secured by Global Escrow Services
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;