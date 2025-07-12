import React from "react";

function MetricsCard(props) {
  const {
    keyID,
    type,
    msg,
    serverName,
    serverLocation,
    cardClickHandler,
    systemType,
    alertWrapperClass,
  } = props;
  return (
    <div
      className={`metricsCard ${type} ${alertWrapperClass || ""}`}
      onClick={cardClickHandler}
      key={keyID}
      style={{ width: alertWrapperClass ? "calc(46% - 15px)" : "" }}
    >
      <div className="info">
        <div className="title">
          {serverName}: {true}
          {keyID}
        </div>
        <div className="sub_title">{serverLocation}</div>
      </div>
      <div className="msg">{msg}</div>
    </div>
  );
}

export default MetricsCard;
