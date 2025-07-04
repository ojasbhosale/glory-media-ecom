import { useCart } from '../context/CartContext';
import { Minus, Plus } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, cart, increaseQuantity, decreaseQuantity } = useCart();

  const inCart = cart.find(item => item.id === product.id);

  const imageUrl =
    product.images && product.images[0] && product.images[0].startsWith('http')
      ? product.images[0]
      : 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <div className="group relative bg-gradient-to-br from-[#1a1a1a] via-[#1e1e1e] to-[#121212] p-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)] transition-all duration-500 border border-white/10 hover:border-emerald-500/30 backdrop-blur-sm flex flex-col justify-between transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
      
      {/* Premium dark gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.05] via-transparent to-emerald-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-tl from-emerald-400/[0.02] via-transparent to-emerald-500/[0.04] opacity-0 group-hover:opacity-80 transition-opacity duration-700"></div>
      
      {/* Premium shine effect */}
      <div className="absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-emerald-400/8 to-emerald-600/4 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-500/6 to-emerald-700/3 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>

      {/* Product Image Container */}
      <div className="relative bg-gradient-to-br from-[#2a2a2a] to-[#1f1f1f] rounded-xl border border-white/5 hover:border-emerald-500/20 overflow-hidden mb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm z-10 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-emerald-400/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <img
          src={imageUrl}
          alt={product.title}
          className="h-full w-full object-contain mx-auto group-hover:scale-110 transition-transform duration-700 ease-out relative z-10 "
        />
        
        {/* Image reflection effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Product Title */}
      <h2 className="text-base font-semibold text-white/90 group-hover:text-white mb-2 line-clamp-2 transition-colors duration-300 leading-snug relative z-10">
        {product.title}
      </h2>

      {/* Price with premium styling */}
      <div className="mb-4 relative z-10">
        <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 bg-clip-text text-transparent relative group-hover:from-emerald-300 group-hover:to-emerald-500 transition-all duration-500">
          ${product.price.toFixed(2)}
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400/40 via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
        </p>
      </div>

      {/* Cart Controls */}
      {inCart ? (
        <div className="flex items-center justify-between mt-auto bg-gradient-to-r from-[#2a2a2a]/80 via-[#2e2e2e]/90 to-[#252525]/80 rounded-xl px-4 py-3 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] border border-white/10 hover:border-emerald-500/20 backdrop-blur-sm relative z-10 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.03] via-emerald-400/[0.02] to-emerald-600/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
          
          <button
            onClick={() => decreaseQuantity(product.id)}
            className="bg-gradient-to-br from-[#3a3a3a] via-[#333333] to-[#2a2a2a] hover:from-[#404040] hover:to-[#353535] text-white/80 hover:text-white p-3 rounded-lg transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.4)] active:scale-95 border border-white/10 hover:border-emerald-500/30 relative z-10"
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="font-bold text-xl text-white px-4 py-1 bg-gradient-to-r from-[#1a1a1a] to-[#1e1e1e] rounded-lg shadow-sm border border-white/10 relative z-10">
            {inCart.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(product.id)}
            className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-500 hover:to-emerald-600 text-white p-3 rounded-lg transition-all duration-300 shadow-[0_4px_16px_rgba(16,185,129,0.2)] hover:shadow-[0_6px_24px_rgba(16,185,129,0.3)] active:scale-95 border border-emerald-500/30 relative z-10"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => addToCart({ ...product, image: imageUrl })}
          className="mt-auto bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-500 hover:to-emerald-600 text-white w-full py-4 rounded-xl font-semibold shadow-[0_8px_32px_rgba(16,185,129,0.2)] hover:shadow-[0_12px_48px_rgba(16,185,129,0.3)] active:scale-[0.98] transition-all duration-300 border border-emerald-500/30 relative overflow-hidden group/button z-10"
        >
          {/* Modern gradient background for button */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-emerald-500/10 to-emerald-600/20 opacity-0 group-hover/button:opacity-100 transition-opacity duration-500"></div>
          
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover/button:translate-x-[100%] transition-transform duration-1000"></div>
          
          <span className="relative z-10 tracking-wide">Add to Cart</span>
        </button>
      )}
    </div>
  );
}