import React, { useEffect, useState } from 'react';
import { Timer, X } from 'lucide-react';

interface PaymentModalProps {
  amount: number;
  onConfirm: () => void;
  onCancel: () => void;
  onTimeout: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ amount, onConfirm, onCancel, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const formattedAmount = new Intl.NumberFormat('id-ID', { 
    style: 'currency', 
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Darkened Backdrop with Blur */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onCancel}></div>

      {/* 3D Glass Modal */}
      <div className="relative bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] w-full max-w-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/50 transform transition-all animate-scale-up">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-black text-gray-800">Pembayaran</h3>
            <button onClick={onCancel} className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors">
                <X size={20} />
            </button>
        </div>
        
        {/* Amount Box */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-2xl mb-6 border border-indigo-100 text-center shadow-inner">
            <p className="text-sm font-semibold text-indigo-400 uppercase tracking-wide">Total Tagihan</p>
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600 mt-1">{formattedAmount}</p>
        </div>

        {/* QR Code Placeholder with 3D effect */}
        <div className="flex justify-center mb-6 relative group">
           <div className="p-3 bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] border border-gray-100 transform group-hover:scale-105 transition-transform duration-300">
              <img 
                src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHwO_-Mp4mmE5tIQgvrs8ZzsUiKwMWROUa8XAMFdKpYGzqxAXR9ciCYRZ9LBt-i1ukxzhTVQw_mcKbCm5jzFe6vySjmowjplpTMJBwV5HVfETSH6WwqlWHY2BEn_rMJn4jXXRX5ylMRwDGPssCFolj5akwy1Ny-Y3_JHFQZK3Jdf4HzaFwuBRXqwcDVhI/s407/qris.jpg" 
                alt="Kode QRIS" 
                className="w-56 h-56 rounded-xl object-cover"
              />
           </div>
           
           {/* Countdown Badge overlay */}
           <div className="absolute -bottom-3 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg border-2 border-white flex items-center gap-2">
                <Timer size={16} className="animate-pulse" />
                <span className="font-mono font-bold text-lg">{formatTime(timeLeft)}</span>
           </div>
        </div>
        
        <p className="text-center text-gray-500 text-sm mb-6 mt-6">Scan QRIS di atas dengan e-wallet pilihanmu.</p>
        
        {/* Actions - 3D Buttons */}
        <div className="space-y-3">
            <button 
                onClick={onConfirm} 
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-xl btn-3d border-b-[5px] border-b-green-700 shadow-lg hover:brightness-110"
            >
                SUDAH BAYAR
            </button>
            <button 
                onClick={onCancel} 
                className="w-full py-3.5 bg-white text-gray-600 font-bold rounded-xl btn-3d border-b-[5px] border-b-gray-300 border border-gray-200 hover:bg-gray-50"
            >
                BATALKAN
            </button>
        </div>
      </div>
    </div>
  );
};
