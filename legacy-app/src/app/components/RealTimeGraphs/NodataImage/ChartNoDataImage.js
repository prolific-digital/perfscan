const ChartNoDataImage = ({
  metric,
  checkData,
  activeChartView,
  metricName,
  graphToggle,
  trendGraphToggle,
}) => {
  return (
    <>
      {!metric.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              <div style={{ textAlign: "center" }}>
                <h4>{metricName}</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt={`No data available for ${metricName}`}
                />
              </div>
            </div>
            <div className="chat_main1">
              <div style={{ textAlign: "center" }}>
                <h4>{metricName}</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt={`No data available for ${metricName}`}
                />
              </div>
            </div>
          </div>
        )}
      {!metric.loading &&
        checkData === false &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false && (
          <div className="chart_container">
            <div className="chat_main1">
              <div style={{ textAlign: "center" }}>
                <h4>{metricName}</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt={`No data available for ${metricName}`}
                />
              </div>
            </div>
          </div>
        )}

      {!metric.loading &&
        checkData &&
        activeChartView.isMetricsChart &&
        activeChartView.isTrendsChart === false &&
        graphToggle && (
          <div className="chart_container">
            <div className="chat_main1">
              <div style={{ textAlign: "center" }}>
                <h4>{metricName}</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt={`No data available for ${metricName}`}
                />
              </div>
            </div>
          </div>
        )}

      {!metric.loading &&
        checkData &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart &&
        trendGraphToggle && (
          <div className="chart_container">
            <div className="chat_main1">
              <div style={{ textAlign: "center" }}>
                <h4>{metricName}</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt={`No data available for ${metricName}`}
                />
              </div>
            </div>
          </div>
        )}

      {!metric.loading &&
        checkData === false &&
        activeChartView.isMetricsChart === false &&
        activeChartView.isTrendsChart && (
          <div className="chart_container">
            <div className="chat_main1">
              <div style={{ textAlign: "center" }}>
                <h4>{metricName}</h4>
                <img
                  style={{ height: "50%", width: "50%" }}
                  src="/noData.webp"
                  alt={`No data available for ${metricName}`}
                />
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default ChartNoDataImage;
