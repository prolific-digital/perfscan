import { format, parseISO, subDays, subWeeks, subMonths } from 'date-fns';
import { clsx } from 'clsx';

/**
 * Utility function for merging class names
 */
export function cn(...inputs) {
  return clsx(inputs);
}

/**
 * Format date for display
 */
export function formatDate(date, formatStr = 'MMM dd, yyyy') {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, formatStr);
}

/**
 * Format time for display
 */
export function formatTime(date, formatStr = 'HH:mm:ss') {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return format(parsedDate, formatStr);
}

/**
 * Format number with thousands separator
 */
export function formatNumber(num, decimals = 0) {
  if (num === null || num === undefined) return '';
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format percentage
 */
export function formatPercentage(value, decimals = 1) {
  if (value === null || value === undefined) return '';
  return `${Number(value).toFixed(decimals)}%`;
}

/**
 * Format bytes to human readable format
 */
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Get date range based on preset
 */
export function getDateRange(preset) {
  const now = new Date();
  
  switch (preset) {
    case 'last_24_hours':
      return {
        start: subDays(now, 1),
        end: now,
      };
    case 'last_7_days':
      return {
        start: subDays(now, 7),
        end: now,
      };
    case 'last_30_days':
      return {
        start: subDays(now, 30),
        end: now,
      };
    case 'last_3_months':
      return {
        start: subMonths(now, 3),
        end: now,
      };
    case 'last_year':
      return {
        start: subMonths(now, 12),
        end: now,
      };
    default:
      return {
        start: subDays(now, 7),
        end: now,
      };
  }
}

/**
 * Generate chart colors based on metric type
 */
export function getMetricColor(metric) {
  const colors = {
    cpu: '#ef4444',      // red
    memory: '#3b82f6',   // blue
    disk: '#f59e0b',     // amber
    network: '#10b981',  // emerald
    response5250: '#8b5cf6', // violet
    jobs: '#f97316',     // orange
    cpw: '#ec4899',      // pink
  };
  
  return colors[metric] || '#6b7280';
}

/**
 * Get health status color
 */
export function getHealthColor(health) {
  const colors = {
    good: '#10b981',     // emerald
    warning: '#f59e0b',  // amber
    critical: '#ef4444', // red
    unknown: '#6b7280',  // gray
  };
  
  return colors[health] || colors.unknown;
}

/**
 * Get severity color for alerts
 */
export function getSeverityColor(severity) {
  const colors = {
    info: '#3b82f6',     // blue
    warning: '#f59e0b',  // amber
    critical: '#ef4444', // red
    error: '#dc2626',    // red-600
  };
  
  return colors[severity] || colors.info;
}

/**
 * Debounce function
 */
export function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

/**
 * Throttle function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Calculate trend percentage
 */
export function calculateTrend(current, previous) {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Deep clone object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if value is within threshold
 */
export function isWithinThreshold(value, threshold, operator = 'greater_than') {
  switch (operator) {
    case 'greater_than':
      return value > threshold;
    case 'less_than':
      return value < threshold;
    case 'equals':
      return value === threshold;
    case 'greater_than_or_equal':
      return value >= threshold;
    case 'less_than_or_equal':
      return value <= threshold;
    default:
      return false;
  }
}

/**
 * Generate unique ID
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}