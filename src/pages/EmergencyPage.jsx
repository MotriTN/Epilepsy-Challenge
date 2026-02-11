import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { AlertTriangle, Phone, CheckCircle, Clock, ShieldCheck, ChevronRight, ChevronLeft, MessageSquare, MapPin, Info, ExternalLink } from 'lucide-react';
import { useEmergency } from '../context/EmergencyContext';
import { getUserData } from '../services/mockData';
import ConfirmationModal from '../components/ConfirmationModal';
import { useTranslation } from 'react-i18next';

const EmergencyPage = () => {
    const { userId } = useParams();
    const { t, i18n } = useTranslation();
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
    const [showInfo, setShowInfo] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'call' or 'sms'

    const hasAnnouncedRecovery = useRef(false);
    const hasFetchedLocation = useRef(false);

    useEffect(() => {
        if (userId) {
            getUserData(userId).then(data => setUserData(data));
        }
    }, [userId]);

    // Geolocation
    useEffect(() => {
        if (phase === 'RECOVERY' && !hasFetchedLocation.current) {
            hasFetchedLocation.current = true;
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
                setTimeout(() => {
                    setLocation({ lat: 'Unavailable', lng: 'Unavailable' });
                }, 0);
            }
        }
    }, [phase]);

    // TTS Logic for Recovery
    useEffect(() => {
        if (phase === 'RECOVERY' && userData && !hasAnnouncedRecovery.current) {
            const text = "You are safe. Stay still. We have notified your family.";
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 0.9;
                window.speechSynthesis.speak(utterance);
                hasAnnouncedRecovery.current = true;
            }
        }
    }, [phase, userData]);

    const handleTriageSelection = (offset, meta = {}) => {
        startEmergency(offset, meta);
        setShowTriage(false);
    };

    // Action Handlers
    const handleActionClick = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const confirmAction = () => {
        setIsModalOpen(false);

        if (modalType === 'call') {
            // Dynamic Number Logic
            const emergencyNumber = (i18n.language === 'fr' || i18n.language === 'ar' || navigator.language.includes('TN')) ? '190' : '911';
            window.location.href = `tel:${emergencyNumber}`;
        } else if (modalType === 'sms') {
            // Smart SMS Logic
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    const mapLink = `https://www.google.com/maps?q=${lat},${lng}`;
                    const body = `EMERGENCY: ${userData.name} is having a seizure! Track location here: ${mapLink}`;
                    window.location.href = `sms:?body=${encodeURIComponent(body)}`;
                }, (err) => {
                    // Fallback without location
                    const body = `EMERGENCY: ${userData.name} is having a seizure!`;
                    window.location.href = `sms:?body=${encodeURIComponent(body)}`;
                });
            } else {
                const body = `EMERGENCY: ${userData.name} is having a seizure!`;
                window.location.href = `sms:?body=${encodeURIComponent(body)}`;
            }
        }
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
        <div className={`min-h-screen ${isRecovery ? 'bg-[#1e40af]' : 'bg-slate-900'} text-white flex flex-col transition-colors duration-1000 pb-32 relative overflow-hidden`}>

            <ConfirmationModal
                isOpen={isModalOpen}
                type={modalType}
                onConfirm={confirmAction}
                onCancel={() => setIsModalOpen(false)}
            />

            {/* DANGER OVERLAY */}
            {isDanger && (
                <div className="absolute inset-0 bg-red-600/30 z-[40] pointer-events-none animate-pulse"></div>
            )}

            {/* Triage Modal */}
            {showTriage && !isActive && (
                <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center p-6 space-y-4 overflow-y-auto">
                    <h2 className="text-3xl font-black text-center mb-6">When did the seizure start?</h2>

                    <button onClick={() => handleTriageSelection(0)} className="w-full bg-green-600 p-6 rounded-2xl text-2xl font-bold shadow-lg active:scale-95 transition-transform">
                        Just now
                    </button>

                    <button onClick={() => handleTriageSelection(120)} className="w-full bg-yellow-600 p-6 rounded-2xl text-2xl font-bold shadow-lg active:scale-95 transition-transform">
                        About 2 minutes ago
                    </button>

                    <button onClick={() => handleTriageSelection(0, { uncertain: true })} className="w-full bg-slate-600 p-6 rounded-2xl text-2xl font-bold shadow-lg active:scale-95 transition-transform border-2 border-slate-500">
                        I don't know exactly
                        <span className="block text-sm font-normal text-slate-300 mt-1">(Starts timer at 0:00)</span>
                    </button>

                    <button onClick={() => handleTriageSelection(300)} className="w-full bg-red-600 p-6 rounded-2xl text-2xl font-bold shadow-lg active:scale-95 transition-transform">
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
                {/* Step Progress Bar (Only in Emergency Phase) */}
                {!isRecovery && !isDanger && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {steps.map((step, index) => (
                            <div key={step.id} className="flex items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === currentStep ? 'bg-white text-slate-900' : 'bg-black/20 text-white/50'}`}>
                                    {step.id}
                                </div>
                                {index < steps.length - 1 && <div className={`w-8 h-1 mx-1 ${index < currentStep ? 'bg-white' : 'bg-black/20'}`} />}
                            </div>
                        ))}
                    </div>
                )}
            </header>

            <main className="flex-1 p-6 flex flex-col gap-6 max-w-md mx-auto w-full z-10">
                {/* Timer */}
                <div className="bg-slate-800/50 rounded-xl p-6 border-2 border-slate-700 text-center backdrop-blur-sm relative">
                    <button onClick={() => setShowInfo(!showInfo)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                        <Info size={24} />
                    </button>

                    {showInfo && (
                        <div className="absolute inset-0 bg-slate-900/95 z-10 flex flex-col items-center justify-center rounded-xl p-4 text-left">
                            <h4 className="font-bold text-lg mb-2 text-blue-300">Seizure Safety</h4>
                            <p className="text-sm text-slate-300 mb-2">• Most seizures end &lt; 2 mins.</p>
                            <p className="text-sm text-slate-300 mb-2">• &gt; 5 mins is a medical emergency.</p>
                            <button onClick={() => setShowInfo(false)} className="mt-2 bg-slate-700 px-4 py-2 rounded-lg text-sm font-bold">Close</button>
                        </div>
                    )}

                    <h2 className="text-xl text-slate-300 mb-2 font-bold">Time Elapsed</h2>
                    <div className={`text-6xl font-mono font-bold ${isRecovery ? 'text-blue-200' : isDanger ? 'text-red-500 animate-pulse' : 'text-yellow-500'}`}>
                        {formatTime(isActive ? elapsedTime : 0)}
                    </div>
                </div>

                {isRecovery ? (
                    // Recovery Dashboard
                    <div className="bg-blue-900/50 p-8 rounded-2xl border-4 border-blue-400 text-center animate-fade-in relative overflow-hidden">
                        {/* Breathing Animation Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full animate-ping pointer-events-none" style={{ animationDuration: '4s' }}></div>

                        <p className="text-4xl font-bold leading-tight mb-8 relative z-10">You are safe.</p>

                        <div className="mb-6 relative z-10">
                            <p className="text-xl text-blue-200 opacity-80 mb-1">Patient</p>
                            <p className="text-3xl font-black">{userData.name}</p>
                            <p className="text-blue-300 font-bold mt-1">{userData.medicalConditions[0]}</p>
                        </div>

                        <div className="bg-blue-950 p-4 rounded-xl mt-6 relative z-10">
                            <p className="text-lg opacity-90 flex items-center justify-center gap-2 mb-2">
                                <MapPin size={20} /> Current Location
                            </p>
                            {location ? (
                                <>
                                    <p className="font-mono text-xl mb-3">{location.lat}, {location.lng}</p>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                                    >
                                        <ExternalLink size={16} /> View on Map
                                    </a>
                                </>
                            ) : (
                                <p className="text-sm animate-pulse">Locating...</p>
                            )}
                        </div>
                    </div>
                ) : isDanger ? (
                    // DANGER Dashboard
                    <div className="flex flex-col gap-6 animate-shake">
                        <div className="bg-red-900/80 p-6 rounded-2xl border-4 border-red-500 text-center">
                            <h2 className="text-3xl font-black text-white mb-4">SEIZURE &gt; 5 MINS</h2>
                            <p className="text-xl text-red-100 mb-8">This is a life-threatening emergency.</p>
                            <button
                                onClick={() => handleActionClick('call')}
                                className="w-full bg-white text-red-600 font-black text-2xl py-6 rounded-xl shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-3"
                            >
                                <Phone size={32} /> CALL EMERGENCY
                            </button>
                        </div>
                        <button onClick={triggerRecovery} className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold text-lg py-4 rounded-xl border-2 border-slate-500">
                            I'm Safe / End Emergency
                        </button>
                    </div>
                ) : (
                    // Tunnel Experience
                    <div className="flex-1 flex flex-col">
                        <div className="bg-slate-800 rounded-2xl p-8 border-2 border-slate-600 flex-1 flex flex-col items-center justify-center text-center shadow-2xl mb-6 relative">
                            {/* Guide Animation */}
                            <div className="absolute -right-4 top-1/2 -translate-y-1/2 animate-bounce-right text-electric-blue opacity-50 pointer-events-none">
                                <ChevronRight size={48} />
                            </div>

                            <div className="mb-6">{currentStepData.icon}</div>
                            <h3 className="text-3xl font-black mb-4 text-white">{currentStepData.title}</h3>
                            <p className="text-2xl font-bold text-slate-200">{currentStepData.instruction}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={prevStep} disabled={currentStep === 0} className={`h-20 rounded-xl font-bold text-xl flex items-center justify-center gap-2 ${currentStep === 0 ? 'bg-slate-800 text-slate-600' : 'bg-slate-700 text-white active:bg-slate-600'}`}>
                                <ChevronLeft size={32} /> Back
                            </button>
                            <button onClick={nextStep} disabled={currentStep >= steps.length - 1} className={`h-20 rounded-xl font-bold text-xl flex items-center justify-center gap-2 ${currentStep >= steps.length - 1 ? 'bg-slate-800 text-slate-600' : 'bg-blue-600 text-white active:bg-blue-500'}`}>
                                Next <ChevronRight size={32} />
                            </button>
                        </div>

                        <button onClick={triggerRecovery} className="w-full mt-6 bg-slate-700 hover:bg-slate-600 text-white font-bold text-lg py-4 rounded-xl border-2 border-slate-500">
                            I'm Safe / End Emergency
                        </button>
                    </div>
                )}
            </main>

            {/* Sticky Footer with Two-Tap Safety */}
            <div className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t-2 border-slate-800 p-4 z-50">
                <div className="max-w-md mx-auto grid grid-cols-1 gap-3">
                    {!isRecovery && !isDanger ? (
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleActionClick('sms')}
                                className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                            >
                                <MessageSquare size={24} /> {t('smsAction', 'SMS Family')}
                            </button>
                            <button
                                onClick={() => handleActionClick('call')}
                                className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                            >
                                <Phone size={24} /> {t('callAction', 'Call Emergency')}
                            </button>
                        </div>
                    ) : (
                        // Simplified footer for Recovery/Danger
                        <div className="text-center text-slate-500 text-sm">
                            {isRecovery ? 'Emergency Protocol Complete' : 'Follow Emergency Procedures'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmergencyPage;
