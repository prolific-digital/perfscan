'use client';

import { useState, useEffect } from 'react';
import { getMetricColor } from '@/lib/utils';
import Loading from '@/components/common/Loading';

// Dynamic import to avoid SSR issues
export default function Chart({ 
  type = 'line',
  series = [],
  categories = [],
  title = '',
  subtitle = '',
  height = 350,
  colors = [],
  loading = false,
  error = null,
  options = {}
}) {
  const [ApexChart, setApexChart] = useState(null);

  useEffect(() => {
    // Dynamically import ApexCharts to avoid SSR issues
    import('react-apexcharts').then((mod) => {
      setApexChart(mod.default);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <Loading text="Loading chart..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="text-center text-gray-500">
          <p className="text-sm">Error loading chart</p>
          <p className="text-xs mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!ApexChart) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <Loading text="Loading chart component..." />
      </div>
    );
  }

  // Default chart options
  const defaultOptions = {
    chart: {
      type,
      height,
      background: 'transparent',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        }
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800
      }
    },
    theme: {
      mode: 'light'
    },
    colors: colors.length > 0 ? colors : [
      getMetricColor('cpu'),
      getMetricColor('memory'),
      getMetricColor('disk'),
      getMetricColor('network'),
      getMetricColor('response5250')
    ],
    title: title ? {
      text: title,
      style: {
        fontSize: '16px',
        fontWeight: 600,
        color: '#374151'
      }
    } : undefined,
    subtitle: subtitle ? {
      text: subtitle,
      style: {
        fontSize: '14px',
        color: '#6B7280'
      }
    } : undefined,
    xaxis: {
      categories,
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280',
          fontSize: '12px'
        }
      }
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 2
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '12px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    tooltip: {
      theme: 'light',
      fillSeriesColor: false,
      style: {
        fontSize: '12px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }
    },
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

  // Merge custom options with defaults
  const chartOptions = {
    ...defaultOptions,
    ...options,
    chart: {
      ...defaultOptions.chart,
      ...options.chart
    },
    xaxis: {
      ...defaultOptions.xaxis,
      ...options.xaxis
    },
    yaxis: {
      ...defaultOptions.yaxis,
      ...options.yaxis
    }
  };

  if (!series || series.length === 0) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <div className="text-center text-gray-500">
          <p className="text-sm">No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ApexChart
        options={chartOptions}
        series={series}
        type={type}
        height={height}
      />
    </div>
  );
}