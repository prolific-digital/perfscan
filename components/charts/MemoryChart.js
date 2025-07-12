'use client';

import Chart from './Chart';
import { formatPercentage } from '@/lib/utils';

export default function MemoryChart({ 
  data = [], 
  loading = false, 
  error = null,
  title = "Memory Utilization",
  height = 350 
}) {
  // Transform data for ApexCharts
  const series = [{
    name: 'Memory Utilization',
    data: data.map(item => ({
      x: new Date(item.timestamp).getTime(),
      y: item.utilization || 0
    }))
  }];

  const options = {
    chart: {
      type: 'line',
      zoom: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      type: 'datetime',
      labels: {
        format: 'HH:mm'
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      labels: {
        formatter: (value) => formatPercentage(value, 0)
      }
    },
    tooltip: {
      x: {
        format: 'MMM dd, HH:mm'
      },
      y: {
        formatter: (value) => formatPercentage(value, 1)
      }
    },
    annotations: {
      yaxis: [
        {
          y: 85,
          borderColor: '#F59E0B',
          label: {
            text: 'Warning (85%)',
            style: {
              color: '#F59E0B',
              fontSize: '10px'
            }
          }
        },
        {
          y: 95,
          borderColor: '#EF4444',
          label: {
            text: 'Critical (95%)',
            style: {
              color: '#EF4444',
              fontSize: '10px'
            }
          }
        }
      ]
    },
    markers: {
      size: 4,
      strokeWidth: 2,
      fillOpacity: 1,
      strokeOpacity: 1,
      hover: {
        size: 6
      }
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
      colors={['#3B82F6']}
    />
  );
}