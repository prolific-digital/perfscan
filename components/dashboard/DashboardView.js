'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainLayout from '@/components/layout/MainLayout';
import SystemsGrid from './SystemsGrid';
import MetricsOverview from './MetricsOverview';
import AlertsPanel from './AlertsPanel';
import { 
  fetchSystemsStart, 
  fetchSystemsSuccess, 
  selectAllSystems 
} from '@/store/slices/systemsSlice';
import { 
  fetchAlertsStart, 
  fetchAlertsSuccess 
} from '@/store/slices/alertsSlice';
import { updateRealtimeMetrics } from '@/store/slices/metricsSlice';
import { showToast } from '@/store/slices/uiSlice';

// API data loading functions
const loadSystemsData = async () => {
  const response = await fetch('/api/systems');
  if (!response.ok) throw new Error('Failed to load systems');
  return response.json();
};

const loadAlertsData = async () => {
  const response = await fetch('/api/alerts');
  if (!response.ok) throw new Error('Failed to load alerts');
  return response.json();
};

const loadRealtimeData = async () => {
  const response = await fetch('/api/metrics/realtime');
  if (!response.ok) throw new Error('Failed to load metrics');
  return response.json();
};

export default function DashboardView() {
  const dispatch = useDispatch();
  const systems = useSelector(selectAllSystems);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load systems
        dispatch(fetchSystemsStart());
        const systemsData = await loadSystemsData();
        dispatch(fetchSystemsSuccess(systemsData.systems));

        // Load alerts
        dispatch(fetchAlertsStart());
        const alertsData = await loadAlertsData();
        dispatch(fetchAlertsSuccess(alertsData));

        // Load real-time metrics
        const realtimeData = await loadRealtimeData();
        Object.entries(realtimeData.systems).forEach(([systemId, metrics]) => {
          dispatch(updateRealtimeMetrics({ systemId: Number(systemId), metrics }));
        });

        dispatch(showToast({
          message: 'Dashboard data loaded successfully',
          type: 'success'
        }));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        dispatch(showToast({
          message: 'Error loading dashboard data',
          type: 'error'
        }));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const realtimeData = await loadRealtimeData();
        Object.entries(realtimeData.systems).forEach(([systemId, metrics]) => {
          // Add some randomization to simulate real changes
          const updatedMetrics = {
            ...metrics,
            cpu: {
              ...metrics.cpu,
              utilization: Math.max(0, Math.min(100, 
                metrics.cpu.utilization + (Math.random() - 0.5) * 5
              ))
            },
            memory: {
              ...metrics.memory,
              utilization: Math.max(0, Math.min(100, 
                metrics.memory.utilization + (Math.random() - 0.5) * 3
              ))
            }
          };
          
          dispatch(updateRealtimeMetrics({ 
            systemId: Number(systemId), 
            metrics: updatedMetrics 
          }));
        });
      } catch (error) {
        console.error('Error updating real-time data:', error);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Real-Time Monitor</h1>
            <p className="text-gray-600">Live performance monitoring for IBM Power Systems</p>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Metrics Overview */}
        <MetricsOverview />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Systems Grid - Takes 2 columns */}
          <div className="lg:col-span-2">
            <SystemsGrid systems={systems} />
          </div>

          {/* Alerts Panel - Takes 1 column */}
          <div className="lg:col-span-1">
            <AlertsPanel />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}