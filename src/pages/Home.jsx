import { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import ProductFilters from '../components/ProductFilters';
import Pagination from '../components/Pagination';
import { motion } from 'framer-motion';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState(['all']);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=100');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();

        const cleanedProducts = data.filter(item =>
          item.images && item.images[0] && item.images[0].startsWith('http') && item.price > 0
        );

        setProducts(cleanedProducts);
        setFilteredProducts(cleanedProducts);

        const uniqueCategories = [...new Set(cleanedProducts.map(item => item.category.name))];
        setCategories(['all', ...uniqueCategories]);

      } catch {
        setError('Unable to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updated = [...products];

    if (search.trim()) {
      updated = updated.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'all') {
      updated = updated.filter(item => item.category.name === category);
    }

    if (sort === 'asc') {
      updated.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
    setCurrentPage(1);
  }, [search, category, sort, products]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <motion.div 
        className="text-center py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent mb-4">
          Premium Collection
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
          Discover our curated selection of premium products designed for the modern lifestyle
        </p>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProductFilters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            categories={categories}
          />
        </motion.div>

        {/* Results Summary */}
        {!loading && !error && (
          <motion.div 
            className="flex items-center justify-between mb-8 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-white/70 text-sm">
              Showing <span className="text-emerald-400 font-medium">{paginatedProducts.length}</span> of{' '}
              <span className="text-emerald-400 font-medium">{filteredProducts.length}</span> products
            </div>
            {totalPages > 1 && (
              <div className="text-white/50 text-sm">
                Page {currentPage} of {totalPages}
              </div>
            )}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="inline-flex items-center gap-3 text-white/70">
              <div className="w-5 h-5 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin"></div>
              <span className="text-lg">Loading premium products...</span>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md mx-auto">
              <p className="text-red-400 font-medium text-lg mb-2">Oops! Something went wrong</p>
              <p className="text-red-300/70">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <ProductList products={paginatedProducts} />
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </motion.div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">No products found</h3>
              <p className="text-white/60 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearch('');
                  setCategory('all');
                  setSort('');
                }}
                className="px-6 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-emerald-300 hover:text-emerald-200 transition-all duration-300"
              >
                Clear all filters
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}