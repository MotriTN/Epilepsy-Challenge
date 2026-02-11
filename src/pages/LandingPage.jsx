import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Watch, ShieldCheck, Activity, ChevronDown, Globe, Heart } from 'lucide-react';

const LandingPage = () => {
    const { t, i18n } = useTranslation();
    const [cartCount, setCartCount] = useState(0);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="min-h-screen bg-cyber-navy text-white font-sans selection:bg-electric-blue selection:text-black">
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-card px-6 py-4 flex justify-between items-center transition-all duration-300">
                <div className="flex items-center gap-2">
                    <Activity className="text-electric-blue animate-pulse-slow" size={32} />
                    <span className="text-2xl font-black tracking-tighter text-glow">AuraLink</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition">
                            <Globe size={18} /> {i18n.language.toUpperCase()}
                        </button>
                        <div className="absolute right-0 mt-2 w-32 bg-slate-800 rounded-xl shadow-xl overflow-hidden hidden group-hover:block border border-slate-700">
                            <button onClick={() => changeLanguage('en')} className="block w-full text-left px-4 py-2 hover:bg-slate-700 text-sm">English</button>
                            <button onClick={() => changeLanguage('fr')} className="block w-full text-left px-4 py-2 hover:bg-slate-700 text-sm">Français</button>
                            <button onClick={() => changeLanguage('ar')} className="block w-full text-left px-4 py-2 hover:bg-slate-700 text-sm">العربية</button>
                        </div>
                    </div>

                    <Link to="/dashboard" className="hidden sm:block px-5 py-2 bg-slate-800 hover:bg-slate-700 rounded-full font-bold border border-slate-700 transition text-sm">
                        Sign In
                    </Link>
                    <div className="relative cursor-pointer" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
                        <Watch size={24} className="text-slate-300 hover:text-white transition" />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 text-center max-w-5xl mx-auto">
                <div className="inline-block px-4 py-1.5 rounded-full bg-electric-blue/10 border border-electric-blue/30 text-electric-blue text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
                    Series A Launch • 2026
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    The Bracelet That Speaks <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-cyan filter drop-shadow-lg">
                        When You Can't.
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    Automated seizure detection, GPS emergency dispatch, and instant medical ID access. All in a discreet, waterproof wearable.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-white text-cyber-navy font-black rounded-full hover:bg-slate-200 transition shadow-lg shadow-white/10 flex items-center justify-center gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-6 h-6" />
                        Join with Google
                    </Link>
                    <Link to="/help/123" className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-slate-700 text-white font-bold rounded-full hover:border-electric-blue hover:text-electric-blue transition">
                        View Demo Protocol
                    </Link>
                </div>
            </section>

            {/* About Epilepsy Section */}
            <section className="py-24 bg-slate-900 border-y border-slate-800">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <Heart className="mx-auto text-red-500 mb-4" size={48} />
                        <h2 className="text-4xl font-black mb-4">Understanding Epilepsy</h2>
                        <p className="text-slate-400">Knowledge is the first step to safety.</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            { title: "What is a Tonic-Clonic Seizure?", desc: "Ideally known as 'Grand Mal', it involves loss of consciousness and violent muscle contractions. It's the type AuraLink is optimized to support." },
                            { title: "The '3 Minute' Rule", desc: "Most seizures end within 2 minutes. If a seizure lasts longer than 5 minutes, it is a medical emergency (Status Epilepticus) effectively requiring immediate 911 intervention." },
                            { title: "First Aid: Do NOT Restrain", desc: "Never hold a person down or put anything in their mouth. This can cause injury. Instead, cushion their head and turn them on their side." }
                        ].map((item, i) => (
                            <details key={i} className="group glass-card rounded-2xl open:bg-slate-800/80 transition-colors duration-300">
                                <summary className="p-6 font-bold text-lg cursor-pointer flex justify-between items-center list-none select-none">
                                    <span>{item.title}</span>
                                    <ChevronDown className="text-slate-500 group-open:rotate-180 transition-transform duration-300" />
                                </summary>
                                <div className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-slate-700/50 pt-4 mt-2">
                                    {item.desc}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product Showcase */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <h2 className="text-4xl font-black text-center mb-16">The Collection</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: "The Sport", price: "$29.00", color: "bg-orange-500", desc: "Sweat-proof silicone for active lifestyles." },
                        { name: "The Pendant", price: "$35.00", color: "bg-purple-500", desc: "Elegant minimalism. Worn close to the heart." },
                        { name: "The Classic", price: "$29.00", color: "bg-blue-500", desc: "Our original medical ID band. Timeless safety." }
                    ].map((item, i) => (
                        <div key={i} className="glass-card rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-500 group">
                            <div className={`h-48 ${item.color} relative overflow-hidden flex items-center justify-center`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
                                {/* Center UI */}
                                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full border-2 border-white/50 flex items-center justify-center animate-pulse-slow">
                                    <Activity size={32} className="text-white" />
                                </div>
                                <div className="absolute bottom-4 right-4 bg-white text-black text-xs font-bold px-2 py-1 rounded">SCAN ME</div>
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold">{item.name}</h3>
                                    <span className="text-xl font-bold text-electric-blue">{item.price}</span>
                                </div>
                                <p className="text-slate-400 mb-8 h-12">{item.desc}</p>
                                <button
                                    onClick={() => setCartCount(c => c + 1)}
                                    className="w-full py-4 bg-slate-800 hover:bg-electric-blue hover:text-black font-bold rounded-xl border border-slate-600 hover:border-transparent transition-all"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 text-center text-slate-600 text-sm border-t border-slate-800">
                <div className="flex justify-center gap-6 mb-8">
                    <ShieldCheck className="text-slate-700" />
                    <Activity className="text-slate-700" />
                    <Heart className="text-slate-700" />
                </div>
                <p>&copy; 2026 AuraLink. Medical decisions should be made by professionals.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
