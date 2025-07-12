import React from "react";
import moment from "moment";
import usePDQueryData from "../QueryDates/usePDQueryData"

const ReportHeaderProblemDetermination = () => {
  const queryDateTime = usePDQueryData();
  return (
    <div className="detail-analysis">
      <p>Current Memory Analysis</p>
      <p>
        Period Analyzed -{" "}
        {queryDateTime.sdate ? moment(queryDateTime.sdate).format("LL") : "___"} - {" "}
        {queryDateTime.edate ? moment(queryDateTime.edate).format("LL") : "___"}
      </p>
      <p>
        Time Analyzed -{" "}
        {queryDateTime.stime ? moment(`${queryDateTime.stime}`,"HHmmss").format("hh:mm a") :"___" } -{" "}
        {queryDateTime.etime ? moment(`${queryDateTime.etime}`,"HHmmss").format("hh:mm a") :"___" }
      </p>
    </div>
  );
};

export default ReportHeaderProblemDetermination;
