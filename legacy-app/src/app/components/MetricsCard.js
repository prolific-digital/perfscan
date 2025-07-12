import React from "react";
import { Checkbox } from "primereact/checkbox";
import {
  checkPeakSystemStatus,
  metricCalculation,
} from "../../helpers/commonHelper";

// PrimeReact styles
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function MetricsCard({
  cpuData,
  keyID,
  graphToggleState,
  cardClickHandler,
  alertMetricAlignClass = "",
  alertWrapperClass = "",
  coreMetricPage,
  toggleMetricGraph
}) {
  const cardStyle = {
    width: coreMetricPage ? "calc(31% - 5px)" : "",
    boxShadow: graphToggleState ? "7px 7px 5px rgba(69, 64, 73, 0.43)" : "",
  };

  return (
    <div
      className={`metricsCard ${checkPeakSystemStatus(
        cpuData
      )} ${alertMetricAlignClass} ${alertWrapperClass}`}
      key={keyID}
      style={cardStyle}
    >
      <div className="info" onClick={cardClickHandler}>
        <div className="title">
          {cpuData?.dtypedesc}: {keyID}
        </div>
        <div className="sub_title">
          {metricCalculation(cpuData, "metricPage")}
        </div>
      </div>
      <div className="circular-checkbox" style={{ marginTop: "-1rem" }} onClick={toggleMetricGraph}>
        <Checkbox
          inputId={`circularCheckbox-${keyID}`}
          checked={graphToggleState}
        />
      </div>
    </div>
  );
}

export default MetricsCard;
