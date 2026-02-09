import { create } from 'zustand';
import { products } from '../data/products';

const useProductStore = create((set, get) => ({
    allProducts: products,
    filteredProducts: products,
    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'featured',
    priceRange: [0, 20],

    setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().applyFilters();
    },

    setSelectedCategory: (category) => {
        set({ selectedCategory: category });
        get().applyFilters();
    },

    setSortBy: (sort) => {
        set({ sortBy: sort });
        get().applyFilters();
    },

    setPriceRange: (range) => {
        set({ priceRange: range });
        get().applyFilters();
    },

    applyFilters: () => {
        const { allProducts, searchQuery, selectedCategory, sortBy, priceRange } = get();

        let filtered = [...allProducts];

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        // Price range filter
        filtered = filtered.filter(
            (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        // Sorting
        if (sortBy === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        }

        set({ filteredProducts: filtered });
    },
}));

export default useProductStore;
