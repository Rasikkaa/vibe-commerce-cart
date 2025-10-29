# Vibe Commerce Frontend

React application for the mock e-commerce shopping cart interface.

## Setup
```bash
npm install
npm start    # Starts on http://localhost:3000
```

## Components
- **ProductsGrid** - Displays products in responsive grid with "Add to Cart" buttons
- **CartView** - Shows cart items, quantities, and total with remove functionality  
- **CheckoutForm** - Customer information form with validation
- **ReceiptModal** - Order confirmation popup with receipt details

## Features
- Responsive design (mobile + desktop)
- Real-time cart updates
- Form validation for checkout
- Modal receipt display
- Error handling for API calls

## Architecture
- Centralized API calls in `api.js`
- Component-based structure
- State management with React hooks
- CSS Grid and Flexbox for responsive layout