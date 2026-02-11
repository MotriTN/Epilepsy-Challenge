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
    const [phase, setPhase] = useState('IDLE'); // IDLE, EMERGENCY, STABILIZING, RECOVERY

    useEffect(() => {
        let interval;
        if (isActive && startTime) {
            interval = setInterval(() => {
                const now = Date.now();
                const elapsed = Math.floor((now - startTime) / 1000);
                setElapsedTime(elapsed);

                // Phase Logic
                if (elapsed < 300) { // 0-5 mins
                    setPhase('EMERGENCY');
                } else if (elapsed < 600) { // 5-10 mins
                    setPhase('STABILIZING');
                } else { // 10+ mins
                    setPhase('RECOVERY');
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, startTime]);

    const startEmergency = () => {
        setIsActive(true);
        setStartTime(Date.now());
        setPhase('EMERGENCY');
    };

    const resetEmergency = () => {
        setIsActive(false);
        setStartTime(null);
        setElapsedTime(0);
        setPhase('IDLE');
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
        startEmergency,
        resetEmergency,
        formatTime
    };

    return (
        <EmergencyContext.Provider value={value}>
            {children}
        </EmergencyContext.Provider>
    );
};
