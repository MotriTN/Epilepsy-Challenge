import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronRight } from 'lucide-react';

const SlideButton = ({ onConfirm, label, color = 'bg-red-600', icon: Icon }) => {
    const [sliderValue, setSliderValue] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef(null);
    const isDraggingRef = useRef(false); // Keep ref for event handlers to avoid stale closures if needed

    const handleStart = () => {
        setIsDragging(true);
        isDraggingRef.current = true;
    };

    const handleMove = useCallback((e) => {
        if (!isDraggingRef.current || !sliderRef.current) return;

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const rect = sliderRef.current.getBoundingClientRect();
        const newValue = Math.min(Math.max(0, clientX - rect.left), rect.width - 60); // 60 is knob width
        setSliderValue(newValue);
    }, []);

    const handleEnd = useCallback(() => {
        if (!isDraggingRef.current || !sliderRef.current) return;
        setIsDragging(false);
        isDraggingRef.current = false;

        const rect = sliderRef.current.getBoundingClientRect();
        const threshold = (rect.width - 60) * 0.9;

        if (sliderValue > threshold) {
            onConfirm();
            setSliderValue(rect.width - 60); // Snap to end visually
        } else {
            setSliderValue(0); // Snap back
        }
    }, [sliderValue, onConfirm]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleEnd);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('touchend', handleEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging, handleMove, handleEnd]);

    return (
        <div
            ref={sliderRef}
            className={`relative w-full h-16 rounded-full bg-slate-800 overflow-hidden select-none border-2 border-slate-700 shadow-inner`}
            onTouchStart={handleStart}
            onMouseDown={handleStart}
        >
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-sm opacity-50 animate-pulse">
                    Slide to {label}
                </span>
            </div>

            {/* Fill */}
            <div
                className={`absolute left-0 top-0 bottom-0 ${color} opacity-30`}
                style={{ width: `${sliderValue + 60}px` }}
            />

            {/* Knob */}
            <div
                className={`absolute top-1 bottom-1 w-14 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer transition-transform active:scale-95 z-10`}
                style={{
                    transform: `translateX(${sliderValue}px)`,
                    transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                }}
            >
                {Icon ? <Icon className="text-slate-900" size={24} /> : <ChevronRight className="text-slate-900" size={24} />}
            </div>
        </div>
    );
};

export default SlideButton;
