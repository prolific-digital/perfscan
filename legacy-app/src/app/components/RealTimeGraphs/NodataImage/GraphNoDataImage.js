const GraphNoDataImage = ({ metricName }) => {
  return (
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
  );
};

export default GraphNoDataImage;
