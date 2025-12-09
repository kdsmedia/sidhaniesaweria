import React, { useState, useEffect } from 'react';

// Pool of fake data
const NAMES = [
    "Yuli", "Ahmad", "Siti", "Budi", "Dewi", "Reza", "Putri", 
    "Dimas", "Eka", "Fajar", "Gita", "Hendra", "Indah", "Joko"
];

const AMOUNTS = [5000, 10000, 15000, 20000, 25000, 50000, 100000];

interface FakeEvent {
    id: number;
    name: string;
    amount: number;
}

export const LiveTicker: React.FC = () => {
    const [currentEvent, setCurrentEvent] = useState<FakeEvent | null>(null);
    const [key, setKey] = useState(0); // Used to reset animation

    useEffect(() => {
        // Function to trigger a new notification
        const triggerNotification = () => {
            const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
            const randomAmount = AMOUNTS[Math.floor(Math.random() * AMOUNTS.length)];
            
            setCurrentEvent({
                id: Date.now(),
                name: randomName,
                amount: randomAmount
            });
            
            // Increment key to force re-render and restart CSS animation
            setKey(prev => prev + 1);
        };

        // Trigger immediately on mount (optional, or wait 10s)
        const initialTimer = setTimeout(triggerNotification, 2000);

        // Set interval for every 10 seconds
        const interval = setInterval(triggerNotification, 10000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(interval);
        };
    }, []);

    if (!currentEvent) return null;

    return (
        <div 
            key={key} // Force re-mount to restart animation
            className="fixed top-4 left-0 right-0 z-[100] flex justify-center pointer-events-none animate-fly-pass"
        >
            <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-white/50 flex items-center gap-3 min-w-[280px]">
                {/* Fake Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {currentEvent.name.charAt(0)}
                </div>
                
                <div className="flex-1">
                    <p className="text-sm text-gray-800">
                        <span className="font-bold text-indigo-700">{currentEvent.name}</span> telah berdonasi
                    </p>
                    <p className="text-xs font-black text-green-600">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(currentEvent.amount)}
                    </p>
                </div>

                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};