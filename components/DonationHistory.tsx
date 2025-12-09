import React, { useEffect, useState } from 'react';
import { Donation } from '../types';
import { History, Heart, Activity, Zap } from 'lucide-react';

interface DonationHistoryProps {
  donations: Donation[];
  highlightId?: string | null;
}

export const DonationHistory: React.FC<DonationHistoryProps> = ({ donations, highlightId }) => {
  const [, setTick] = useState(0); 

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  const sortedDonations = [...donations].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const isSmallList = sortedDonations.length < 5;
  const repeatCount = isSmallList ? 8 : 2; 
  const displayList = sortedDonations.length > 0 ? Array(repeatCount).fill(sortedDonations).flat() : [];
  const animationDuration = `${Math.max(15, displayList.length * 3.5)}s`;

  return (
    <div className="glass-panel rounded-[2rem] p-6 sm:p-8 overflow-hidden relative">
      
      {/* Decorative blobs */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-100/50 pb-4 relative z-10">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <History className="text-violet-500" /> 
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
            Live Saweria
          </span>
        </h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur rounded-full border border-red-100 shadow-sm animate-pulse">
            <Zap size={14} className="text-orange-500 fill-orange-500" />
            <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 uppercase tracking-wider">
                Realtime
            </span>
        </div>
      </div>
      
      {/* Scroll Container */}
      <div className="relative h-[450px] overflow-hidden group z-10">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/90 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/90 to-transparent z-10 pointer-events-none"></div>

        {displayList.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg border border-gray-50">
                <Heart className="text-pink-300 fill-pink-50" size={40} />
             </div>
             <p className="text-gray-600 font-bold text-lg">Belum ada donasi.</p>
             <p className="text-gray-400 text-sm">Jadilah pendukung pertama!</p>
          </div>
        ) : (
          <div 
            className="will-change-transform pb-12"
            style={{
                animation: `scrollVertical ${animationDuration} linear infinite`,
            }}
          >
             <style>{`
                @keyframes scrollVertical {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-${100 / repeatCount}%); }
                }
                @keyframes highlightPulse3D {
                    0% { transform: scale(1) translateY(0); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
                    50% { transform: scale(1.03) translateY(-2px); box-shadow: 0 20px 25px -5px rgba(34, 197, 94, 0.3); border-color: #4ade80; }
                    100% { transform: scale(1) translateY(0); box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
                }
                .highlight-card {
                    animation: highlightPulse3D 1.5s ease-in-out infinite;
                    z-index: 50;
                    background: linear-gradient(to bottom right, #f0fdf4, #dcfce7) !important;
                }
                .group:hover .will-change-transform {
                    animation-play-state: paused !important;
                }
             `}</style>
             
             {displayList.map((d, index) => (
                <DonationCard 
                    key={`${d.id}-${index}`} 
                    donation={d} 
                    isNew={d.id === highlightId}
                />
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DonationCard: React.FC<{ donation: Donation; isNew?: boolean }> = ({ donation, isNew }) => {
    // Generates a consistent gradient based on name length
    const gradients = [
        'from-blue-400 to-indigo-500', 
        'from-pink-400 to-rose-500', 
        'from-emerald-400 to-teal-500', 
        'from-amber-400 to-orange-500',
        'from-violet-400 to-purple-500'
    ];
    const gradIndex = donation.name.length % gradients.length;
    const avatarGradient = gradients[gradIndex];

    return (
        <div className={`px-2 pb-4 transition-all duration-500 ${isNew ? 'z-20 relative' : ''}`}>
           <div className={`
              p-4 rounded-2xl transition-all relative overflow-hidden
              ${isNew 
                 ? 'highlight-card border-2 border-green-300' 
                 : 'bg-white border border-white/60 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-indigo-200'}
           `}>
              <div className="flex justify-between items-start mb-2 relative z-10">
                 <div className="flex items-center gap-3">
                    {/* 3D Avatar */}
                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-white shadow-md bg-gradient-to-br ${avatarGradient} border-2 border-white`}>
                        {donation.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{donation.name}</h4>
                        <p className="text-[10px] text-gray-500 font-bold flex items-center gap-1 uppercase tracking-wide">
                             {isNew ? (
                                <>
                                  <Activity size={10} className="text-green-500 animate-spin" />
                                  <span className="text-green-600">Baru Saja!</span>
                                </>
                             ) : (
                                getTimeAgo(donation.timestamp)
                             )}
                        </p>
                    </div>
                 </div>
                 {/* Amount Badge Pill */}
                 <div className="px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 shadow-inner">
                    <span className="font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(donation.amount)}
                    </span>
                 </div>
              </div>
              
              {/* Message Bubble */}
              {donation.message && (
                <div className={`mt-3 p-3 rounded-xl rounded-tl-none text-sm leading-relaxed relative z-10 ${isNew ? 'bg-green-100/50 text-green-900' : 'bg-gray-50 text-gray-600'}`}>
                    "{donation.message}"
                </div>
              )}
           </div>
        </div>
    )
}

function getTimeAgo(isoString: string) {
    const date = new Date(isoString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 10) return "Baru saja";
    if (seconds < 60) return `${seconds} dtk lalu`;
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " thn lalu";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " bln lalu";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " hr lalu";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " jam lalu";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " mnt lalu";
    return Math.floor(seconds) + " dtk lalu";
}