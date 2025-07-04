import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu, X, Home } from 'lucide-react';

export default function Navbar() {
  const { cart } = useCart();
  const uniqueItemCount = cart.length;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/95 backdrop-blur-md text-white shadow-2xl border-b border-emerald-500/20">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex justify-between items-center h-16 lg:h-18">
            
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center group"
              onClick={closeMobileMenu}
            >
              <div className="relative">
                <img 
                  src="/logo2.png" 
                  alt="GloryMedia Logo" 
                  className="h-8 sm:h-10 lg:h-12 w-auto object-contain rounded-xl border border-emerald-500/30 shadow-lg group-hover:shadow-emerald-500/25 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              
              {/* Home Link */}
              <Link
                to="/"
                className="group flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/5 transition-all duration-300 font-medium tracking-wide"
              >
                <Home className="h-4 w-4 group-hover:text-emerald-400 transition-colors duration-300" />
                <span className="group-hover:text-emerald-400 transition-colors duration-300">Home</span>
              </Link>

              {/* Cart Button */}
              <Link
                to="/cart"
                className="relative group flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black px-4 lg:px-5 py-2 lg:py-2.5 rounded-full font-semibold shadow-lg hover:shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                
                {uniqueItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold text-white bg-red-500 border-2 border-[#121212] shadow-lg animate-pulse">
                    {uniqueItemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-300 touch-manipulation"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#121212]/98 backdrop-blur-md border-b border-emerald-500/20 shadow-2xl">
            <div className="px-4 py-4 space-y-2">
              
              {/* Mobile Home Link */}
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/90 hover:text-white hover:bg-white/5 active:bg-white/10 transition-all duration-300 font-medium touch-manipulation"
              >
                <Home className="h-5 w-5 text-emerald-400" />
                <span>Home</span>
              </Link>

              {/* Mobile Cart Link */}
              <div className="px-2">
                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="relative flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 active:from-emerald-600 active:to-emerald-700 text-black px-4 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 touch-manipulation"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Shopping Cart</span>
                  
                  {uniqueItemCount > 0 && (
                    <span className="ml-auto flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white bg-red-500 shadow-lg">
                      {uniqueItemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}