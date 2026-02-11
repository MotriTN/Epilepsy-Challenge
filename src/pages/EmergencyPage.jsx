import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangle, Phone, CheckCircle, Clock, ShieldCheck, ChevronRight, ChevronLeft, MessageSquare, MapPin } from 'lucide-react';
import { useEmergency } from '../context/EmergencyContext';
import { getUserData } from '../services/mockData';

const EmergencyPage = () => {
    const { userId } = useParams();
    const {
        phase,
        elapsedTime,
        formatTime,
        isActive,
        startEmergency,
        triggerRecovery,
        currentStep,
        nextStep,
        prevStep
    } = useEmergency();

    const [userData, setUserData] = useState(null);
    const [showTriage, setShowTriage] = useState(true);
    const [location, setLocation] = useState(null);
    const hasAnnouncedRecovery = useRef(false);

    useEffect(() => {
        if (userId) {
            getUserData(userId).then(data => setUserData(data));
        }
    }, [userId]);

    // Geolocation
    const hasFetchedLocation = useRef(false);

    useEffect(() => {
        if (phase === 'RECOVERY' && !hasFetchedLocation.current) {
            hasFetchedLocation.current = true; // Mark as fetched
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLocation({
                            lat: position.coords.latitude.toFixed(4),
                            lng: position.coords.longitude.toFixed(4)
                        });
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        setLocation({ lat: 'Unavailable', lng: 'Unavailable' });
                    }
                );
            } else {
                // Avoid synchronous state update warning
                setTimeout(() => {
                    setLocation({ lat: 'Unavailable', lng: 'Unavailable' });
                }, 0);
            }
        }
    }, [phase]);

    // TTS Logic for Recovery
    useEffect(() => {
        if (phase === 'RECOVERY' && userData && !hasAnnouncedRecovery.current) {
            const text = "You are safe. Stay still. We have notified your family."; // Updated Text
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
                hasAnnouncedRecovery.current = true;
            }
        }
    }, [phase, userData]);

    const handleTriageSelection = (offset) => {
        startEmergency(offset);
        setShowTriage(false);
    };

    if (!userData) return <div className="p-8 text-white">Loading...</div>;

    const isRecovery = phase === 'RECOVERY';
    const isDanger = phase === 'DANGER';

    // Steps Logic
    const steps = [
        {
            id: 1,
            title: "Protect",
            instruction: "Turn person on their side.",
            icon: <ShieldCheck size={48} className="text-yellow-400" />
        },
        {
            id: 2,
            title: "Safety",
            instruction: "Clear the area of sharp objects.",
            icon: <AlertTriangle size={48} className="text-orange-400" />
        },
        {
            id: 3,
            title: "Airway",
            instruction: "Do not put anything in their mouth.",
            icon: <CheckCircle size={48} className="text-red-400" />
        }
    ];

    const currentStepData = steps[currentStep] || steps[steps.length - 1];

    return (
        <div className={`min-h-screen ${isRecovery ? 'bg-[#1e40af]' : 'bg-slate-900'} text-white flex flex-col transition-colors duration-1000 pb-24 relative overflow-hidden`}>

            {/* DANGER OVERLAY */}
            {isDanger && (
                <div className="absolute inset-0 bg-red-600/30 z-[40] pointer-events-none animate-pulse"></div>
            )}

            {/* Triage Modal */}
            {showTriage && !isActive && (
                <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-6 space-y-6">
                    <h2 className="text-3xl font-black text-center mb-8">When did the seizure start?</h2>

                    <button
                        onClick={() => handleTriageSelection(0)}
                        className="w-full bg-green-600 p-6 rounded-2xl text-2xl font-bold shadow-lg active:scale-95 transition-transform"
                    >
                        Just now
                    </button>

                    <button
                        onClick={() => handleTriageSelection(120)}
                        className="w-full bg-yellow-600 p-6 rounded-2xl text-2xl font-bold shadow-lg active:scale-95 transition-transform"
                    >
                        About 2 minutes ago
                    </button>

                    <button
                        onClick={() => handleTriageSelection(300)}
                        className="w-full bg-red-600 p-6 rounded-2xl text-2xl font-bold shadow-lg active:scale-95 transition-transform"
                    >
                        More than 5 minutes ago
                    </button>
                </div>
            )}

            {/* Header */}
            <header className={`${isRecovery ? 'bg-blue-900' : isDanger ? 'bg-red-700 animate-pulse' : 'bg-red-600'} p-6 text-center shadow-lg sticky top-0 z-50`}>
                <div className="flex items-center justify-center gap-3">
                    {isRecovery ? <ShieldCheck size={32} /> : <AlertTriangle size={32} />}
                    <h1 className="text-2xl font-black tracking-wider uppercase">
                        {isRecovery ? 'Recovery Mode Detected' : isDanger ? 'DANGER: CALL 911' : 'Medical Emergency Detected'}
                    </h1>
                </div>
            </header>

            <main className="flex-1 p-6 flex flex-col gap-6 max-w-md mx-auto w-full z-10">
                {/* Timer */}
                <div className="bg-slate-800/50 rounded-xl p-6 border-2 border-slate-700 text-center backdrop-blur-sm">
                    <h2 className="text-xl text-slate-300 mb-2 font-bold">Time Elapsed</h2>
                    <div className={`text-6xl font-mono font-bold ${isRecovery ? 'text-blue-200' : isDanger ? 'text-red-500 animate-pulse' : 'text-yellow-500'}`}>
                        {formatTime(isActive ? elapsedTime : 0)}
                    </div>
                </div>

                {isRecovery ? (
                    // Recovery Dashboard
                    <div className="bg-blue-900/50 p-8 rounded-2xl border-4 border-blue-400 text-center animate-fade-in">
                        <p className="text-4xl font-bold leading-tight mb-8">You are safe.</p>
                        <p className="text-2xl mb-4">Your name is <span className="font-black text-blue-200 block mt-2">{userData.name}</span></p>

                        <div className="bg-blue-950 p-4 rounded-xl mt-6">
                            <p className="text-lg opacity-90 flex items-center justify-center gap-2 mb-2">
                                <MapPin size={20} /> Current Location
                            </p>
                            {location ? (
                                <p className="font-mono text-xl">{location.lat}, {location.lng}</p>
                            ) : (
                                <p className="text-sm animate-pulse">Locating...</p>
                            )}
                        </div>

                        <p className="text-xl opacity-80 mt-6">Address: {userData.address}</p>
                    </div>
                ) : isDanger ? (
                    // DANGER Dashboard
                    <div className="flex flex-col gap-6 animate-shake">
                        <div className="bg-red-900/80 p-6 rounded-2xl border-4 border-red-500 text-center">
                            <h2 className="text-3xl font-black text-white mb-4">SEIZURE &gt; 5 MINS</h2>
                            <p className="text-xl text-red-100 mb-8">This is a life-threatening emergency.</p>

                            <a
                                href="tel:911"
                                className="w-full bg-white text-red-700 font-black text-3xl py-8 rounded-xl shadow-2xl flex items-center justify-center gap-4 animate-bounce"
                            >
                                <Phone size={48} /> CALL 911 NOW
                            </a>
                        </div>
                        {/* Manual Override Button in Danger too, just in case */}
                        <button
                            onClick={triggerRecovery}
                            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold text-lg py-4 rounded-xl border-2 border-slate-500"
                        >
                            I'm Safe / End Emergency
                        </button>
                    </div>
                ) : (
                    // Tunnel Experience
                    <div className="flex-1 flex flex-col">
                        <div className="bg-slate-800 rounded-2xl p-8 border-2 border-slate-600 flex-1 flex flex-col items-center justify-center text-center shadow-2xl mb-6">
                            <div className="mb-6">{currentStepData.icon}</div>
                            <h3 className="text-3xl font-black mb-4 text-white">{currentStepData.title}</h3>
                            <p className="text-2xl font-bold text-slate-200">{currentStepData.instruction}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className={`h-20 rounded-xl font-bold text-xl flex items-center justify-center gap-2 ${currentStep === 0 ? 'bg-slate-800 text-slate-600' : 'bg-slate-700 text-white active:bg-slate-600'}`}
                            >
                                <ChevronLeft size={32} /> Back
                            </button>
                            <button
                                onClick={nextStep}
                                disabled={currentStep >= steps.length - 1}
                                className={`h-20 rounded-xl font-bold text-xl flex items-center justify-center gap-2 ${currentStep >= steps.length - 1 ? 'bg-slate-800 text-slate-600' : 'bg-blue-600 text-white active:bg-blue-500'}`}
                            >
                                Next <ChevronRight size={32} />
                            </button>
                        </div>

                        {/* Manual Override Button */}
                        <button
                            onClick={triggerRecovery}
                            className="w-full mt-6 bg-slate-700 hover:bg-slate-600 text-white font-bold text-lg py-4 rounded-xl border-2 border-slate-500"
                        >
                            I'm Safe / End Emergency
                        </button>
                    </div>
                )}
            </main>

            {/* Sticky Footer */}
            <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t-2 border-slate-800 p-4 z-50">
                <div className="max-w-md mx-auto grid grid-cols-2 gap-4">
                    <a
                        href={`sms:?body=I am with ${userData.name}. They are having a seizure at ${userData.address}.`}
                        className="bg-green-600 hover:bg-green-700 text-white font-bold h-[60px] rounded-xl flex items-center justify-center gap-2 shadow-lg"
                    >
                        <MessageSquare size={24} /> SMS Family
                    </a>
                    <a
                        href={`tel:${userData.emergencyContacts[0].phone}`}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold h-[60px] rounded-xl flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Phone size={24} /> Call 911
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EmergencyPage;
