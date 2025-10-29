const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory database
const db = new sqlite3.Database(':memory:');

// Create tables and add some products
db.serialize(() => {
  db.run(`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL)`);
  db.run(`CREATE TABLE cart (id INTEGER PRIMARY KEY AUTOINCREMENT, productId INTEGER, quantity INTEGER)`);
  
  // Add products
  const products = [
    [1, 'Laptop', 999.99],
    [2, 'Phone', 599.99],
    [3, 'Headphones', 199.99],
    [4, 'Mouse', 29.99],
    [5, 'Keyboard', 79.99]
  ];
  
  const stmt = db.prepare('INSERT INTO products VALUES (?, ?, ?)');
  products.forEach(p => stmt.run(p));
  stmt.finalize();
});

// Get products
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

// Add to cart (from products page)
app.post('/api/cart', (req, res) => {
  const {productId, qty = 1} = req.body;
  
  db.get('SELECT * FROM cart WHERE productId = ?', [productId], (err, row) => {
    if (row) {
      // Add to existing quantity
      db.run('UPDATE cart SET quantity = quantity + ? WHERE productId = ?', [qty, productId]);
    } else {
      // Add new
      db.run('INSERT INTO cart (productId, quantity) VALUES (?, ?)', [productId, qty]);
    }
    res.json({success: true});
  });
});

// Update cart quantity (from cart page)
app.put('/api/cart/:id', (req, res) => {
  const {quantity} = req.body;
  const cartId = req.params.id;
  
  db.run('UPDATE cart SET quantity = ? WHERE id = ?', [quantity, cartId], (err) => {
    if (err) return res.status(500).json({error: err.message});
    res.json({success: true});
  });
});

// Get cart
app.get('/api/cart', (req, res) => {
  const query = `
    SELECT c.id, c.quantity, p.name, p.price, p.id as productId
    FROM cart c JOIN products p ON c.productId = p.id
  `;
  
  db.all(query, (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    
    const total = rows.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    res.json({items: rows, total});
  });
});

// Remove from cart
app.delete('/api/cart/:id', (req, res) => {
  db.run('DELETE FROM cart WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({error: err.message});
    res.json({success: true});
  });
});

// Checkout
app.post('/api/checkout', (req, res) => {
  const {name, email, cartItems} = req.body;
  const total = cartItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  
  const receipt = {
    id: 'ORDER-' + Date.now(),
    name,
    email,
    total,
    timestamp: new Date().toISOString(),
    items: cartItems
  };
  
  // Clear cart
  db.run('DELETE FROM cart', () => {
    res.json({receipt});
  });
});

// Debug endpoints to view database
app.get('/debug/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

app.get('/debug/cart', (req, res) => {
  db.all('SELECT * FROM cart', (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));