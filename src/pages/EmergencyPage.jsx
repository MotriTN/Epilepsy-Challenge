import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangle, Phone, CheckCircle, Clock } from 'lucide-react';
import { useEmergency } from '../context/EmergencyContext';
import { getUserData } from '../services/mockData';

const EmergencyPage = () => {
    const { userId } = useParams();
    const { phase, elapsedTime, formatTime, isActive, startEmergency } = useEmergency();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (userId) {
            getUserData(userId).then(data => setUserData(data));
        }
        // Auto-start emergency when landing on this page? 
        // The requirement implies we are in 'Emergency State'. 
        // Maybe we should start it if not active, or provide a button.
        // The user request says "Generate the 'Emergency State' UI", implying it's active.
        // For now, let's assume valid ID means we potentially entered emergency mode, 
        // but usually a user would click "Help" to start. 
        // However, the prompt asks for "Action Button: Alert Emergency Contacts" and "Header: MEDICAL EMERGENCY DETECTED".
        // This suggests the emergency IS detected.
        if (!isActive) {
            startEmergency();
        }
    }, [userId, isActive, startEmergency]);

    if (!userData) return <div className="p-8 text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col">
            {/* Header: Red, pulsing slowly (1Hz) */}
            <header className="bg-red-600 p-6 text-center animate-pulse shadow-lg sticky top-0 z-50">
                <div className="flex items-center justify-center gap-3">
                    <AlertTriangle size={32} className="text-white" />
                    <h1 className="text-2xl font-black tracking-wider uppercase">
                        Medical Emergency Detected
                    </h1>
                </div>
            </header>

            <main className="flex-1 p-6 flex flex-col gap-8 max-w-md mx-auto w-full">
                {/* Timer & Status */}
                <div className="bg-slate-800 rounded-xl p-6 border-2 border-slate-700 text-center">
                    <h2 className="text-xl text-slate-400 mb-2 font-bold">Time Elapsed</h2>
                    <div className="text-6xl font-mono font-bold text-yellow-500 mb-4">
                        {formatTime(isActive ? elapsedTime : 0)}
                    </div>
                    <div className="inline-block px-4 py-2 rounded-full bg-slate-700 text-slate-200 font-bold">
                        Phase: {phase}
                    </div>
                </div>

                {/* Action Button: Massive */}
                <button
                    onClick={() => alert(`Calling ${userData.emergencyContacts[0].name}...`)}
                    className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-2xl py-8 rounded-2xl shadow-xl transform transition hover:scale-[1.02] active:scale-[0.98] border-4 border-red-500 flex items-center justify-center gap-4"
                    style={{ minHeight: '120px' }} // Ensure massive size
                >
                    <Phone size={40} />
                    <span>Alert Contacts</span>
                </button>

                {/* Instruction Card */}
                <div className="bg-[#0f172a] rounded-xl overflow-hidden border-2 border-[#1e293b] shadow-2xl">
                    <div className="bg-[#1e293b] p-4 border-b border-slate-700">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <CheckCircle className="text-[#ef4444]" />
                            Immediate Actions
                        </h3>
                    </div>
                    <div className="p-6">
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ef4444] text-white flex items-center justify-center font-bold text-lg">1</span>
                                <p className="text-lg font-bold text-slate-200">Turn person on their side.</p>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ef4444] text-white flex items-center justify-center font-bold text-lg">2</span>
                                <p className="text-lg font-bold text-slate-200">Protect head from injury.</p>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ef4444] text-white flex items-center justify-center font-bold text-lg">3</span>
                                <p className="text-lg font-bold text-slate-200">Do NOT restrain movements.</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* User Info Card (High Contrast) */}
                <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
                    <h3 className="text-lg font-bold text-slate-400 mb-2">Patient</h3>
                    <p className="text-2xl font-bold">{userData.name}</p>
                    <p className="text-red-400 font-bold mt-1">{userData.medicalConditions[0]}</p>
                </div>
            </main>
        </div>
    );
};

export default EmergencyPage;
