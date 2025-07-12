'use client';

import Chart from './Chart';
import { formatNumber } from '@/lib/utils';

export default function JobsDonutChart({ 
  data = [], 
  loading = false, 
  error = null,
  title = "Top CPU Jobs",
  height = 350 
}) {
  // Transform data for ApexCharts
  const series = data.map(job => job.cpuPercent || 0);
  const labels = data.map(job => `${job.jobName} (${job.user})`);

  const options = {
    chart: {
      type: 'donut'
    },
    labels,
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
              fontWeight: 600
            },
            value: {
              show: true,
              fontSize: '16px',
              fontWeight: 600,
              formatter: (value) => `${parseFloat(value).toFixed(1)}%`
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total CPU',
              fontSize: '14px',
              fontWeight: 400,
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return `${total.toFixed(1)}%`;
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => {
        return `${val.toFixed(1)}%`;
      },
      style: {
        fontSize: '12px',
        fontWeight: 600
      },
      dropShadow: {
        enabled: false
      }
    },
    tooltip: {
      y: {
        formatter: (value, { dataPointIndex }) => {
          const job = data[dataPointIndex];
          return `${value.toFixed(1)}% CPU<br/>User: ${job?.user || 'Unknown'}`;
        }
      }
    },
    legend: {
      position: 'bottom',
      fontSize: '12px',
      formatter: (seriesName, opts) => {
        const value = opts.w.globals.series[opts.seriesIndex];
        return `${seriesName}: ${value.toFixed(1)}%`;
      }
    },
    colors: [
      '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6',
      '#EC4899', '#F97316', '#84CC16', '#06B6D4', '#6366F1'
    ],
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            height: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="text-center text-gray-500">
          <p className="text-sm">No job data available</p>
        </div>
      </div>
    );
  }

  return (
    <Chart
      type="donut"
      series={series}
      title={title}
      height={height}
      loading={loading}
      error={error}
      options={options}
    />
  );
}