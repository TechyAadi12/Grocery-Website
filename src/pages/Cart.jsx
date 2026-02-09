import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../store/useCartStore';

const Cart = () => {
    const { items, removeItem, updateQuantity, getTotalPrice, getItemCount } = useCartStore();
    const subtotal = getTotalPrice();
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingBag className="w-10 h-10 text-slate-400" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">
                    Looks like you haven't added anything to your cart yet. Explore our fresh products and start shopping!
                </p>
                <Link to="/products" className="btn-primary inline-flex items-center gap-2 py-3 px-8">
                    Start Shopping <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-bold">
                    {getItemCount()} items
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence>
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex flex-col sm:flex-row items-center gap-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm"
                            >
                                <Link to={`/products/${item.id}`} className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-slate-50">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </Link>

                                <div className="flex-1 min-w-0 text-center sm:text-left">
                                    <Link to={`/products/${item.id}`} className="block mb-1">
                                        <h3 className="font-bold text-slate-900 hover:text-primary-600 transition-colors truncate">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <p className="text-sm text-slate-500 mb-4 truncate text-capitalize">{item.category}</p>

                                    <div className="flex items-center justify-center sm:justify-start gap-4">
                                        <div className="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-100">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded hover:bg-white transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center rounded hover:bg-white transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="text-center sm:text-right shrink-0">
                                    <p className="font-bold text-lg text-slate-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    <p className="text-xs text-slate-400">₹{item.price.toFixed(2)} / {item.unit}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <Link to="/products" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all mt-4">
                        <ArrowLeft className="w-5 h-5" /> Continue Shopping
                    </Link>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm sticky top-24">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-slate-600 font-medium">
                                <span>Subtotal</span>
                                <span className="text-slate-900">₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600 font-medium">
                                <span>Estimated Tax (8%)</span>
                                <span className="text-slate-900">₹{tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600 font-medium">
                                <span>Shipping</span>
                                <span className={shipping === 0 ? 'text-green-600' : 'text-slate-900'}>
                                    {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                                </span>
                            </div>
                            {shipping > 0 && (
                                <p className="text-xs text-slate-400 bg-primary-50 p-3 rounded-lg border border-primary-100">
                                    Tip: Add <strong>₹{(50 - subtotal).toFixed(2)}</strong> more for free shipping!
                                </p>
                            )}
                        </div>

                        <div className="border-t border-slate-100 pt-6 mb-8">
                            <div className="flex justify-between items-end">
                                <span className="text-lg font-bold text-slate-900">Total</span>
                                <span className="text-3xl font-bold text-primary-600">₹{total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="btn-primary w-full py-4 text-lg font-bold shadow-lg shadow-primary-200">
                            Proceed to Checkout
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-4 grayscale opacity-50">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
