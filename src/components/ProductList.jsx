import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 md:gap-6 px-1 sm:px-4">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
          whileHover={{ y: -5 }}
          className="w-full"
        >
          <div className="min-w-[160px] sm:max-w-none mx-auto sm:scale-100 scale-[0.95] transition-all duration-300">
            <ProductCard product={product} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
