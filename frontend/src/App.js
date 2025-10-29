import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Receipt from './components/Receipt';
import './index.css';

function App() {
  const [view, setView] = useState('products');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadCart = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/cart');
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, qty: 1 })
      });
      loadCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, { method: 'DELETE' });
      loadCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (cartId, productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    
    try {
      // Use PUT to update quantity directly
      await fetch(`http://localhost:5000/api/cart/${cartId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      });
      loadCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleCheckout = async (formData) => {
    try {
      const res = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, cartItems: cart.items })
      });
      
      const data = await res.json();
      setReceipt(data.receipt);
      setShowReceipt(true);
      setCart({ items: [], total: 0 });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const closeReceipt = () => {
    setShowReceipt(false);
    setView('products');
  };

  return (
    <div>
      <Header 
        currentView={view} 
        onViewChange={setView} 
        cartCount={cart.items.length} 
      />

      <main>
        {view === 'products' && (
          <ProductList products={products} onAddToCart={addToCart} />
        )}
        
        {view === 'cart' && (
          <Cart cart={cart} onRemoveFromCart={removeFromCart} onUpdateQuantity={updateQuantity} />
        )}
        
        {view === 'checkout' && (
          <Checkout cart={cart} onCheckout={handleCheckout} />
        )}
      </main>

      {showReceipt && receipt && (
        <Receipt receipt={receipt} onClose={closeReceipt} />
      )}
    </div>
  );
}

export default App;