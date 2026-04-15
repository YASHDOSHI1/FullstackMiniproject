
import React, { useState } from 'react';
import { Car, Order, User, CarSection } from '../types';

interface AdminDashboardProps {
  cars: Car[];
  orders: Order[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  user: User | null;
}

import { api } from '../services/api';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ cars, orders, setCars, user }) => {
  // ... existing state ...

  const handleSaveCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please upload at least one image for the vehicle.");
      return;
    }

    const carData = { ...newCar, sections, images } as Car;

    try {
      if (editingCarId) {
        const updated = await api.updateCar(editingCarId, carData);
        setCars(prev => prev.map(c => c.id === editingCarId ? updated : c));
      } else {
        const created = await api.createCar(carData);
        setCars(prev => [...prev, created]);
      }
      setShowForm(false);
      resetForm();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const deleteCar = async (id: string) => {
    if (window.confirm("Delete this vehicle from the registry?")) {
      try {
        await api.deleteCar(id);
        setCars(cars.filter(c => c.id !== id));
      } catch (err: any) {
        alert(err.message);
      }
    }
  };


  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">Inventory Control</h1>
            <p className="text-slate-500 font-medium">Manage the global archive of classic assets.</p>
          </div>
          <button 
            onClick={() => { resetForm(); setShowForm(true); }}
            className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition flex items-center gap-2 font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-900/20"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Register Car
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-4">Live Inventory</h2>
            <div className="grid gap-4">
              {cars.map(car => (
                <div key={car.id} className="bg-white p-6 rounded-[25px] border border-slate-100 flex items-center gap-6 shadow-sm group hover:border-blue-200 transition-all">
                  <img src={car.images[0]} className="w-24 h-24 object-cover rounded-2xl" alt={car.name} />
                  <div className="flex-grow">
                    <h3 className="font-black text-slate-950 uppercase italic tracking-tight">{car.name}</h3>
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mt-1">{car.brand} • {car.year}</p>
                    <p className="text-sm font-medium text-slate-400 mt-2">₹{(car.price / 100).toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(car)} className="p-3 text-slate-400 hover:text-blue-600 transition">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button onClick={() => deleteCar(car.id)} className="p-3 text-slate-400 hover:text-red-500 transition">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b pb-4 mb-6">Recent Sales</h2>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="p-10 bg-white rounded-[30px] border border-dashed border-slate-200 text-center text-slate-400 text-sm font-medium">No activity.</div>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="bg-slate-950 p-6 rounded-[30px] shadow-sm text-sm text-white border border-slate-800">
                    <div className="flex justify-between mb-4">
                      <span className="font-black text-blue-500 tracking-tighter">{order.id}</span>
                      <span className="text-[10px] font-black uppercase bg-blue-600/20 text-blue-400 px-2 py-1 rounded">PAID</span>
                    </div>
                    <p className="font-black text-lg mb-1 italic">₹{(order.totalAmount / 100).toLocaleString('en-IN')}</p>
                    <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest">{order.paymentMethod} • {order.date}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white max-w-4xl w-full p-10 rounded-[40px] shadow-2xl overflow-y-auto max-h-[90vh] border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-slate-950 uppercase italic tracking-tighter">
                {editingCarId ? 'Update Registry Entry' : 'New Registry Entry'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-950 transition">✕</button>
            </div>
            <form onSubmit={handleSaveCar} className="space-y-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-2">Vehicle Name</label>
                  <input required placeholder="1965 Aston Martin DB5" className="w-full border p-4 rounded-2xl bg-slate-50 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium" value={newCar.name} onChange={e => setNewCar({...newCar, name: e.target.value})} />
                </div>
                <div><label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Manufacture</label><input required className="w-full border p-4 rounded-2xl bg-slate-50" value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value})} /></div>
                <div><label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Production</label><input required className="w-full border p-4 rounded-2xl bg-slate-50" value={newCar.production} onChange={e => setNewCar({...newCar, production: e.target.value})} /></div>
                <div><label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Class</label><input required className="w-full border p-4 rounded-2xl bg-slate-50" value={newCar.carClass} onChange={e => setNewCar({...newCar, carClass: e.target.value})} /></div>
                <div><label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Body Style</label><input required className="w-full border p-4 rounded-2xl bg-slate-50" value={newCar.bodyStyle} onChange={e => setNewCar({...newCar, bodyStyle: e.target.value})} /></div>
                <div><label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fuel Feed</label><input required className="w-full border p-4 rounded-2xl bg-slate-50" value={newCar.fuelFeed} onChange={e => setNewCar({...newCar, fuelFeed: e.target.value})} /></div>
                <div><label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weight</label><input required className="w-full border p-4 rounded-2xl bg-slate-50" value={newCar.weight} onChange={e => setNewCar({...newCar, weight: e.target.value})} /></div>
                <div><label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Top Speed</label><input required className="w-full border p-4 rounded-2xl bg-slate-50" value={newCar.topSpeed} onChange={e => setNewCar({...newCar, topSpeed: e.target.value})} /></div>
                <div><label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price (Paise)</label><input required type="number" className="w-full border p-4 rounded-2xl bg-slate-50" value={newCar.price} onChange={e => setNewCar({...newCar, price: parseInt(e.target.value)})} /></div>
                
                {/* MULTI-IMAGE UPLOAD */}
                <div className="col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Vehicle Gallery (Multiple Uploads Allowed)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <label className="cursor-pointer bg-slate-50 hover:bg-slate-100 border-2 border-dashed border-slate-200 rounded-[30px] aspect-[4/3] flex flex-col items-center justify-center transition-all group">
                      <svg className="w-8 h-8 text-slate-300 group-hover:text-blue-600 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Add Device Photo</span>
                      <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-[4/3] rounded-[30px] overflow-hidden group shadow-sm border border-slate-100">
                        <img src={img} className="w-full h-full object-cover" alt={`Preview ${idx}`} />
                        <button 
                          type="button" 
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* DYNAMIC SECTIONS UI */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-4">
                  <h4 className="text-xs font-black text-slate-950 uppercase tracking-[0.3em]">Content Sections</h4>
                  <button type="button" onClick={handleAddSection} className="text-blue-600 font-black text-[10px] uppercase tracking-widest hover:text-blue-800">+ Add Section</button>
                </div>
                {sections.map((sec, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-[30px] space-y-4 relative group">
                    <button type="button" onClick={() => handleRemoveSection(i)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500">✕</button>
                    <input required placeholder="Section Title (e.g., History)" className="w-full border p-4 rounded-xl bg-white font-bold" value={sec.title} onChange={e => handleSectionChange(i, 'title', e.target.value)} />
                    <textarea required placeholder="Section Content" className="w-full border p-4 rounded-xl bg-white h-24 font-medium" value={sec.content} onChange={e => handleSectionChange(i, 'content', e.target.value)} />
                  </div>
                ))}
              </div>

              <button type="submit" className="w-full bg-slate-950 text-white py-5 rounded-full font-black uppercase tracking-widest hover:bg-blue-600 transition shadow-xl shadow-blue-900/10 italic">
                {editingCarId ? 'Update Registration' : 'Finalize Registration'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
