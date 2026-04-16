import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, User, Order } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  user: User | null;
  onOrderSuccess: (order: Order) => void;
  onClearCart: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, user, onOrderSuccess, onClearCart }) => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'GPay' | 'Paytm'>('GPay');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const subtotal = cart.reduce((s, i) => s + (i.price * i.quantity), 0);
  const total = subtotal + 15000; // Appraisal fee in Rupees

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    
    setLoading(true);
    setTimeout(() => {
      const order: Order = {
        id: 'ACQ-' + Math.floor(100000 + Math.random() * 900000),
        userId: user.id,
        items: [...cart],
        totalAmount: total,
        status: 'Success',
        paymentMethod: method,
        date: new Date().toLocaleDateString()
      };
      onOrderSuccess(order);
      onClearCart();
      setLoading(false);
      setDone(true);
    }, 2500);
  };

  if (done) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center bg-slate-900 p-12 rounded-[50px] border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-blue-600 rounded-b-full"></div>
        <div className="bg-blue-600/20 text-blue-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-blue-900/40">
           <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-4xl font-black text-white mb-4 uppercase italic tracking-tighter">Acquisition Secured</h2>
        <p className="text-slate-500 font-medium mb-12">The asset has been logged into your private collection. Welcome to the elite.</p>
        <button 
          onClick={() => navigate('/')} 
          className="w-full bg-blue-600 text-white py-5 rounded-[20px] font-black uppercase tracking-widest hover:bg-blue-700 transition shadow-xl shadow-blue-900/20"
        >
          Return to Vault
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="flex-grow">
            <h1 className="text-5xl font-black text-slate-950 mb-12 uppercase italic tracking-tighter">Finalize <span className="text-blue-600">Entry</span></h1>
            
            <form onSubmit={handlePay} className="space-y-10">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs italic">P</div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Select Gateway</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button 
                    type="button"
                    onClick={() => setMethod('GPay')}
                    className={`flex items-center gap-4 p-6 border-2 rounded-[25px] transition-all duration-300 ${method === 'GPay' ? 'border-blue-600 bg-blue-50/50 shadow-lg' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${method === 'GPay' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>G</div>
                    <div className="text-left">
                      <p className="font-black text-slate-950 uppercase text-xs tracking-widest">Google Pay</p>
                      <p className="text-[10px] font-bold text-slate-400">Fast & Secure</p>
                    </div>
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => setMethod('Paytm')}
                    className={`flex items-center gap-4 p-6 border-2 rounded-[25px] transition-all duration-300 ${method === 'Paytm' ? 'border-blue-600 bg-blue-50/50 shadow-lg' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black ${method === 'Paytm' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>P</div>
                    <div className="text-left">
                      <p className="font-black text-slate-950 uppercase text-xs tracking-widest">Paytm UPI</p>
                      <p className="text-[10px] font-bold text-slate-400">Indian Standard</p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                 <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xs italic">U</div>
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Collector Info</h3>
                </div>
                <div className="space-y-4">
                   <input required type="text" placeholder="Shipping Destination" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-600 transition-all font-medium" />
                   <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="City" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-medium" />
                      <input required type="text" placeholder="PIN Code" className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-medium" />
                   </div>
                </div>
              </div>

              <button 
                disabled={loading}
                className="w-full bg-slate-950 text-white py-6 rounded-[30px] font-black text-sm uppercase tracking-[0.3em] hover:bg-blue-600 transition-all disabled:bg-slate-300 shadow-2xl shadow-slate-950/20 italic"
              >
                {loading ? 'AUTHENTICATING TRANSACTION...' : `AUTHORIZE ₹${total.toLocaleString('en-IN')}`}
              </button>
            </form>
          </div>

          <div className="w-full md:w-[400px]">
            <div className="bg-slate-950 text-white p-10 rounded-[50px] shadow-2xl border border-slate-800 sticky top-32">
              <h3 className="text-2xl font-black mb-8 border-b border-slate-800 pb-6 uppercase italic tracking-tighter">Acquisition List</h3>
              <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                       {/* Fix: Accessing images array instead of non-existent image property */}
                       <img src={item.images[0]} className="w-12 h-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                       <div>
                          <p className="font-black text-xs uppercase italic tracking-tight">{item.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">QTY: {item.quantity}</p>
                       </div>
                    </div>
                    <span className="text-sm font-black text-blue-500">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-6 border-t border-slate-800">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span>Valuation</span>
                  <span className="text-white">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span>Appraisal Fee</span>
                  <span className="text-white">₹{(15000).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between font-black text-2xl pt-6 text-white border-t border-slate-800/50">
                  <span className="italic uppercase tracking-tighter">Total</span>
                  <span className="text-blue-500">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;