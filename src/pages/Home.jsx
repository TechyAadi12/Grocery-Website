import React from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Truck,
    ShieldCheck,
    Clock,
    Apple,
    Leaf,
    Egg,
    Cookie,
    Beef,
    Popcorn,
    Coffee,
    Store,
    Flame,
    Zap,
    HeartPulse,
    Milk,
    IceCream,
    Wine
} from 'lucide-react';
import { motion } from 'framer-motion';
import { products, categories } from '../data/products';
import ProductCard from '../components/products/ProductCard';

const iconMap = {
    Apple: Apple,
    Leaf: Leaf,
    Egg: Egg,
    Cookie: Cookie,
    Beef: Beef,
    Popcorn: Popcorn,
    Coffee: Coffee,
    Store: Store
};

const Home = () => {
    // Group products by category for sections
    const getProductsByCategory = (catId, limit = 4) => {
        return products.filter(p => p.category === catId).slice(0, limit);
    };

    const featuredProducts = products.filter(p => p.rating >= 4.8).slice(0, 4);

    return (
        <div className="space-y-20 pb-20 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[700px] overflow-hidden bg-slate-900">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop"
                        alt="Hero Background"
                        className="w-full h-full object-cover scale-105"
                    />
                </div>
                <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-4 py-1.5 text-xs font-black tracking-[0.2em] text-white uppercase bg-primary-600 rounded-full">
                                Organic Choice
                            </span>
                            <div className="h-px w-12 bg-primary-600"></div>
                            <span className="text-primary-400 text-xs font-bold tracking-wider uppercase">EST. 2024</span>
                        </div>
                        <h1 className="mb-8 text-6xl md:text-8xl font-black text-white leading-[1.05] tracking-tight">
                            Freshness <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-green-300">Delivered.</span>
                        </h1>
                        <p className="mb-12 text-xl text-slate-300 max-w-xl leading-relaxed font-medium">
                            Premium organic produce, farm-to-table dairy, and artisan bakery items delivered to your doorstep within 60 minutes.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link to="/products" className="btn-primary text-center py-5 px-10 text-lg flex items-center justify-center gap-3 shadow-2xl shadow-primary-600/20 group">
                                Start Shopping
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/products" className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 py-5 rounded-2xl font-bold hover:bg-white/20 transition-all text-center flex items-center justify-center gap-2">
                                <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" /> Flash Deals
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
                    <span className="text-[10px] font-bold tracking-widest uppercase">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"></div>
                </div>
            </section>

            {/* Features Info Box */}
            <section className="container mx-auto px-4 -mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: Truck, title: 'Free Delivery', desc: 'On orders over $50', color: 'bg-primary-600 text-white' },
                        { icon: ShieldCheck, title: 'Safe Payment', desc: '100% secure checkout', color: 'bg-white text-slate-900 border border-slate-100 shadow-xl shadow-slate-200/50' },
                        { icon: Clock, title: 'Express Delivery', desc: 'In 60-90 minutes', color: 'bg-white text-slate-900 border border-slate-100 shadow-xl shadow-slate-200/50' },
                        { icon: Apple, title: 'Fresh Quality', desc: 'Handpicked organic', color: 'bg-white text-slate-900 border border-slate-100 shadow-xl shadow-slate-200/50' }
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex items-center gap-4 p-7 rounded-[2.5rem] ${feature.color}`}
                        >
                            <div className={`p-4 rounded-2xl ${feature.color.includes('primary') ? 'bg-white/20' : 'bg-primary-50 text-primary-600'}`}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold">{feature.title}</h3>
                                <p className={`text-xs font-semibold ${feature.color.includes('white') ? 'text-slate-400' : 'text-primary-100 opacity-80'}`}>{feature.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Departments Grid */}
            <section className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 text-primary-600 font-bold mb-3">
                            <Store className="w-4 h-4" />
                            <span className="text-xs uppercase tracking-widest">Departments</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">Explore Our Fresh <br /> Marketplace</h2>
                    </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.filter(c => c.id !== 'all').map((cat, idx) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Link
                                to={`/products?cat=${cat.id}`}
                                className="group relative block aspect-[4/5] overflow-hidden rounded-[2.5rem]"
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                                <div className="absolute bottom-8 left-8 right-8 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-primary-400 tracking-widest uppercase">Browse items</span>
                                        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Fruits Section */}
            <section className="bg-slate-50 py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-xs font-black uppercase tracking-widest">
                                <Apple className="w-4 h-4" /> Orchard Fresh
                            </div>
                            <h2 className="text-5xl font-black text-slate-900">Sweet & Juicy Fruits</h2>
                        </div>
                        <Link to="/products?cat=fruits" className="group flex items-center gap-2 font-bold text-slate-500 hover:text-primary-600 transition-colors">
                            Discover More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {getProductsByCategory('fruits', 4).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>



            {/* Bakery Section */}
            <section className="container mx-auto px-4 pt-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
                        <div className="flex items-end justify-between border-b border-slate-100 pb-8">
                            <div>
                                <h2 className="text-4xl font-black text-slate-900 mb-2">Artisan Bakery</h2>
                                <p className="text-slate-500 font-medium">Baled fresh at dawn, every single day.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {getProductsByCategory('bakery', 4).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                    <div className="lg:col-span-4 rounded-[3.5rem] bg-orange-50 p-12 flex flex-col justify-between relative overflow-hidden group">
                        <div className="relative z-10">
                            <Cookie className="w-12 h-12 text-orange-600 mb-8" />
                            <h3 className="text-4xl font-black text-slate-900 mb-6">Masterfully Crafted</h3>
                            <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">
                                From flaky croissants to rustic sourdough, experience the tradition of artisan baking.
                            </p>
                        </div>
                        <Link to="/products?cat=bakery" className="btn-primary w-fit relative z-10 py-4 px-8 bg-orange-600 hover:bg-orange-700 shadow-xl shadow-orange-200">
                            View All Baked Goods
                        </Link>
                        <div className="absolute -bottom-10 -right-10 text-white/40 opacity-10 group-hover:scale-110 transition-transform duration-[2s]">
                            <Cookie size={320} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Vegetables Section */}
            <section className="bg-slate-900 py-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-600/10 skew-x-12 translate-x-1/2"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-20 space-y-6">
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-primary-600 text-white rounded-full text-xs font-black uppercase tracking-[0.2em]">
                            <Leaf className="w-4 h-4" /> Farm To Table
                        </div>
                        <h2 className="text-5xl lg:text-7xl font-black text-white">Daily Garden Harvest</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium">
                            Pure, organic vegetables grown without pesticides, delivered fresh to preserve vitamins and flavor.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {getProductsByCategory('vegetables', 4).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="mt-20 flex justify-center">
                        <Link to="/products?cat=vegetables" className="btn-primary bg-white text-slate-900 hover:bg-slate-100 py-5 px-12 text-xl font-black rounded-3xl">
                            Explore Full Harvest
                        </Link>
                    </div>
                </div>
            </section>

            {/* Dairy & Snacks (Double Grid) */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Dairy Section */}
                    <div className="space-y-12">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                                    <Milk className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900">Dairy & Eggs</h2>
                            </div>
                            <Link to="/products?cat=dairy" className="text-primary-600 font-bold hover:underline">View All</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {getProductsByCategory('dairy', 2).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>

                    {/* Snacks Section */}
                    <div className="space-y-12">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600">
                                    <IceCream className="w-6 h-6" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-900">Sweet & Salty</h2>
                            </div>
                            <Link to="/products?cat=snacks" className="text-primary-600 font-bold hover:underline">View All</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {getProductsByCategory('snacks', 2).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Beverages Section with Modern Card */}
            <section className="container mx-auto px-4 pb-12">
                <div className="rounded-[4rem] bg-indigo-50/50 p-12 lg:p-24 border border-indigo-100 overflow-hidden relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                        <div className="lg:col-span-4 space-y-8 text-center lg:text-left">
                            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white mx-auto lg:mx-0 shadow-2xl shadow-indigo-600/20">
                                <Wine className="w-10 h-10" />
                            </div>
                            <h2 className="text-5xl font-black text-slate-900 leading-tight">Refreshing <br /> Beverages</h2>
                            <p className="text-slate-500 text-lg font-medium leading-relaxed">
                                From cold-pressed juices to premium coffee beans, find your perfect thirst-quencher.
                            </p>
                            <Link to="/products?cat=beverages" className="btn-primary inline-flex bg-indigo-600 hover:bg-indigo-700 py-4 px-10 text-lg shadow-xl shadow-indigo-200">
                                Explore Drinks
                            </Link>
                        </div>
                        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {getProductsByCategory('beverages', 3).map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
