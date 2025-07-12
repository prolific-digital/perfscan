import React from "react";
import moment from "moment";

function PeriodHeaderDetails(props) {
    const { reportTitle, sdate, edate, server } = props.props;
    return (
      <div className="detail-analysis">
        <p>EXECUTIVE SUMMARY - {server}</p>
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
        {/* <p>
          Time Analyzed -{" "}
          {stime ? moment(`${stime}:00`, "HHmmss").format("hh:mm a") : "___"} -{" "}
          {etime ? moment(`${etime}:00`, "HHmmss").format("hh:mm a") : "___"}
        </p> */}
      </div>
    );
}
export default PeriodHeaderDetails


// export default ReportHeaderDetails;


