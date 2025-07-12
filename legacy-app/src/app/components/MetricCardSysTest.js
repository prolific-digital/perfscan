import React from "react";

function MetricsCardSysTest(props) {
  const {
    keyID,
    type,
    msg,
    serverName,
    serverLocation,
    cardClickHandler,
    // systemType,
    system_type,
    alertWrapperClass,
    lpar,
  } = props;
  return (
    <div
      className={`metricsCard ${type.toLowerCase()} ${alertWrapperClass || ""}`}
      onClick={cardClickHandler}
      key={keyID}
      style={{ width: "calc(46% - 15px)" }}
    >
      <div className="info">
        <div className="title">
          {serverName}: {true}
          {keyID}
        </div>
        <div className="sub_title">
          {/* {lpar ? serverLocation : `(${systemType})`} */}
          {lpar ? serverLocation : `(${system_type == "5" ? "Host" : "Frame"})`}
        </div>
      </div>
      <div className="msg">{msg}</div>
    </div>
  );
}

export default MetricsCardSysTest;
