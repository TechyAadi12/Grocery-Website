import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import useCartStore from '../../store/useCartStore';

const ProductCard = ({ product }) => {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="card group overflow-hidden flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-slate-50">
                <Link to={`/products/${product.id}`}>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                    />
                </Link>
                <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 glass text-primary-700 text-xs font-bold rounded-full">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">


                <Link to={`/products/${product.id}`} className="block mb-2">
                    <h3 className="text-slate-900 font-semibold group-hover:text-primary-600 transition-colors line-clamp-2">
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-auto flex flex-col gap-4">
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-slate-900">₹{product.price.toFixed(2)}</span>
                        <span className="text-xs text-slate-400 font-medium">per {product.unit}</span>
                    </div>

                    <button
                        onClick={() => addItem(product)}
                        className="w-full py-3 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary-700 active:scale-95 transition-all duration-200 shadow-lg shadow-primary-200"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
