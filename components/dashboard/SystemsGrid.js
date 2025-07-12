'use client';

import { useSelector } from 'react-redux';
import { selectRealtimeMetrics } from '@/store/slices/metricsSlice';
import { getHealthColor, formatPercentage, formatNumber } from '@/lib/utils';
import { FaServer, FaExclamationTriangle, FaCheckCircle, FaClock } from 'react-icons/fa';

function SystemCard({ system }) {
  const metrics = useSelector(state => selectRealtimeMetrics(state, system.id));
  
  const getStatusIcon = (health) => {
    switch (health) {
      case 'good':
        return <FaCheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <FaExclamationTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical':
        return <FaExclamationTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <FaClock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getHealthBorderColor = (health) => {
    switch (health) {
      case 'good':
        return 'border-l-green-500';
      case 'warning':
        return 'border-l-yellow-500';
      case 'critical':
        return 'border-l-red-500';
      default:
        return 'border-l-gray-500';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow border-l-4 ${getHealthBorderColor(system.health)} p-6 hover:shadow-md transition-shadow`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <FaServer className="h-6 w-6 text-gray-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{system.name}</h3>
            <p className="text-sm text-gray-500">{system.type}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(system.health)}
          <span className="text-sm font-medium capitalize">{system.health}</span>
        </div>
      </div>

      {/* Metrics */}
      {metrics && (
        <div className="space-y-3">
          {/* CPU */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">CPU Utilization</span>
              <span className="text-sm font-semibold text-gray-900">
                {formatPercentage(metrics.cpu?.utilization)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  metrics.cpu?.utilization > 90 
                    ? 'bg-red-500' 
                    : metrics.cpu?.utilization > 75 
                    ? 'bg-yellow-500' 
                    : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(100, metrics.cpu?.utilization || 0)}%` }}
              />
            </div>
          </div>

          {/* Memory */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Memory Utilization</span>
              <span className="text-sm font-semibold text-gray-900">
                {formatPercentage(metrics.memory?.utilization)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  metrics.memory?.utilization > 90 
                    ? 'bg-red-500' 
                    : metrics.memory?.utilization > 75 
                    ? 'bg-yellow-500' 
                    : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(100, metrics.memory?.utilization || 0)}%` }}
              />
            </div>
          </div>

          {/* Disk */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-gray-700">Disk Utilization</span>
              <span className="text-sm font-semibold text-gray-900">
                {formatPercentage(metrics.disk?.armUtilization)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  metrics.disk?.armUtilization > 80 
                    ? 'bg-red-500' 
                    : metrics.disk?.armUtilization > 60 
                    ? 'bg-yellow-500' 
                    : 'bg-orange-500'
                }`}
                style={{ width: `${Math.min(100, metrics.disk?.armUtilization || 0)}%` }}
              />
            </div>
          </div>

          {/* Additional Metrics Row */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-500">5250 Response</p>
              <p className="text-sm font-semibold">
                {metrics.response5250?.avgResponseTime?.toFixed(3)}s
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Jobs</p>
              <p className="text-sm font-semibold">
                {formatNumber(metrics.jobs?.totalActive)}
              </p>
            </div>
          </div>
        </div>
      )}

      {!metrics && (
        <div className="text-center py-4 text-gray-500">
          <p className="text-sm">No real-time data available</p>
        </div>
      )}
    </div>
  );
}

export default function SystemsGrid({ systems }) {
  if (!systems || systems.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Systems Overview</h2>
        <div className="text-center py-12 text-gray-500">
          <FaServer className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No systems configured</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Systems Overview</h2>
        <div className="text-sm text-gray-500">
          {systems.length} {systems.length === 1 ? 'system' : 'systems'}
        </div>
      </div>
      
      <div className="grid gap-4">
        {systems.map((system) => (
          <SystemCard key={system.id} system={system} />
        ))}
      </div>
    </div>
  );
}