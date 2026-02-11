import React from 'react';
import { Link } from 'react-router-dom';
import { User, Activity, Bell, Settings, ExternalLink } from 'lucide-react';

const DashboardPage = () => {
    return (
        <div className="min-h-screen bg-cyber-navy text-white p-6 pb-24 font-sans">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-black tracking-tight">Your Dashboard</h1>
                <div className="flex gap-4">
                    <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                        <Bell size={20} className="text-slate-400" />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition">
                        <Settings size={20} className="text-slate-400" />
                    </button>
                </div>
            </div>

            <div className="grid gap-6 max-w-lg mx-auto">
                {/* Profile Card */}
                <div className="glass-card p-6 rounded-2xl border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <User size={120} />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full bg-electric-blue/20 flex items-center justify-center text-electric-blue border border-electric-blue/30">
                            <span className="text-2xl font-bold">JD</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">John Doe</h2>
                            <p className="text-slate-400 text-sm">Premium Member</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm border-b border-slate-700/50 pb-2">
                            <span className="text-slate-400">Condition</span>
                            <span className="font-bold text-white">Tonic-Clonic</span>
                        </div>
                        <div className="flex justify-between text-sm pt-1">
                            <span className="text-slate-400">Emergency Contacts</span>
                            <span className="font-bold text-white">3 Active</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <h3 className="text-lg font-bold text-slate-300 mt-2">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                    <Link to="/help/123" className="glass-card p-4 rounded-xl text-center hover:bg-slate-800 transition group border border-slate-700">
                        <Activity className="mx-auto text-electric-blue mb-2 group-hover:scale-110 transition" size={32} />
                        <span className="font-bold text-sm block">Simulate Emergency</span>
                    </Link>
                    <button className="glass-card p-4 rounded-xl text-center hover:bg-slate-800 transition group border border-slate-700">
                        <ExternalLink className="mx-auto text-neon-cyan mb-2 group-hover:scale-110 transition" size={32} />
                        <span className="font-bold text-sm block">Share Profile</span>
                    </button>
                </div>

                {/* Device Status */}
                <div className="glass-card p-6 rounded-2xl border border-slate-700 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold mb-1">AuraLink One</h3>
                        <p className="text-green-400 text-sm flex items-center gap-2">● Connected</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black">94%</p>
                        <p className="text-xs text-slate-500">Battery</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
