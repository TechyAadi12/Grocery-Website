import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, ChevronRight, ArrowLeft, Minus, Plus, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import useCartStore from '../store/useCartStore';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const addItem = useCartStore((state) => state.addItem);

    useEffect(() => {
        const foundProduct = products.find((p) => p.id === parseInt(id));
        setProduct(foundProduct);
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Product not found</h2>
                <Link to="/products" className="text-primary-600 font-semibold underline">Back to Shop</Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem(product, quantity);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
                <Link to="/" className="hover:text-primary-600 transition-colors">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <Link to="/products" className="hover:text-primary-600 transition-colors">Shop</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-slate-900 font-medium truncate">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Product Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100"
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                            {product.category}
                        </span>
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
                        <span className="text-green-600 font-semibold text-sm">In Stock ({product.stock})</span>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-4xl font-bold text-primary-600">₹{product.price.toFixed(2)}</span>
                            <span className="text-slate-500 text-lg">/ {product.unit}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {product.description}
                        </p>
                    </div>

                    {/* Add to Cart Controls */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
                        <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 w-full sm:w-auto">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                                disabled={quantity <= 1}
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-bold text-slate-900">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="btn-primary flex-1 py-3 px-8 flex items-center justify-center gap-3 text-lg w-full"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </button>
                    </div>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex flex-col items-center text-center gap-2">
                            <Truck className="w-6 h-6 text-primary-600" />
                            <span className="text-xs font-bold text-slate-900 uppercase tracking-tighter">Fast Delivery</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2 border-x border-slate-200">
                            <ShieldCheck className="w-6 h-6 text-primary-600" />
                            <span className="text-xs font-bold text-slate-900 uppercase tracking-tighter">Secure Payment</span>
                        </div>
                        <div className="flex flex-col items-center text-center gap-2">
                            <RefreshCw className="w-6 h-6 text-primary-600" />
                            <span className="text-xs font-bold text-slate-900 uppercase tracking-tighter">Easy Returns</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div>
                <h2 className="text-2xl font-bold mb-8">Related Items</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products
                        .filter(p => p.category === product.category && p.id !== product.id)
                        .slice(0, 4)
                        .map(item => (
                            <ProductCard key={item.id} product={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
