import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
      >
        <ChevronLeft className="w-4 h-4" />
      </motion.button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => (
        <motion.button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-300 ${
            page === currentPage
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
              : page === '...'
              ? 'text-white/40 cursor-default'
              : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/70 hover:text-white'
          }`}
          whileHover={{ scale: page === '...' || page === currentPage ? 1 : 1.05 }}
          whileTap={{ scale: page === '...' || page === currentPage ? 1 : 0.95 }}
        >
          {page}
        </motion.button>
      ))}

      {/* Next Button */}
      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-white/70 hover:text-white transition-all duration-300"
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
        whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
      >
        <ChevronRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}