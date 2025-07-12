import React from "react";
import moment from "moment";

const ReportHeaderDetails = (props) => {
  const { reportTitle, sdate, stime, edate, etime, server } = props;
  return (
    <div className="detail-analysis">
      <p>Core Metric Performance Analysis - <span style={{color:'blue'}}>{server}</span></p>
      <p>{reportTitle}</p>
      <p>
        Period Analyzed -{" "}
        {sdate === edate ? (
          sdate ? (
            moment(sdate).format("LL")
          ) : (
            "___"
          )
        ) : (
          <>
            {sdate ? moment(sdate).format("LL") : "___"} -{" "}
            {edate ? moment(edate).format("LL") : "___"}
          </>
        )}
      </p>
      <p>
        Time Analyzed -{" "}
        {stime ? moment(`${stime}:00`, "HHmmss").format("hh:mm a") : "___"} -{" "}
        {etime ? moment(`${etime}:00`, "HHmmss").format("hh:mm a") : "___"}
      </p>
    </div>
  );
};

export default React.memo(ReportHeaderDetails);
