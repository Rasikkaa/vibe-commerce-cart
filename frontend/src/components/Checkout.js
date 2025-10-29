import React, { useState } from 'react';

function Checkout({ cart, onCheckout }) {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert('Please fill all fields');
      return;
    }
    onCheckout(form);
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>
      {cart.items.length === 0 ? (
        <p>Add items to cart first</p>
      ) : (
        <>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            {cart.items.map(item => (
              <div key={item.id}>
                {item.name} × {item.quantity} = ${(item.quantity * item.price).toFixed(2)}
              </div>
            ))}
            <strong>Total: ${cart.total.toFixed(2)}</strong>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input 
                type="text" 
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input 
                type="email" 
                value={form.email}
                onChange={(e) => setForm({...form, email: e.target.value})}
                required
              />
            </div>
            <button type="submit">Place Order</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Checkout;