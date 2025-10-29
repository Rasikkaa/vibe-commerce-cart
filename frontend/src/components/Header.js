import React from 'react';

function Header({ currentView, onViewChange, cartCount }) {
  return (
    <header>
      <h1>Vibe Commerce</h1>
      <nav>
        <button 
          onClick={() => onViewChange('products')} 
          className={currentView === 'products' ? 'active' : ''}
        >
          Products
        </button>
        <button 
          onClick={() => onViewChange('cart')} 
          className={currentView === 'cart' ? 'active' : ''}
        >
          Cart ({cartCount})
        </button>
        <button 
          onClick={() => onViewChange('checkout')} 
          className={currentView === 'checkout' ? 'active' : ''}
        >
          Checkout
        </button>
      </nav>
    </header>
  );
}

export default Header;