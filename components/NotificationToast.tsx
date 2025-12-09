import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { NotificationState } from '../types';

export const NotificationToast: React.FC<NotificationState> = ({ message, type }) => {
  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-600';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <div 
      role="alert"
      className={`fixed bottom-4 right-4 ${getStyles()} text-white px-6 py-4 rounded-xl shadow-xl z-50 flex items-center gap-3 animate-slide-up`}
    >
      {getIcon()}
      <span className="font-medium">{message}</span>
    </div>
  );
};