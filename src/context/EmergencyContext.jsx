import React, { createContext, useContext, useState, useEffect } from 'react';

const EmergencyContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useEmergency = () => {
    const context = useContext(EmergencyContext);
    if (!context) {
        throw new Error('useEmergency must be used within an EmergencyProvider');
    }
    return context;
};

export const EmergencyProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [initialOffset, setInitialOffset] = useState(0); // New: Track start time offset
    const [currentStep, setCurrentStep] = useState(0); // New: Track tunnel step
    const [phase, setPhase] = useState('IDLE'); // IDLE, EMERGENCY, DANGER, RECOVERY
    const [manualOverride, setManualOverride] = useState(false);
    const [metadata, setMetadata] = useState({}); // New: Store session metadata

    useEffect(() => {
        let interval;
        // Stop timer if in RECOVERY
        if (isActive && startTime && phase !== 'RECOVERY') {
            interval = setInterval(() => {
                const now = Date.now();
                // Add initialOffset to the calculated elapsed time
                const elapsed = Math.floor((now - startTime) / 1000) + initialOffset;
                setElapsedTime(elapsed);

                // Phase Logic (only if not manually overridden)
                if (!manualOverride) {
                    if (elapsed < 300) { // 0-5 mins
                        setPhase('EMERGENCY');
                    } else if (elapsed >= 300) { // > 5 mins -> DANGER
                        setPhase('DANGER');
                    }
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, startTime, manualOverride, initialOffset, phase]);

    const startEmergency = (offset = 0, meta = {}) => {
        setIsActive(true);
        setStartTime(Date.now());
        setInitialOffset(offset); // Set the offset
        setMetadata(meta);

        // Immediate phase check based on offset
        if (offset >= 300) {
            setPhase('DANGER');
        } else {
            setPhase('EMERGENCY');
        }

        setManualOverride(false);
        setCurrentStep(0); // Reset step
    };

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => Math.max(0, prev - 1));

    const triggerRecovery = () => {
        if (!isActive) {
            setIsActive(true);
            setStartTime(Date.now());
        }
        setPhase('RECOVERY');
        setManualOverride(true);
    };

    const resetEmergency = () => {
        setIsActive(false);
        setStartTime(null);
        setElapsedTime(0);
        setInitialOffset(0);
        setCurrentStep(0);
        setPhase('IDLE');
        setManualOverride(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const value = {
        isActive,
        elapsedTime,
        phase,
        currentStep, // Exported
        metadata, // Exported
        startEmergency,
        nextStep, // Exported
        prevStep, // Exported
        triggerRecovery,
        resetEmergency,
        formatTime
    };

    return (
        <EmergencyContext.Provider value={value}>
            {children}
        </EmergencyContext.Provider>
    );
};
