import React from 'react';
import moment from "moment";

function CapacityHeader(props) {
  const {system1, system2, sys1Cores, sys2Cores, sys1CPW, sys2CPW, sysOpt, report} = props;

  const shiftHeader = (val)=>{
    let result = ''
    if(val){
      result = '15px';
    }
    return result;
  }
  
  return (
    <div className="detail-analysis" style={{paddingLeft:shiftHeader(report)}}>
      <p>{'Capacity Planning Analysis'}</p>
      
      <p>
        Systems Compared - {system1} vs. {system2}
      </p>
    </div>
  )
}

export default CapacityHeader