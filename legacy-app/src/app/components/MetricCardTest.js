import React from "react";

function MetricsCardTest(props) {
  const {
    keyID,
    type,
    msg,
    metricsName,
    utilization,
    cardClickHandler,
    alertMetricAlignClass,
    alertWrapperClass,
    serverName,
    date,
    alertNotification,
    id,
    metricPage,
    coreMetricPage
  } = props;
  return (
    <div
      className={`metricsCard ${type} ${alertMetricAlignClass || ""} ${
        alertWrapperClass || ""
      }`}
      onClick={cardClickHandler}
      key={keyID}
      style={{ width: coreMetricPage ? "calc(31% - 5px)" : "" }}
    >
      <div className="info">
        <div className="header" style={{ marginBottom: "0.5rem" }}>
          {serverName} {alertNotification ? id : ""}
        </div>
        <div className="title" style={{ marginBottom: "0.3rem" }}>
          {metricsName}: {true}
          {keyID} {!metricPage ? utilization : ""}
        </div>
        {metricPage && (
          <div className="sub_title" style={{ marginBottom: "0.3rem" }}>
            {utilization}
          </div>
        )}
        <div className="sub_title">{date}</div>
      </div>
      <div className="msg">{msg}</div>
    </div>
  );
}

export default MetricsCardTest;
