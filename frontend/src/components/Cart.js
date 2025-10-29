import React from 'react';

function Cart({ cart, onRemoveFromCart, onUpdateQuantity }) {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                <strong>{item.name}</strong>
                <p>${item.price} each</p>
              </div>
              <div className="cart-item-actions">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, item.productId, parseInt(e.target.value))}
                  min="1"
                  className="quantity-input"
                />
                <span>${(item.quantity * item.price).toFixed(2)}</span>
                <button onClick={() => onRemoveFromCart(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="total">
            <strong>Total: ${cart.total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;