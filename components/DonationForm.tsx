import React, { useState, ChangeEvent, FormEvent } from 'react';
import { DonationDraft } from '../types';
import { ChevronRight, Coffee, Sparkles } from 'lucide-react';

interface DonationFormProps {
  onSubmit: (draft: DonationDraft) => void;
}

export const DonationForm: React.FC<DonationFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [message, setMessage] = useState('');

  const isValidAmount = parseInt(amount || '0') >= 1000;
  const isValidName = name.trim().length > 0;
  const isFormValid = isValidAmount && isValidName;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    onSubmit({
      name: name.trim(),
      amount: parseInt(amount),
      message: message.trim()
    });
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (parseInt(val) < 0) return;
    setAmount(val);
  };

  return (
    <section id="donation-area">
      <h2 className="text-2xl font-black text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
            Traktir Kopi
        </span> 
        <Coffee className="text-orange-500 fill-orange-100" />
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-600 mb-2 ml-1">
            Nama Kamu
          </label>
          <input 
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ketik nama kerenmu..." 
            required
            className="w-full p-4 rounded-2xl glass-input text-gray-800 placeholder-gray-400 outline-none transition-all duration-300 font-medium"
          />
        </div>

        {/* Amount Input */}
        <div>
          <label htmlFor="amount" className="block text-sm font-bold text-gray-600 mb-2 ml-1">
            Nominal Donasi
          </label>
          <div className="relative group">
            <span className="absolute left-4 top-4 text-indigo-500 font-extrabold text-lg group-focus-within:scale-110 transition-transform">Rp</span>
            <input 
              type="number" 
              id="amount" 
              value={amount}
              onChange={handleAmountChange}
              min="1000" 
              placeholder="50000" 
              required
              className="w-full p-4 pl-12 rounded-2xl glass-input text-xl font-bold text-indigo-600 placeholder-indigo-200 outline-none transition-all duration-300"
            />
          </div>
          <div className="flex justify-between mt-2 px-1">
             <p className="text-xs text-gray-400 font-medium">Min. Rp 1.000</p>
             <div className="flex gap-1">
                {[10000, 50000, 100000].map(val => (
                    <button 
                        key={val}
                        type="button"
                        onClick={() => setAmount(val.toString())}
                        className="text-xs bg-white border border-gray-200 px-2 py-1 rounded-lg text-gray-500 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-colors shadow-sm"
                    >
                        {val/1000}k
                    </button>
                ))}
             </div>
          </div>
        </div>
        
        {/* Message Input */}
        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-600 mb-2 ml-1">
            Pesan (Opsional)
          </label>
          <textarea 
            id="message" 
            rows={2} 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Kasih kata-kata mutiara dong..."
            className="w-full p-4 rounded-2xl glass-input text-gray-800 placeholder-gray-400 outline-none transition-all duration-300 font-medium resize-none"
          ></textarea>
        </div>

        {/* 3D Rainbow Button */}
        <button 
          type="submit" 
          disabled={!isFormValid}
          className={`
            w-full py-4 px-6 rounded-2xl font-black text-white text-lg tracking-wide uppercase
            flex items-center justify-center gap-2 btn-3d
            transition-all duration-200
            ${isFormValid 
              ? 'bg-gradient-to-r from-violet-500 via-fuchsia-500 to-orange-500 border-b-[6px] border-b-purple-800 shadow-[0_10px_20px_rgba(168,85,247,0.4)] hover:brightness-110' 
              : 'bg-gray-300 border-b-[6px] border-b-gray-400 cursor-not-allowed text-gray-400'}
          `}
        >
          {isFormValid ? (
              <>
                Lanjut Sawer <Sparkles className="animate-pulse" size={24} />
              </>
          ) : (
              'Isi Dulu Ya'
          )}
        </button>
      </form>
    </section>
  );
};