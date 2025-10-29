import React from 'react';

function ProductList({ products, onAddToCart }) {
  return (
    <div className="products">
      <h2>Products</h2>
      <div className="grid">
        {products.map(product => (
          <div key={product.id} className="card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => onAddToCart(product.id)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;