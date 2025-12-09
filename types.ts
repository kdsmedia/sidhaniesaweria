export interface Donation {
  id: string;
  name: string;
  amount: number;
  message?: string;
  timestamp: string;
}

export interface DonationDraft {
  name: string;
  amount: number;
  message: string;
}

export interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info';
}