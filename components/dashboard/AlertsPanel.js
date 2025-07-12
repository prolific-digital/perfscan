'use client';

import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAllAlerts, 
  selectUnreadAlertCount,
  acknowledgeAlert 
} from '@/store/slices/alertsSlice';
import { selectUser } from '@/store/slices/authSlice';
import { showToast } from '@/store/slices/uiSlice';
import { formatDate, formatTime, getSeverityColor } from '@/lib/utils';
import { 
  FaExclamationTriangle, 
  FaInfoCircle, 
  FaCheckCircle,
  FaBell,
  FaEye
} from 'react-icons/fa';
import Link from 'next/link';

function AlertItem({ alert }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <FaExclamationTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <FaExclamationTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <FaInfoCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const handleAcknowledge = () => {
    dispatch(acknowledgeAlert({
      alertId: alert.id,
      user: user?.username || 'current_user'
    }));
    dispatch(showToast({
      message: 'Alert acknowledged',
      type: 'success'
    }));
  };

  return (
    <div className={`p-3 border rounded-lg ${getSeverityBg(alert.severity)} ${!alert.acknowledged ? 'border-l-4' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-2 flex-1">
          {getSeverityIcon(alert.severity)}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {alert.systemName}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              {alert.message}
            </p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">
                {formatTime(alert.timestamp)}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
                  {alert.severity}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {!alert.acknowledged && (
          <button
            onClick={handleAcknowledge}
            className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Acknowledge alert"
          >
            <FaEye className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {alert.acknowledged && (
        <div className="mt-2 text-xs text-gray-500 flex items-center space-x-1">
          <FaCheckCircle className="h-3 w-3" />
          <span>
            Acknowledged by {alert.acknowledgedBy} at {formatTime(alert.acknowledgedAt)}
          </span>
        </div>
      )}
    </div>
  );
}

export default function AlertsPanel() {
  const alerts = useSelector(selectAllAlerts);
  const unreadCount = useSelector(selectUnreadAlertCount);

  // Show only recent alerts (last 10)
  const recentAlerts = alerts.slice(0, 10);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FaBell className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Recent Alerts</h3>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <Link 
            href="/alerts"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View All
          </Link>
        </div>
      </div>

      <div className="p-4">
        {recentAlerts.length > 0 ? (
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FaCheckCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-sm">No alerts at this time</p>
            <p className="text-xs mt-1">All systems are operating normally</p>
          </div>
        )}
      </div>

      {alerts.length > 10 && (
        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <Link 
            href="/alerts"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View {alerts.length - 10} more alerts →
          </Link>
        </div>
      )}
    </div>
  );
}