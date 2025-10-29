import React from 'react';

function Receipt({ receipt, onClose }) {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Order Confirmed!</h2>
        <p>Order ID: {receipt.id}</p>
        <p>Customer: {receipt.name}</p>
        <p>Email: {receipt.email}</p>
        <p>Total: ${receipt.total.toFixed(2)}</p>
        <p>Date: {new Date(receipt.timestamp).toLocaleDateString()}</p>
        <button onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Receipt;