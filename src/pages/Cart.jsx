
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import Pagination from '../components/Pagination';
import { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/use-mobile';

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, clearCart, removeFromCart } = useCart();
  const isMobile = useIsMobile();

  const cartItems = cart;

  // Pagination setup - different for mobile and desktop
  const itemsPerPage = isMobile ? 5 : 3;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);

  // Reset to page 1 when switching between mobile/desktop
  useEffect(() => {
    setCurrentPage(1);
  }, [isMobile]);

  const paginatedItems = cartItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + tax + shipping;

  return (
    <div className="min-h-[calc(100vh-5rem)] pt-24 pb-8 flex flex-col justify-start">
      <div className="container mx-auto max-w-7xl px-4 flex-1">
        {cartItems.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 max-w-md mx-auto">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Your cart is empty</h3>
              <p className="text-white/60 mb-4 text-sm md:text-base">Start adding some premium products to your cart</p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-emerald-300 hover:text-emerald-200 transition-all duration-300 text-sm md:text-base"
              >
                Continue Shopping
              </a>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            
            <motion.div 
              className="w-full lg:col-span-2 flex flex-col h-full order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    Cart Items ({cartItems.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-400 hover:text-red-300 text-xs md:text-sm font-medium transition-colors duration-200"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-3 md:space-y-4 overflow-hidden min-h-[49vh] md:min-h-[57vh] pr-2">
                  {paginatedItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-sm md:text-lg mb-1 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-white/60 text-xs md:text-sm mb-1 md:mb-2">
                            {item.category?.name || 'Product'}
                          </p>
                          <p className="text-emerald-400 font-bold text-base md:text-lg">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
                          <div className="flex items-center bg-white/10 rounded-lg">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-l-lg transition-all duration-200 text-sm md:text-base"
                            >
                              -
                            </button>
                            <span className="w-8 md:w-12 h-8 md:h-10 flex items-center justify-center text-white font-medium text-sm md:text-base">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-r-lg transition-all duration-200 text-sm md:text-base"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                          >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 md:mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="w-full order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 lg:sticky lg:top-24">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">Order Summary</h2>

                <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                  <div className="flex justify-between text-white/70 text-sm md:text-base">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/70 text-sm md:text-base">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/70 text-sm md:text-base">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {subtotal < 100 && (
                    <div className="text-emerald-400 text-xs md:text-sm p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-3 md:pt-4">
                    <div className="flex justify-between text-white font-bold text-base md:text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-3 md:py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-emerald-500/25 text-sm md:text-base">
                    Proceed to Checkout
                  </button>
                  <a
                    href="/"
                    className="block w-full py-2 md:py-3 text-center bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl border border-white/20 transition-all duration-300 text-sm md:text-base"
                  >
                    Continue Shopping
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
