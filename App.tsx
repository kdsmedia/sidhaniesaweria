
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ProfileCard } from './components/ProfileCard';
import { DonationForm } from './components/DonationForm';
import { DonationHistory } from './components/DonationHistory';
import { PaymentModal } from './components/PaymentModal';
import { NotificationToast } from './components/NotificationToast';
import { LiveTicker } from './components/LiveTicker';
import { DonationGoal } from './components/DonationGoal';
import { Confetti } from './components/Confetti';
import { Donation, DonationDraft, NotificationState } from './types';

// Initial mock data - Expanded for realism
const INITIAL_DONATIONS: Donation[] = [
  { id: '1', name: "Rizky Ramadhan", amount: 50000, message: "Mantap bang! Ditunggu album barunya.", timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() }, // 5 mins ago
  { id: '2', name: "Hamba Allah", amount: 100000, message: "", timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString() }, // 25 mins ago
  { id: '3', name: "Sarah Putri", amount: 25000, message: "Suka banget sama lagu barunya ❤️", timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() }, // 45 mins ago
  { id: '4', name: "Budi Santoso", amount: 10000, message: "Buat beli gorengan mas hehe", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() }, // 2 hours ago
  { id: '5', name: "Dina L.", amount: 250000, message: "Support local musicians! Keep it up.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.5).toISOString() }, // 3.5 hours ago
  { id: '6', name: "Anonim", amount: 15000, message: "", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() }, // 5 hours ago
  { id: '7', name: "Fajar Nugraha", amount: 50000, message: "Gas terus bang Sidhanie!", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() }, // 8 hours ago
  { id: '8', name: "Lina Marlina", amount: 75000, message: "Request lagu galau dong kak...", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString() }, // 12 hours ago
  { id: '9', name: "Dimas", amount: 5000, message: "Maaf cuma bisa segini, sukses terus!", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString() }, // 15 hours ago
  { id: '10', name: "Tio Kurniawan", amount: 150000, message: "Buat nambah beli senar gitar baru.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString() }, // 20 hours ago
  { id: '11', name: "Rina Wati", amount: 30000, message: "Semangat kak!", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() }, // 1 day ago
  { id: '12', name: "Joko Susilo", amount: 50000, message: "Salam dari Surabaya bro", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString() }, // 28 hours ago
  { id: '13', name: "Citra Kirana", amount: 100000, message: "Sukses selalu kak Sidhanie!", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 32).toISOString() }, // 32 hours ago
  { id: '14', name: "Anonim", amount: 10000, message: "", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString() }, // 40 hours ago
  { id: '15', name: "Eko Prasetyo", amount: 25000, message: "Semangat berkarya mas.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString() }, // 2 days ago
  { id: '16', name: "Maya Anggraini", amount: 500000, message: "Big fan here! Hope to see you live soon.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 55).toISOString() }, // 55 hours ago
  { id: '17', name: "Andi Saputra", amount: 20000, message: "", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 65).toISOString() }, // 65 hours ago
  { id: '18', name: "Siska Dewi", amount: 40000, message: "Enak lagunya buat nemenin kerja.", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString() }, // 3 days ago
  { id: '19', name: "Bagus A.", amount: 100000, message: "Karya Anda menginspirasi!", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString() },
  { id: '20', name: "YULI", amount: 50000, message: "Semangat terus!", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString() }
];

// Changed version to force load new mock data
const STORAGE_KEY = 'user_donation_history_token_v2';
const TARGET_AMOUNT = 5000000; // Rp 5.000.000 Target

export default function App() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDonation, setPendingDonation] = useState<DonationDraft | null>(null);
  const [notification, setNotification] = useState<NotificationState | null>(null);
  const [lastDonationId, setLastDonationId] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Load donations from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setDonations(JSON.parse(stored));
      } else {
        setDonations(INITIAL_DONATIONS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DONATIONS));
      }
    } catch (error) {
      console.error("Failed to load donations", error);
      setDonations(INITIAL_DONATIONS);
    }
  }, []);

  // Calculate total donations
  const totalCollected = useMemo(() => {
    return donations.reduce((sum, donation) => sum + donation.amount, 0);
  }, [donations]);

  // Show notification helper
  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, []);

  // Step 1: Form submitted, open modal
  const handleFormSubmit = useCallback((draft: DonationDraft) => {
    setPendingDonation(draft);
    setIsModalOpen(true);
  }, []);

  // Step 2: Payment confirmed
  const handlePaymentConfirm = useCallback(() => {
    if (!pendingDonation) return;

    const newId = Date.now().toString();
    const newDonation: Donation = {
      ...pendingDonation,
      id: newId,
      timestamp: new Date().toISOString()
    };

    setDonations(prev => {
      const updated = [newDonation, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    // Trigger animation for the new donation
    setLastDonationId(newId);
    
    // Trigger Confetti
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5s

    // Clear the highlight ID after animation duration
    setTimeout(() => setLastDonationId(null), 8000);

    setIsModalOpen(false);
    setPendingDonation(null);
    
    // Format currency for notification
    const formattedAmount = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(newDonation.amount);

    showNotification(`Donasi ${formattedAmount} diterima! Terima kasih, ${newDonation.name}!`, 'success');
  }, [pendingDonation, showNotification]);

  // Step 3: Payment cancelled or timeout
  const handlePaymentCancel = useCallback((reason: 'user' | 'timeout') => {
    setIsModalOpen(false);
    setPendingDonation(null);
    
    if (reason === 'timeout') {
      showNotification('Waktu pembayaran telah habis. Silakan ulangi transaksi.', 'error');
    } else {
      showNotification('Pembayaran dibatalkan.', 'info');
    }
  }, [showNotification]);

  return (
    <div className="min-h-screen p-4 flex justify-center text-gray-800 relative">
      
      {/* Confetti Overlay */}
      {showConfetti && <Confetti />}

      {/* Fake Live Ticker Component */}
      <LiveTicker />

      <main className="w-full max-w-xl lg:max-w-md mt-6 mb-12 relative z-10">
        
        {/* Profile and Form Card */}
        <div className="glass-panel rounded-[2.5rem] p-6 sm:p-8 relative overflow-hidden">
          {/* Decorative Top Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-500"></div>
          
          <ProfileCard />
          
          {/* Custom Divider */}
          <div className="relative h-px w-full my-6">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-50"></div>
          </div>
          
          {/* Donation Goal Progress Bar */}
          <DonationGoal 
             currentAmount={totalCollected} 
             targetAmount={TARGET_AMOUNT} 
             goalName="Upgrade Microphone Studio"
          />

          <DonationForm onSubmit={handleFormSubmit} />
        </div>

        {/* History Card */}
        <div className="mt-8">
            <DonationHistory 
              donations={donations} 
              highlightId={lastDonationId}
            />
        </div>

        {/* QRIS Modal */}
        {isModalOpen && pendingDonation && (
          <PaymentModal 
            amount={pendingDonation.amount}
            onConfirm={handlePaymentConfirm}
            onCancel={() => handlePaymentCancel('user')}
            onTimeout={() => handlePaymentCancel('timeout')}
          />
        )}

        {/* Toast Notification */}
        {notification && (
          <NotificationToast 
            message={notification.message} 
            type={notification.type} 
          />
        )}
      </main>
    </div>
  );
}
