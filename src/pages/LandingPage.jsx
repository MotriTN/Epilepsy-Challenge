import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Watch, ShieldCheck, Activity, ChevronDown, Globe, Heart, Smartphone, Clock, MapPin, MessageSquare } from 'lucide-react';

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
                    Solving Bystander Panic • 2026
                </div>
                <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    One Scan. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-cyan filter drop-shadow-lg">
                        Zero Panic.
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    When someone has a seizure, bystanders freeze. AuraLink guides them step-by-step through the crisis—no medical training required.
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

            {/* The Problem Section */}
            <section className="py-24 bg-slate-900/50 border-y border-slate-800">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">The Bystander Panic Problem</h2>
                        <p className="text-slate-400 text-lg">When seizures happen in public, strangers want to help but don't know how.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">❌</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Confusion</h3>
                            <p className="text-slate-400">Bystanders don't know if they should call 911 or wait it out.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">⏰</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Missing Time</h3>
                            <p className="text-slate-400">They don't know when the seizure started—critical info for emergency dispatch.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-4xl">📞</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">No Contact Info</h3>
                            <p className="text-slate-400">Even if they want to help, they can't reach the person's family.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works - The Tunnel */}
            <section className="py-24 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4">The Tunnel Experience</h2>
                    <p className="text-slate-400 text-lg">One instruction at a time. No overwhelming menus. Just clarity.</p>
                </div>

                <div className="space-y-6">
                    {[
                        {
                            step: "1",
                            icon: <Smartphone className="text-electric-blue" size={32} />,
                            title: "They Scan",
                            desc: "A stranger sees 'SCAN ME' on your wearable. They scan with any phone—no app download needed."
                        },
                        {
                            step: "2",
                            icon: <Clock className="text-neon-cyan" size={32} />,
                            title: "Triage Begins",
                            desc: "The app asks: 'Did this just start?' or 'I found them like this.' A timer starts automatically."
                        },
                        {
                            step: "3",
                            icon: <Activity className="text-purple-400" size={32} />,
                            title: "Step-by-Step Guidance",
                            desc: "Large, clear instructions: 'Protect their head.' → 'Turn them on their side.' → 'Do NOT restrain them.'"
                        },
                        {
                            step: "4",
                            icon: <ShieldCheck className="text-green-400" size={32} />,
                            title: "Smart Escalation",
                            desc: "At 5 minutes, the screen pulses red: 'CALL 911 NOW.' The app knows the local emergency number (190 in Tunisia, 911 in US)."
                        },
                        {
                            step: "5",
                            icon: <MapPin className="text-orange-400" size={32} />,
                            title: "Instant Family Contact",
                            desc: "Two taps sends an SMS to family with GPS coordinates and a Google Maps link: 'Alex needs help. He's here: [map].'"
                        },
                        {
                            step: "6",
                            icon: <MessageSquare className="text-blue-400" size={32} />,
                            title: "Post-Seizure Recovery",
                            desc: "When it's over, tap 'I'm Safe.' The app speaks aloud: 'Alex, you are safe. You are in Sfax Park. Your mother is on her way.'"
                        }
                    ].map((item, i) => (
                        <div key={i} className="glass-card rounded-2xl p-8 hover:border-electric-blue/30 transition-all duration-300 group">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center font-black text-2xl text-electric-blue border-2 border-slate-700 group-hover:border-electric-blue transition">
                                        {item.step}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                        {item.icon}
                                        <h3 className="text-2xl font-bold">{item.title}</h3>
                                    </div>
                                    <p className="text-slate-300 text-lg leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Real Scenario */}
            <section className="py-24 bg-gradient-to-b from-slate-900/50 to-transparent border-y border-slate-800">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-black mb-4">A Real Scenario</h2>
                        <p className="text-slate-400">See how AuraLink turns panic into protocol.</p>
                    </div>

                    <div className="glass-card rounded-3xl p-10 space-y-6 text-lg leading-relaxed text-slate-300">
                        <p>
                            <span className="font-bold text-white">Alex</span> is jogging in the park when he has a tonic-clonic seizure.
                            A stranger, <span className="font-bold text-white">Sarah</span>, sees him collapse.
                        </p>
                        <p>
                            She notices his <span className="text-electric-blue font-bold">AuraLink Sport bracelet</span> with the words "SCAN ME" glowing on the band.
                        </p>
                        <p>
                            Sarah scans it with her phone. Instantly, the AuraLink protocol loads—no app store, no login, no delay.
                        </p>
                        <p>
                            <span className="text-neon-cyan font-bold">"Did this just start?"</span> Sarah taps <span className="font-bold">"Just Now."</span> A timer begins.
                        </p>
                        <p>
                            The screen shows in huge letters: <span className="text-white font-black">"STEP 1: Protect their head."</span> Sarah grabs her jacket and cushions Alex's head.
                        </p>
                        <p>
                            She taps <span className="font-bold">"Next."</span> The app shows: <span className="text-white font-black">"Turn them on their side."</span> She does it.
                        </p>
                        <p>
                            At the 5-minute mark, the screen pulses <span className="text-red-500 font-bold">RED</span>.
                            <span className="text-white font-black"> "SEIZURE > 5 MINS. CALL 911 NOW."</span>
                        </p>
                        <p>
                            While on the phone with dispatch, Sarah taps <span className="font-bold">"SMS Family."</span> Alex's mother receives:
                            <span className="italic text-slate-400"> "Alex needs help. He's at Sfax Park. [Google Maps Link]."</span>
                        </p>
                        <p>
                            The seizure stops. Alex is confused, disoriented. Sarah taps <span className="font-bold text-green-400">"I'm Safe."</span>
                        </p>
                        <p>
                            The app's background turns calming blue. A voice speaks from Sarah's phone:
                            <span className="italic text-blue-300"> "Alex, you are safe. You are in Sfax Park. Your mother is on her way."</span>
                        </p>
                        <p className="text-white font-bold pt-4 border-t border-slate-700">
                            Sarah didn't panic. She didn't freeze. AuraLink guided her every step of the way.
                        </p>
                    </div>
                </div>
            </section>

            {/* Knowledge Section */}
            <section className="py-24 bg-slate-900/30">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <Heart className="mx-auto text-red-500 mb-4" size={48} />
                        <h2 className="text-4xl font-black mb-4">Understanding Seizures</h2>
                        <p className="text-slate-400">Knowledge empowers everyone to help safely.</p>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                title: "What is a Tonic-Clonic Seizure?",
                                desc: "Also known as 'Grand Mal,' it involves sudden loss of consciousness and violent muscle contractions. The person may cry out, fall, and convulse. AuraLink is optimized for this type."
                            },
                            {
                                title: "The Critical 5-Minute Rule",
                                desc: "Most seizures last 1-2 minutes. If a seizure continues past 5 minutes, it becomes a medical emergency called Status Epilepticus. This requires immediate 911 intervention."
                            },
                            {
                                title: "First Aid: Do NOT Restrain",
                                desc: "Never hold the person down or put anything in their mouth—this causes injury. Instead: cushion their head, turn them on their side (recovery position), and time the seizure."
                            },
                            {
                                title: "After the Seizure: The Confusion Phase",
                                desc: "When a seizure ends, the person may not know who they are or where they are. Speaking their name calmly and telling them their location helps them reorient safely."
                            }
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
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black mb-4">The Collection</h2>
                    <p className="text-slate-400 text-lg">Discreet. Durable. Life-saving.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { name: "The Sport", price: "$29.00", color: "bg-orange-500", desc: "Sweat-proof silicone for active lifestyles.", badge: "MOST POPULAR" },
                        { name: "The Pendant", price: "$35.00", color: "bg-purple-500", desc: "Elegant minimalism. Worn close to the heart.", badge: null },
                        { name: "The Classic", price: "$29.00", color: "bg-blue-500", desc: "Our original medical ID band. Timeless safety.", badge: null }
                    ].map((item, i) => (
                        <div key={i} className="glass-card rounded-3xl overflow-hidden hover:scale-105 transition-transform duration-500 group relative">
                            {item.badge && (
                                <div className="absolute top-4 left-4 bg-electric-blue text-black text-xs font-black px-3 py-1 rounded-full z-10">
                                    {item.badge}
                                </div>
                            )}
                            <div className={`h-48 ${item.color} relative overflow-hidden flex items-center justify-center`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
                                <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full border-2 border-white/50 flex items-center justify-center animate-pulse-slow">
                                    <Activity size={32} className="text-white" />
                                </div>
                                <div className="absolute bottom-4 right-4 bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                    SCAN ME
                                </div>
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

            {/* Final CTA */}
            <section className="py-24 px-6 text-center max-w-4xl mx-auto">
                <div className="glass-card rounded-3xl p-12 bg-gradient-to-br from-electric-blue/5 to-neon-cyan/5 border-2 border-electric-blue/20">
                    <h2 className="text-4xl md:text-5xl font-black mb-6">
                        Turn Strangers Into <span className="text-electric-blue">Lifesavers</span>
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                        Join thousands who've chosen to wear confidence. Because when seconds count, you shouldn't leave help to chance.
                    </p>
                    <Link
                        to="/dashboard"
                        className="inline-block px-10 py-5 bg-electric-blue text-black font-black text-lg rounded-full hover:bg-neon-cyan transition shadow-2xl shadow-electric-blue/20"
                    >
                        Get Protected Today
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 text-center text-slate-600 text-sm border-t border-slate-800">
                <div className="flex justify-center gap-6 mb-8">
                    <ShieldCheck className="text-slate-700" />
                    <Activity className="text-slate-700" />
                    <Heart className="text-slate-700" />
                </div>
                <p className="mb-2">&copy; 2026 AuraLink. Medical decisions should be made by professionals.</p>
                <p className="text-slate-700 text-xs">AuraLink provides guidance tools and is not a substitute for professional medical care.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
