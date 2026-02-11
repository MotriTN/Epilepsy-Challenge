import React from 'react';

const ConfirmationModal = ({ isOpen, type, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    const isCall = type === 'call';
    const title = isCall ? 'Call Emergency Services?' : 'Send Emergency SMS?';
    const description = isCall
        ? 'This will immediately dial emergency services. Only use in a real emergency.'
        : 'This will send your current GPS location to your emergency contacts.';
    const confirmText = isCall ? 'Yes, Call Now' : 'Yes, Send SMS';
    const confirmColor = isCall ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative bg-slate-900/90 border border-slate-700/50 p-6 rounded-2xl shadow-2xl max-w-sm w-full animate-fade-in text-center">
                <h3 className="text-2xl font-black text-white mb-2">{title}</h3>
                <p className="text-slate-300 mb-6">{description}</p>

                <div className="flex flex-col gap-3">
                    <button
                        onClick={onConfirm}
                        className={`w-full py-4 rounded-xl font-bold text-xl text-white shadow-lg transform active:scale-95 transition-all ${confirmColor}`}
                    >
                        {confirmText}
                    </button>
                    <button
                        onClick={onCancel}
                        className="w-full py-3 rounded-xl font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
