import React from 'react';
import moment from "moment";

function PeriodHeader(props) {
  const { period1, period2, system1, system2, sys1SerialNum, sys2SerialNum, systems,report, stime1, stime2, etime1, etime2 } = props;

  const shiftHeader = (val)=>{
    let result = ''
    if(val){
      result = '15px';
    }
    return result;
  }
  
  return (
    <div className="detail-analysis" style={{paddingLeft:shiftHeader(report)}}>
    <p>{'PERIOD vs. PERIOD ANALYSIS'}</p>
    <p style={{color:'blue'}}>{system1} - {sys1SerialNum}  {systems ==='Multiple' && system2 !== system1 &&  `vs ${system2} - ${sys2SerialNum}`}</p>
    <p>
      Period Analyzed - {period1} vs. {period2}
    </p>
    <p>
        Time Analyzed -{" "}
        {stime1 ? moment(`${stime1}:00`, "HHmmss").format("hh:mm a") : "___"} -{" "}
        {etime1 ? moment(`${etime1}:00`, "HHmmss").format("hh:mm a") : "___"}
        {systems === "Multiple" && system2 !== system1 &&
        <> vs {" "}
        {stime2 ? moment(`${stime2}:00`, "HHmmss").format("hh:mm a") : "___"} -{" "}
        {etime2 ? moment(`${etime2}:00`, "HHmmss").format("hh:mm a") : "___"}
        </>
        }
      </p>
  </div>
  )
}

export default PeriodHeader