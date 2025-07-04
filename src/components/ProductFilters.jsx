import React from 'react';
import { Search, Filter, ArrowUpDown, X } from 'lucide-react';

export default function ProductFilters({ search, setSearch, category, setCategory, sort, setSort, categories }) {
  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'asc', label: 'Price ↑' },
    { value: 'desc', label: 'Price ↓' }
  ];

  const clearFilters = () => {
    setSearch('');
    setCategory('all');
    setSort('');
  };

  const hasActiveFilters = search || category !== 'all' || sort;

  return (
    <div className="relative mb-8">
      {/* Main Filter Bar */}
      <div className="bg-gradient-to-r from-[#1a1a1a]/90 via-[#1e1e1e]/95 to-[#1a1a1a]/90 backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          
          {/* Search - Takes most space */}
          <div className="flex-1 w-full lg:max-w-md relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-emerald-400 transition-colors duration-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 bg-[#0a0a0a]/50 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 focus:bg-[#0a0a0a]/70 transition-all duration-300 text-sm"
            />
          </div>

          {/* Category & Sort - Compact */}
          <div className="flex gap-3 w-full lg:w-auto">
            {/* Category */}
            <div className="relative group flex-1 lg:flex-none lg:w-40">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-emerald-400 transition-colors duration-300" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-[#0a0a0a]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-[#0a0a0a]/70 transition-all duration-300 text-sm appearance-none cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat} className="bg-[#1a1a1a] text-white capitalize">
                    {cat === 'all' ? 'All' : cat.replace(/['"]/g, '')}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="h-3 w-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Sort */}
            <div className="relative group flex-1 lg:flex-none lg:w-32">
              <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-emerald-400 transition-colors duration-300" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-[#0a0a0a]/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-[#0a0a0a]/70 transition-all duration-300 text-sm appearance-none cursor-pointer"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-[#1a1a1a] text-white">
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="h-3 w-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white/70 hover:text-white transition-all duration-300 text-sm flex items-center gap-2 whitespace-nowrap"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Pills */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
            {search && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs text-emerald-300">
                "{search}"
              </span>
            )}
            {category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-300 capitalize">
                {category.replace(/['"]/g, '')}
              </span>
            )}
            {sort && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300">
                {sortOptions.find(option => option.value === sort)?.label}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}