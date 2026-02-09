import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Store } from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import useProductStore from '../../store/useProductStore';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const itemCount = useCartStore((state) => state.getItemCount());
    const { searchQuery, setSearchQuery, setSelectedCategory } = useProductStore();
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // When searching from navbar, we usually want global search
        if (query) {
            setSelectedCategory('all');
        }

        if (window.location.pathname !== '/products') {
            navigate('/products');
        }
    };

    return (
        <nav className="sticky top-0 z-50 glass">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
                        <Store className="text-white w-5 h-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">Fresh<span className="text-primary-600">Cart</span></span>
                </Link>

                {/* Desktop Search */}
                <div className="hidden md:flex flex-1 max-w-md relative">
                    <input
                        type="text"
                        placeholder="Search for groceries..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="font-medium text-slate-600 hover:text-primary-600 transition-colors">Home</Link>
                    <Link to="/products" className="font-medium text-slate-600 hover:text-primary-600 transition-colors">Shop</Link>
                    <Link to="/cart" className="relative group p-2">
                        <ShoppingCart className="w-6 h-6 text-slate-700 group-hover:text-primary-600 transition-colors" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                </div>

                {/* Mobile Icons */}
                <div className="flex items-center gap-2 md:hidden">
                    <button className="p-2 text-slate-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                    <Link to="/cart" className="relative p-2">
                        <ShoppingCart className="w-6 h-6 text-slate-700" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl animate-in slide-in-from-top duration-300">
                    <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            <Search className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                        </div>
                        <Link to="/" className="text-lg font-medium py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/products" className="text-lg font-medium py-2" onClick={() => setIsMenuOpen(false)}>Shop</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
