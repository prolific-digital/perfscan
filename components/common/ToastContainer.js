'use client';

import { useSelector, useDispatch } from 'react-redux';
import { selectToast, hideToast } from '@/store/slices/uiSlice';
import { useEffect } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes, FaExclamationCircle } from 'react-icons/fa';
import { cn } from '@/lib/utils';

export default function ToastContainer() {
  const toast = useSelector(selectToast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (toast.show && toast.duration > 0) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.show, toast.duration, dispatch]);

  if (!toast.show) {
    return null;
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <FaExclamationCircle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <FaExclamationTriangle className="h-5 w-5 text-yellow-400" />;
      default:
        return <FaInfoCircle className="h-5 w-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      default:
        return 'text-blue-800';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div
        className={cn(
          'p-4 rounded-lg border shadow-lg',
          getBackgroundColor(toast.type),
          'transform transition-all duration-300 ease-in-out'
        )}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getIcon(toast.type)}
          </div>
          <div className="ml-3 flex-1">
            <p className={cn('text-sm font-medium', getTextColor(toast.type))}>
              {toast.message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <button
              onClick={() => dispatch(hideToast())}
              className={cn(
                'inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2',
                toast.type === 'success' && 'text-green-400 hover:text-green-500 focus:ring-green-500',
                toast.type === 'error' && 'text-red-400 hover:text-red-500 focus:ring-red-500',
                toast.type === 'warning' && 'text-yellow-400 hover:text-yellow-500 focus:ring-yellow-500',
                toast.type === 'info' && 'text-blue-400 hover:text-blue-500 focus:ring-blue-500'
              )}
            >
              <FaTimes className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}