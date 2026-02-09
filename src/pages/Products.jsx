import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useProductStore from '../store/useProductStore';
import { categories } from '../data/products';
import ProductCard from '../components/products/ProductCard';

const Products = () => {
    const [searchParams] = useSearchParams();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const {
        filteredProducts,
        setSelectedCategory,
        selectedCategory,
        setSortBy,
        sortBy,
        priceRange,
        setPriceRange,
        searchQuery,
        setSearchQuery
    } = useProductStore();

    useEffect(() => {
        const cat = searchParams.get('cat');
        setSelectedCategory(cat || 'all');
    }, [searchParams, setSelectedCategory]);

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar - Desktop */}
                <aside className="hidden lg:block w-64 space-y-8">
                    <div>
                        <h3 className="font-bold text-lg mb-4">Categories</h3>
                        <div className="flex flex-col gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`text-left px-4 py-2 rounded-lg transition-colors ${selectedCategory === cat.id
                                        ? 'bg-primary-600 text-white'
                                        : 'hover:bg-slate-100 text-slate-600'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Price Range</h3>
                        <div className="space-y-4">
                            <input
                                type="range"
                                min="0"
                                max="20"
                                step="0.5"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
                                className="w-full accent-primary-600"
                            />
                            <div className="flex justify-between text-sm text-slate-500 font-medium">
                                <span>₹0</span>
                                <span>Max: ₹{priceRange[1]}</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Top Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-slate-600 font-medium">
                            Showing <span className="text-slate-900 font-bold">{filteredProducts.length}</span> products
                        </p>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="lg:hidden p-2 border border-slate-200 rounded-lg text-slate-600"
                            >
                                <Filter className="w-5 h-5" />
                            </button>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="flex-1 sm:flex-none border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 outline-none focus:ring-2 focus:ring-primary-500 transition-all font-medium"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(selectedCategory !== 'all' || searchQuery) && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {selectedCategory !== 'all' && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-100">
                                    Category: {categories.find(c => c.id === selectedCategory)?.name}
                                    <button onClick={() => setSelectedCategory('all')}><X className="w-4 h-4" /></button>
                                </span>
                            )}
                            {searchQuery && (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium border border-primary-100">
                                    Search: {searchQuery}
                                    <button onClick={() => setSearchQuery('')}><X className="w-4 h-4" /></button>
                                </span>
                            )}
                        </div>
                    )}

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                            <AnimatePresence mode='popLayout'>
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                            <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                            <p className="text-slate-500">Try adjusting your filters or search query</p>
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setSearchQuery('');
                                    setPriceRange([0, 20]);
                                }}
                                className="mt-6 text-primary-600 font-semibold"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 h-full w-80 bg-white z-[70] p-6 overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold">Filters</h2>
                                <button onClick={() => setIsSidebarOpen(false)}><X className="w-6 h-6" /></button>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="font-bold text-lg mb-4">Categories</h3>
                                    <div className="flex flex-col gap-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.id}
                                                onClick={() => {
                                                    setSelectedCategory(cat.id);
                                                    setIsSidebarOpen(false);
                                                }}
                                                className={`text-left px-4 py-2 rounded-lg ${selectedCategory === cat.id
                                                    ? 'bg-primary-600 text-white'
                                                    : 'bg-slate-50 text-slate-600'
                                                    }`}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg mb-4">Price Range</h3>
                                    <div className="space-y-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="20"
                                            step="0.5"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
                                            className="w-full accent-primary-600"
                                        />
                                        <div className="flex justify-between text-sm text-slate-500 font-medium">
                                            <span>₹0</span>
                                            <span>Max: ₹{priceRange[1]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Products;
