
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Car, User, CartItem, Order } from './types';
import { INITIAL_CARS } from './mockData';

// Pages
import Home from './Pages/Home';
import CarListing from './Pages/CarListing';
import CarDetail from './Pages/CarDetail';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Login from './Pages/Login';
import AdminDashboard from './Pages/AdminDashboard';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { api } from './services/api';

const App: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await api.getCars();
        setCars(data);
      } catch (err) {
        console.error('Error fetching cars:', err);
      }
    };
    loadCars();
  }, []);

  const addToCart = (car: Car) => {

    setCart(prev => {
      const existing = prev.find(item => item.id === car.id);
      if (existing) {
        return prev.map(item => item.id === car.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...car, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} cartCount={cart.reduce((a, b) => a + b.quantity, 0)} onLogout={handleLogout} />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home cars={cars.slice(0, 3)} />} />
            <Route path="/cars" element={<CarListing cars={cars} onAddToCart={addToCart} />} />
            <Route path="/cars/:id" element={<CarDetail cars={cars} onAddToCart={addToCart} />} />
            <Route path="/cart" element={<Cart items={cart} onUpdateQty={updateQuantity} onRemove={removeFromCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} user={user} onOrderSuccess={addOrder} onClearCart={clearCart} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/admin" element={<AdminDashboard cars={cars} orders={orders} setCars={setCars} user={user} />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
