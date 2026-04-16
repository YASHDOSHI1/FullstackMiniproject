import React, { useState } from 'react';
import { Car, Order, User, CarSection } from '../types';
import { api } from '../services/api';

interface AdminDashboardProps {
  cars: Car[];
  orders: Order[];
  setCars: React.Dispatch<React.SetStateAction<Car[]>>;
  user: User | null;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ cars, orders, setCars, user }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [sections, setSections] = useState<CarSection[]>([{ title: '', content: '' }]);
  const [images, setImages] = useState<string[]>([]);
  const [newCar, setNewCar] = useState<Partial<Car>>({
    name: '', brand: '', year: 2024, price: 0,
    production: '', carClass: '', bodyStyle: '', fuelFeed: '', weight: '', topSpeed: ''
  });

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m0 0v2m0-2h2m-2 0H10m11 3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Access Denied</h1>
        <p className="text-slate-500 font-medium max-w-md">You do not have the required security clearing to access the global archive.</p>
      </div>
    );
  }

  const resetForm = () => {
    setNewCar({ 
      name: '', brand: '', year: 2024, price: 0,
      production: '', carClass: '', bodyStyle: '', fuelFeed: '', weight: '', topSpeed: '' 
    });
    setSections([{ title: '', content: '' }]);
    setImages([]);
    setEditingCarId(null);
  };

  const handleEdit = (car: Car) => {
    setNewCar({ ...car });
    setSections([...car.sections]);
    setImages([...car.images]);
    setEditingCarId(car.id);
    setShowForm(true);
  };

  const handleAddSection = () => setSections([...sections, { title: '', content: '' }]);
  const handleRemoveSection = (idx: number) => setSections(sections.filter((_, i) => i !== idx));
  const handleSectionChange = (idx: number, field: keyof CarSection, val: string) => {
    const updated = [...sections];
    updated[idx][field] = val;
    setSections(updated);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h1 className="text-4xl font-black text-slate-950 uppercase italic tracking-tighter">Inventory Control</h1>
            <p className="text-slate-500 font-medium">Manage the global archive of classic assets.</p>
          </div>
          <button 
            onClick={() => { resetForm(); setShowForm(true); }}
            className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 transition flex items-center gap-2 font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-900/20 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Register New Vehicle
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-4">Live Inventory</h2>
            <div className="grid gap-4">
              {cars.map(car => (
                <div key={car.id} className="bg-white p-6 rounded-[30px] border border-slate-100 flex flex-col md:flex-row items-center gap-6 shadow-sm group hover:border-blue-200 transition-all">
                  <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100">
                    <img src={car.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={car.name} />
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="font-black text-slate-950 uppercase italic tracking-tight text-lg">{car.name}</h3>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-1">
                       <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">{car.brand}</span>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded">{car.year}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-center">
                    <div className="text-right">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Value</p>
                      <p className="font-black text-slate-950">₹{(car.price / 100).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button onClick={() => handleEdit(car)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      </button>
                      <button onClick={() => deleteCar(car.id)} className="w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 pb-4">Recent Activity</h2>
            <div className="space-y-4">
              {orders.length === 0 ? (
                <div className="p-10 bg-white rounded-[40px] border border-dashed border-slate-200 text-center">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                  </div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No recent transactions</p>
                </div>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="bg-slate-950 p-6 rounded-[35px] shadow-sm text-sm text-white border border-slate-800">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-black text-blue-500 tracking-tighter uppercase italic">{order.id}</span>
                      <span className="text-[9px] font-black uppercase bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full">PAID</span>
                    </div>
                    <div className="mb-4">
                      <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mb-1">Transaction Total</p>
                      <p className="font-black text-2xl tracking-tighter italic">₹{(order.totalAmount / 100).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-800 pt-4 mt-4">
                      <span className="text-[10px] uppercase font-black text-slate-500">{order.paymentMethod}</span>
                      <span className="text-[10px] uppercase font-black text-slate-500">{order.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-50 flex items-center justify-center p-6">
          <div className="bg-white max-w-5xl w-full p-10 rounded-[50px] shadow-2xl overflow-y-auto max-h-[90vh] border border-slate-100 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-8 right-8 w-10 h-10 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center hover:bg-slate-100 hover:text-slate-950 transition-all z-10">✕</button>
            
            <div className="mb-12">
              <h3 className="text-3xl font-black text-slate-950 uppercase italic tracking-tighter">
                {editingCarId ? 'Update Registry' : 'New Registration'}
              </h3>
              <p className="text-slate-500 font-medium">Define the specifications for the vintage asset.</p>
            </div>

            <form onSubmit={handleSaveCar} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Vehicle Name</label>
                  <input required placeholder="e.g. 1965 Aston Martin DB5" className="w-full border-none p-5 rounded-3xl bg-slate-50 focus:ring-4 focus:ring-blue-500/10 focus:bg-white outline-none transition-all font-bold text-lg" value={newCar.name} onChange={e => setNewCar({...newCar, name: e.target.value})} />
                </div>
                
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Manufacturer</label>
                  <input required placeholder="e.g. Ford" className="w-full border-none p-5 rounded-3xl bg-slate-50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold" value={newCar.brand} onChange={e => setNewCar({...newCar, brand: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Model Year</label>
                  <input required type="number" className="w-full border-none p-5 rounded-3xl bg-slate-50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold" value={newCar.year} onChange={e => setNewCar({...newCar, year: parseInt(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">Price (Paise)</label>
                  <input required type="number" placeholder="Value in paise" className="w-full border-none p-5 rounded-3xl bg-slate-50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-bold" value={newCar.price} onChange={e => setNewCar({...newCar, price: parseInt(e.target.value)})} />
                </div>

                <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-[40px]">
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Production</label>
                    <input required className="w-full bg-white border-none p-3 rounded-2xl text-xs font-bold" value={newCar.production} onChange={e => setNewCar({...newCar, production: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Car Class</label>
                    <input required className="w-full bg-white border-none p-3 rounded-2xl text-xs font-bold" value={newCar.carClass} onChange={e => setNewCar({...newCar, carClass: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Body Style</label>
                    <input required className="w-full bg-white border-none p-3 rounded-2xl text-xs font-bold" value={newCar.bodyStyle} onChange={e => setNewCar({...newCar, bodyStyle: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Fuel System</label>
                    <input required className="w-full bg-white border-none p-3 rounded-2xl text-xs font-bold" value={newCar.fuelFeed} onChange={e => setNewCar({...newCar, fuelFeed: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Weight</label>
                    <input required className="w-full bg-white border-none p-3 rounded-2xl text-xs font-bold" value={newCar.weight} onChange={e => setNewCar({...newCar, weight: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest ml-2">Top Speed</label>
                    <input required className="w-full bg-white border-none p-3 rounded-2xl text-xs font-bold" value={newCar.topSpeed} onChange={e => setNewCar({...newCar, topSpeed: e.target.value})} />
                  </div>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 ml-2">Vehicle Gallery</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                    <label className="cursor-pointer bg-slate-50 hover:bg-blue-50 border-2 border-dashed border-slate-200 hover:border-blue-200 rounded-[35px] aspect-square flex flex-col items-center justify-center transition-all group">
                      <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                      </div>
                      <span className="text-[9px] font-black text-slate-400 uppercase mt-3 tracking-widest">Add Photo</span>
                      <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    {images.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-[35px] overflow-hidden group border border-slate-100 shadow-sm">
                        <img src={img} className="w-full h-full object-cover" alt="Preview" />
                        <button type="button" onClick={() => handleRemoveImage(idx)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-black text-xs uppercase">Delete</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-3 space-y-6">
                   <div className="flex justify-between items-center bg-slate-100 p-6 rounded-[30px]">
                      <h4 className="text-[10px] font-black text-slate-950 uppercase tracking-[0.3em]">Technical Narrative Sections</h4>
                      <button type="button" onClick={handleAddSection} className="bg-white text-blue-600 px-4 py-2 rounded-full font-black text-[9px] uppercase tracking-widest shadow-sm hover:bg-blue-600 hover:text-white transition-all">+ Add New Narrative</button>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sections.map((sec, i) => (
                      <div key={i} className="p-8 bg-slate-50 rounded-[40px] space-y-4 relative group hover:bg-blue-50 transition-colors">
                        <button type="button" onClick={() => handleRemoveSection(i)} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors">✕</button>
                        <input required placeholder="Heading (e.g. Design Heritage)" className="w-full border-none bg-white p-4 rounded-2xl text-sm font-black uppercase tracking-tight outline-none" value={sec.title} onChange={e => handleSectionChange(i, 'title', e.target.value)} />
                        <textarea required placeholder="Content description..." className="w-full border-none bg-white p-4 rounded-2xl text-sm font-medium h-32 outline-none resize-none" value={sec.content} onChange={e => handleSectionChange(i, 'content', e.target.value)} />
                      </div>
                    ))}
                   </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-slate-950 text-white py-6 rounded-full font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl shadow-blue-900/20 italic text-lg leading-none active:scale-95">
                {editingCarId ? 'Update Master Registry' : 'Establish Final Registration'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
