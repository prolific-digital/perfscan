import React from "react";
import moment from "moment";

const ReportHeaderProblemDeterminationReport = ({queryDateTimeReport}) => {
  return (
    <div className="detail-analysis">
      <p>Current Memory Analysis</p>
      <p>
        Period Analyzed -{" "}
        {queryDateTimeReport?.sdata ? moment(queryDateTimeReport?.sdata).format("LL") : "___"} - {" "}
        {queryDateTimeReport?.edate ? moment(queryDateTimeReport?.edate).format("LL") : "___"}
      </p>
      <p>
        Time Analyzed -{" "}
        {queryDateTimeReport?.stime ? moment(`${queryDateTimeReport?.stime}`,"HHmmss").format("hh:mm a") :"___" } -{" "}
        {queryDateTimeReport?.etime ? moment(`${queryDateTimeReport?.etime}`,"HHmmss").format("hh:mm a") :"___" }
      </p>
    </div>
  );
};

export default ReportHeaderProblemDeterminationReport;
