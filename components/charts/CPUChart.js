'use client';

import Chart from './Chart';
import { formatPercentage } from '@/lib/utils';

export default function CPUChart({ 
  data = [], 
  loading = false, 
  error = null,
  title = "CPU Utilization",
  height = 350 
}) {
  // Transform data for ApexCharts
  const series = [{
    name: 'CPU Utilization',
    data: data.map(item => ({
      x: new Date(item.timestamp).getTime(),
      y: item.utilization || 0
    }))
  }];

  const options = {
    chart: {
      type: 'area',
      zoom: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
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
          y: 75,
          borderColor: '#F59E0B',
          label: {
            text: 'Warning (75%)',
            style: {
              color: '#F59E0B',
              fontSize: '10px'
            }
          }
        },
        {
          y: 90,
          borderColor: '#EF4444',
          label: {
            text: 'Critical (90%)',
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
      type="area"
      series={series}
      title={title}
      height={height}
      loading={loading}
      error={error}
      options={options}
      colors={['#EF4444']}
    />
  );
}