
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

import { api } from '../services/api';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isReg, setIsReg] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSub = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isReg) {
        await api.register(form);
        setIsReg(false);
        alert('Registration successful! Please login.');
      } else {
        const user = await api.login({ email: form.email, password: form.password });
        onLogin(user);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };


  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Cool Background Decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="bg-slate-900/50 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl w-full max-w-md border border-slate-800 relative z-10">
        <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-black text-white text-2xl mx-auto mb-6 shadow-xl shadow-blue-900/40">C</div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">{isReg ? 'The Registry' : 'Access Vault'}</h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">Join the world's elite car marketplace.</p>
        </div>

        <form onSubmit={handleSub} className="space-y-5">
          {isReg && (
            <div>
              <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
              <input required type="text" className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-white transition-all font-medium" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
          )}
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
            <input required type="email" className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-white transition-all font-medium" value={form.email} placeholder="name@email.com" onChange={e => setForm({...form, email: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Secure Password</label>
            <input required type="password" placeholder="••••••••" className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 text-white transition-all font-medium" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <button className="w-full bg-blue-600 text-white p-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition shadow-xl shadow-blue-900/40 active:scale-95">
            {isReg ? 'Create Account' : 'Authenticate'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <button onClick={() => setIsReg(!isReg)} className="text-slate-400 font-bold hover:text-blue-500 transition text-sm">
            {isReg ? 'Already a member? Sign In' : 'New collector? Join Registry'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
