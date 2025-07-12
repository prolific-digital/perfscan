'use client';

import Chart from './Chart';
import { formatPercentage, getMetricColor } from '@/lib/utils';

export default function MultiMetricChart({ 
  data = [], 
  metrics = ['cpu', 'memory', 'disk'],
  loading = false, 
  error = null,
  title = "System Metrics Overview",
  height = 400 
}) {
  // Transform data for ApexCharts
  const series = metrics.map(metric => ({
    name: getMetricDisplayName(metric),
    data: data.map(item => ({
      x: new Date(item.timestamp).getTime(),
      y: getMetricValue(item, metric)
    }))
  }));

  function getMetricDisplayName(metric) {
    const names = {
      cpu: 'CPU Utilization',
      memory: 'Memory Utilization',
      disk: 'Disk Utilization',
      network: 'Network Utilization',
      response5250: '5250 Response Time'
    };
    return names[metric] || metric;
  }

  function getMetricValue(item, metric) {
    switch (metric) {
      case 'cpu':
        return item.cpuUtilization || 0;
      case 'memory':
        return item.memoryUtilization || 0;
      case 'disk':
        return item.diskUtilization || 0;
      case 'network':
        return item.networkUtilization || 0;
      case 'response5250':
        return (item.responseTime5250 || 0) * 1000; // Convert to ms
      default:
        return 0;
    }
  }

  const colors = metrics.map(metric => getMetricColor(metric));

  const options = {
    chart: {
      type: 'line',
      zoom: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'HH:mm'
      }
    },
    yaxis: metrics.includes('response5250') ? [
      {
        min: 0,
        max: 100,
        title: {
          text: 'Utilization (%)'
        },
        labels: {
          formatter: (value) => formatPercentage(value, 0)
        }
      },
      {
        opposite: true,
        min: 0,
        title: {
          text: 'Response Time (ms)'
        },
        labels: {
          formatter: (value) => `${value.toFixed(0)}ms`
        }
      }
    ] : {
      min: 0,
      max: 100,
      labels: {
        formatter: (value) => formatPercentage(value, 0)
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        format: 'MMM dd, HH:mm'
      },
      y: {
        formatter: (value, { seriesIndex }) => {
          const metric = metrics[seriesIndex];
          if (metric === 'response5250') {
            return `${value.toFixed(1)}ms`;
          }
          return formatPercentage(value, 1);
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    annotations: {
      yaxis: [
        {
          y: 75,
          borderColor: '#F59E0B',
          borderDash: 2,
          opacity: 0.8,
          label: {
            text: 'Warning',
            style: {
              color: '#F59E0B',
              fontSize: '10px'
            }
          }
        },
        {
          y: 90,
          borderColor: '#EF4444',
          borderDash: 2,
          opacity: 0.8,
          label: {
            text: 'Critical',
            style: {
              color: '#EF4444',
              fontSize: '10px'
            }
          }
        }
      ]
    }
  };

  return (
    <Chart
      type="line"
      series={series}
      title={title}
      height={height}
      loading={loading}
      error={error}
      options={options}
      colors={colors}
    />
  );
}