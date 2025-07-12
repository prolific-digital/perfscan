'use client';

import { useSelector } from 'react-redux';
import { selectAllSystems } from '@/store/slices/systemsSlice';
import { selectRealtimeMetrics } from '@/store/slices/metricsSlice';
import { formatPercentage, formatNumber } from '@/lib/utils';
import { 
  FaMicrochip, 
  FaMemory, 
  FaHdd, 
  FaNetworkWired,
  FaExclamationTriangle,
  FaArrowUp,
  FaArrowDown,
  FaMinus
} from 'react-icons/fa';

function MetricCard({ title, value, unit, icon: Icon, trend, status, description }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend > 2) return <FaArrowUp className="h-3 w-3 text-red-500" />;
    if (trend < -2) return <FaArrowDown className="h-3 w-3 text-green-500" />;
    return <FaMinus className="h-3 w-3 text-gray-400" />;
  };

  return (
    <div className={`bg-white rounded-lg border shadow-sm p-4 ${getStatusColor(status)}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold">
              {value}
              {unit && <span className="text-lg font-normal ml-1">{unit}</span>}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center justify-end space-x-1">
            {getTrendIcon(trend)}
            <span className="text-sm">
              {Math.abs(trend).toFixed(1)}%
            </span>
          </div>
          {description && (
            <p className="text-xs mt-1 opacity-75">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MetricsOverview() {
  const systems = useSelector(selectAllSystems) || [];
  const allMetrics = useSelector(selectRealtimeMetrics) || {};
  
  // Calculate aggregate metrics across all systems
  const aggregateMetrics = systems.reduce((acc, system) => {
    // Safety check for system object
    if (!system || !system.id) return acc;
    
    const metrics = allMetrics[system.id];
    
    if (metrics) {
      acc.count += 1;
      acc.totalCpuUtil += metrics.cpu?.utilization || 0;
      acc.totalMemUtil += metrics.memory?.utilization || 0;
      acc.totalDiskUtil += metrics.disk?.armUtilization || 0;
      acc.totalNetUtil += metrics.network?.ethernetUtilization || 0;
      acc.totalJobs += metrics.jobs?.totalActive || 0;
      acc.totalResponseTime += metrics.response5250?.avgResponseTime || 0;
      
      // Health status counts
      if (system.health === 'critical') acc.criticalSystems += 1;
      else if (system.health === 'warning') acc.warningSystems += 1;
      else if (system.health === 'good') acc.goodSystems += 1;
    }
    
    return acc;
  }, {
    count: 0,
    totalCpuUtil: 0,
    totalMemUtil: 0,
    totalDiskUtil: 0,
    totalNetUtil: 0,
    totalJobs: 0,
    totalResponseTime: 0,
    criticalSystems: 0,
    warningSystems: 0,
    goodSystems: 0
  });

  // Calculate averages
  const avgCpuUtil = aggregateMetrics.count > 0 ? aggregateMetrics.totalCpuUtil / aggregateMetrics.count : 0;
  const avgMemUtil = aggregateMetrics.count > 0 ? aggregateMetrics.totalMemUtil / aggregateMetrics.count : 0;
  const avgDiskUtil = aggregateMetrics.count > 0 ? aggregateMetrics.totalDiskUtil / aggregateMetrics.count : 0;
  const avgNetUtil = aggregateMetrics.count > 0 ? aggregateMetrics.totalNetUtil / aggregateMetrics.count : 0;
  const avgResponseTime = aggregateMetrics.count > 0 ? aggregateMetrics.totalResponseTime / aggregateMetrics.count : 0;

  // Determine status based on averages
  const getCpuStatus = () => {
    if (avgCpuUtil > 90) return 'critical';
    if (avgCpuUtil > 75) return 'warning';
    return 'good';
  };

  const getMemStatus = () => {
    if (avgMemUtil > 95) return 'critical';
    if (avgMemUtil > 85) return 'warning';
    return 'good';
  };

  const getDiskStatus = () => {
    if (avgDiskUtil > 80) return 'critical';
    if (avgDiskUtil > 60) return 'warning';
    return 'good';
  };

  const getSystemsHealthStatus = () => {
    if (aggregateMetrics.criticalSystems > 0) return 'critical';
    if (aggregateMetrics.warningSystems > 0) return 'warning';
    return 'good';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Average CPU Usage"
        value={formatPercentage(avgCpuUtil, 1).replace('%', '')}
        unit="%"
        icon={FaMicrochip}
        trend={Math.random() * 10 - 5} // Mock trend
        status={getCpuStatus()}
        description={`${aggregateMetrics.count} systems`}
      />
      
      <MetricCard
        title="Average Memory Usage"
        value={formatPercentage(avgMemUtil, 1).replace('%', '')}
        unit="%"
        icon={FaMemory}
        trend={Math.random() * 6 - 3} // Mock trend
        status={getMemStatus()}
        description={`${aggregateMetrics.count} systems`}
      />
      
      <MetricCard
        title="Average Disk Usage"
        value={formatPercentage(avgDiskUtil, 1).replace('%', '')}
        unit="%"
        icon={FaHdd}
        trend={Math.random() * 8 - 4} // Mock trend
        status={getDiskStatus()}
        description={`${aggregateMetrics.count} systems`}
      />
      
      <MetricCard
        title="System Health"
        value={aggregateMetrics.goodSystems}
        unit={`of ${systems.length}`}
        icon={aggregateMetrics.criticalSystems > 0 ? FaExclamationTriangle : FaNetworkWired}
        trend={0}
        status={getSystemsHealthStatus()}
        description={
          aggregateMetrics.criticalSystems > 0 
            ? `${aggregateMetrics.criticalSystems} critical`
            : aggregateMetrics.warningSystems > 0 
            ? `${aggregateMetrics.warningSystems} warning`
            : 'All systems healthy'
        }
      />
    </div>
  );
}