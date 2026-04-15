
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, cartCount, onLogout }) => {
  return (
    <nav className="bg-slate-950 text-white sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 flex justify-between h-20 items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-black group-hover:rotate-12 transition-transform">C</div>
          <span className="text-xl font-extrabold tracking-tighter italic">
            CLASSIC<span className="text-blue-500">DRIVE</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide">
          <Link to="/" className="hover:text-blue-400 transition">HOME</Link>
          <Link to="/cars" className="hover:text-blue-400 transition">INVENTORY</Link>
          <Link to="/cart" className="relative hover:text-blue-400 transition flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            CART
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-blue-500 text-white text-[10px] rounded-full px-2 py-0.5 font-bold animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center space-x-6 border-l border-slate-800 pl-8">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 uppercase">Welcome back</span>
                <span className="text-sm font-bold text-blue-400">{user.name}</span>
              </div>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-[10px] bg-slate-800 px-3 py-1 rounded-full border border-slate-700 hover:bg-slate-700 transition">ADMIN</Link>
              )}
              <button onClick={onLogout} className="text-xs text-slate-500 hover:text-white transition uppercase font-bold">Logout</button>
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-900/20">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
