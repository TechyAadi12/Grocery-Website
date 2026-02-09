import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                {/* Brand */}
                <div className="space-y-6">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-primary-600 p-2 rounded-xl">
                            <Store className="text-white w-5 h-5" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white">Fresh<span className="text-primary-500">Cart</span></span>
                    </Link>
                    <p className="text-slate-400">
                        Bringing the freshest groceries from local farms straight to your doorstep. Quality and health in every bite.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                            <Facebook className="w-5 h-5 text-white" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                            <Instagram className="w-5 h-5 text-white" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary-600 transition-colors">
                            <Twitter className="w-5 h-5 text-white" />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
                    <ul className="space-y-4">
                        <li><Link to="/" className="hover:text-primary-500 transition-colors">Home</Link></li>
                        <li><Link to="/products" className="hover:text-primary-500 transition-colors">All Products</Link></li>
                        <li><Link to="/about" className="hover:text-primary-500 transition-colors">About Us</Link></li>
                        <li><Link to="/contact" className="hover:text-primary-500 transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Categories */}
                <div>
                    <h4 className="text-white font-semibold text-lg mb-6">Categories</h4>
                    <ul className="space-y-4">
                        <li><Link to="/products?cat=fruits" className="hover:text-primary-500 transition-colors">Fruits & Vegetables</Link></li>
                        <li><Link to="/products?cat=dairy" className="hover:text-primary-500 transition-colors">Dairy & Eggs</Link></li>
                        <li><Link to="/products?cat=meat" className="hover:text-primary-500 transition-colors">Meat & Seafood</Link></li>
                        <li><Link to="/products?cat=bakery" className="hover:text-primary-500 transition-colors">Bakery & Snacks</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                    <h4 className="text-white font-semibold text-lg mb-6">Contact Us</h4>
                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                        <span>123 Market St, San Francisco, CA 94103</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                        <span>+1 (555) 000-0000</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                        <span>hello@freshcart.com</span>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-800 pt-8 mt-8 text-center text-sm text-slate-500">
                <p>&copy; {new Date().getFullYear()} FreshCart E-Commerce. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
