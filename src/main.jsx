import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { CartProvider } from './context/CartProvider';   
import ErrorBoundary from './components/ErrorBoundary';
import { Tornado } from 'lucide-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <CartProvider>
        <App />
      </CartProvider>
    </ErrorBoundary>
  </React.StrictMode>
);



