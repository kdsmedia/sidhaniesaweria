
import React from 'react';
import { Target, Trophy } from 'lucide-react';

interface DonationGoalProps {
  currentAmount: number;
  targetAmount: number;
  goalName: string;
}

export const DonationGoal: React.FC<DonationGoalProps> = ({ currentAmount, targetAmount, goalName }) => {
  const percentage = Math.min(100, Math.max(0, (currentAmount / targetAmount) * 100));
  const formattedCurrent = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(currentAmount);
  const formattedTarget = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(targetAmount);

  return (
    <div className="mb-8 relative z-20">
      <div className="glass-panel p-5 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
        
        {/* Header Info */}
        <div className="flex justify-between items-end mb-3 relative z-10">
            <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Target size={14} className="text-indigo-500" /> Target Saat Ini
                </p>
                <h3 className="text-lg font-black text-gray-800 leading-none">{goalName}</h3>
            </div>
            <div className="text-right">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">
                    {Math.round(percentage)}%
                </span>
            </div>
        </div>

        {/* 3D Progress Bar Container */}
        <div className="h-6 w-full bg-gray-200 rounded-full shadow-inner relative overflow-hidden border border-white/50">
            {/* The Animated Bar */}
            <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.2)] relative transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                style={{ width: `${percentage}%` }}
            >
                {/* Shine Effect */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-full"></div>
                
                {/* Moving Stripes Animation */}
                <div className="absolute inset-0 w-full h-full overflow-hidden opacity-30">
                     <div className="w-[200%] h-full flex animate-slide-stripes">
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={i} className="h-full w-4 bg-white/20 -skew-x-12 mx-2"></div>
                        ))}
                     </div>
                </div>

                {/* Tip Glow */}
                {percentage > 5 && (
                    <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                )}
            </div>
        </div>
        
        {/* Amount Text */}
        <div className="flex justify-between mt-2 text-xs font-bold relative z-10">
            <span className="text-indigo-600">{formattedCurrent}</span>
            <span className="text-gray-400">Target: {formattedTarget}</span>
        </div>

        {/* Conditional Celebration Icon */}
        {percentage >= 100 && (
             <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20 animate-fade-in">
                <div className="text-center">
                    <Trophy size={48} className="text-yellow-500 mx-auto animate-bounce drop-shadow-lg" />
                    <p className="font-black text-xl text-yellow-600 mt-2">TARGET TERCAPAI!</p>
                </div>
             </div>
        )}
      </div>
      
      <style>{`
        @keyframes slide-stripes {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-slide-stripes {
            animation: slide-stripes 2s linear infinite;
        }
      `}</style>
    </div>
  );
};
