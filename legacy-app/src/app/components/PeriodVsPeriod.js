import {useState,Fragment} from 'react'
import PeriodHeaderDetails from "./PeriodHeaderDetails";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";
import { Row } from 'reactstrap';

function PeriodVsPeriod(props) {
  const [dataTableLoop, setDataTableLoop] = useState([...props.versionsList,'Comp']);

  const checkSystemStatus = (data) => {
    let status = "";
    if (+data.warning === 0 && +data.critical === 0) {
      status = "Info";
    } else if (+data.data[0].avrg < +data.warning && +data.data[0].avrg < +data.critical) {
      status = "Good";
    } else if (+data.data[0].avrg > +data.warning && +data.data[0].avrg < +data.critical) {
      status = "Warning";
    } else if (+data.data[0].avrg > +data.critical) {
      status = "Critical";
    }
    return status;
  };

  const checkGrowthStatus = (data) => {
    let status = "Info";
    if (
      +data.warning_change_growth === 0 &&
      +data.critical_change_growth === 0
    ) {
      status = "Info";
    } else if (+data.data[0].diff < +data.warning_change_growth) {
      status = "Black";
    } else if (+data.data[0].diff > +data.critical_change_growth) {
      status = "Critical";
    } else if (
      +data.critical_change_growth > +data.data[0].diff &&
      +data.data[0].diff > +data.warning_change_growth
    ) {
      status = "Warning";
    }
    return status;
  };

  /* Finding data for detailed display */

  const renderFindings = (data) => {
    let type = data.dtype || "";
    let typeDescription = data.dtypedesc || "";
    if (type === "TopPoolFaultingRate") {
      const poolList = data.data || [];
      const dataDom = poolList.map((item) => (
        <>
          <div>The following pool was analyzed for : {item.pool}</div>
          <div>
            The average faulting rate was {item.faulting_rate} fault/sec
          </div>
          <br></br>
        </>
      ));
      return dataDom;
    }
    let avgValue = data.data.length ? data.data[0].avrg : 0;
    let peakValue = data.data.length ? data.data[0].peak : 0;
    let diffValue = data.data.length ? data.data[0].diff : 0;
    let avgPercentageSymBol = "%";
    let peakPercentageSymBol = "%";
    let diffPercentageSymBol = "%";
    let isDecimal =
      type === "cpums" || type === "total_transactions" ? false : true;

    switch (type) {
      case "DiskResponseTime":
        avgPercentageSymBol = peakPercentageSymBol = " ms";
        break;

      case "numCores":
      case "cpums":
      case "total_transactions":
        avgPercentageSymBol = peakPercentageSymBol = "";
        diffPercentageSymBol = "%";
        break;
      case "total_disk_ops":
      case "ethernet_line_utilization":
        avgPercentageSymBol = peakPercentageSymBol = "%"; //ops / sec
        diffPercentageSymBol = "%";
        break;
      case "TotalFaultingRate":  
      case "faulting_rate": // FaultingRate
      case "machine_pool_faulting":
      case "memory_size_faulting":  
        avgPercentageSymBol = peakPercentageSymBol = " faults / sec";
        diffPercentageSymBol = "%";
        break;
      case "response_time_5250":
        avgPercentageSymBol = peakPercentageSymBol = " seconds";
        diffPercentageSymBol = "%";
        break;

      default:
        break;
    }

    let average = isDecimal ? avgValue : Math.floor(avgValue)?.toLocaleString();
    
    let peak = isDecimal
      ? peakValue?.toLocaleString()
      : Math.floor(peakValue)?.toLocaleString();
    // let peak = Math.floor(peakValue)?.toLocaleString();
    let difference = isDecimal
      ? diffValue?.toLocaleString()
      : Math.floor(diffValue)?.toLocaleString();

    if (type === "memoryvsfaulting") { // memoryvsfaulting
      typeDescription = "Faulting";
    }
    let peakNum = parseInt(peak);
   
    if(data.data.length === 0){
      return (<div>No data found for selected period</div>)
    }else{
      return (
        <div className="findings_col">
          <div className={checkSystemStatus(data)}>
            The average {typeDescription} was {average}
            {avgPercentageSymBol}
          </div>
          {/* peakNum>999?Math.floor(peak)?.toLocaleString(): */}
          <div className={checkSystemStatus(data)}>
            The peak {typeDescription} was {peak}
            {peakPercentageSymBol} (
            {moment(data.event_time).format("MMMM Do YYYY, h:mm a")})
          </div>
          {/* <div className={checkGrowthStatus(data)}>
            For the historical period analyzed, the average {typeDescription}{" "}
            increased {Math.floor(difference)?.toLocaleString()}
            {diffPercentageSymBol}{" "}
          </div> */}
          {type === "memoryvsfaulting" && (  // memoryvsfaulting
            <>
              <br></br>
              <div className={checkSystemStatus(data)}>
                The average Memory was {Math.floor(data.avrgmem)?.toLocaleString()}
                {avgPercentageSymBol}
              </div>
              <div className={checkSystemStatus(data)}>
                The peak Memory was {Math.floor(data.peakmemory)?.toLocaleString()}
                {peakPercentageSymBol} (
                {moment(data.event_time).format("MMMM Do YYYY, h:mm a")}
                )
              </div>
              {/* <div className={checkGrowthStatus(data)}>
                For the historical period analyzed, the average Memory increased{" "}
                {data.diffmemory}
                {diffPercentageSymBol}{" "}
              </div> */}
            </>
          )}
        </div>
      );
    }
  };

  const renderFindingsRandom = (data) => {
    let newData =Math.random();
    newData = newData.toFixed(2);
    let type = data.dtype || "";
    let typeDescription = data.dtypedesc || "";
    if (type === "TopPoolFaultingRate") {
      const poolList = data.data || [];
      const dataDom = poolList.map((item) => (
        <>
          <div>The following pool was analyzed for : {item.pool}</div>
          <div>
            The average faulting rate was {item.faulting_rate} fault/sec
          </div>
          <br></br>
        </>
      ));
      return dataDom;
    }
    let avgValue = data.data.length ? (data.data[0].avrg - newData) : 0;
    let peakValue = data.data.length ? (data.data[0].peak - newData) : 0;
    let diffValue = data.data.length ? (data.data[0].diff - newData) : 0;
    avgValue = avgValue.toFixed(2);
    peakValue = peakValue.toFixed(2);
    diffValue = diffValue.toFixed(2);
    let avgPercentageSymBol = "%";
    let peakPercentageSymBol = "%";
    let diffPercentageSymBol = "%";
    let isDecimal =
      type === "cpums" || type === "total_transactions" ? false : true;

    switch (type) {
      case "DiskResponseTime":
        avgPercentageSymBol = peakPercentageSymBol = " ms";
        break;

      case "numCores":
      case "cpums":
      case "total_transactions":
        avgPercentageSymBol = peakPercentageSymBol = "";
        diffPercentageSymBol = "%";
        break;
      case "total_disk_ops":
      case "ethernet_line_utilization":
        avgPercentageSymBol = peakPercentageSymBol = "%"; //ops / sec
        diffPercentageSymBol = "%";
        break;
      case "TotalFaultingRate":  
      case "faulting_rate": // FaultingRate
      case "machine_pool_faulting":
      case "memory_size_faulting":  
        avgPercentageSymBol = peakPercentageSymBol = " faults / sec";
        diffPercentageSymBol = "%";
        break;
      case "response_time_5250":
        avgPercentageSymBol = peakPercentageSymBol = " seconds";
        diffPercentageSymBol = "%";
        break;

      default:
        break;
    }

    let average = isDecimal ? avgValue : Math.floor(avgValue)?.toLocaleString();
    
    let peak = isDecimal
      ? peakValue?.toLocaleString()
      : Math.floor(peakValue)?.toLocaleString();
    // let peak = Math.floor(peakValue)?.toLocaleString();
    let difference = isDecimal
      ? diffValue?.toLocaleString()
      : Math.floor(diffValue)?.toLocaleString();

    if (type === "memoryvsfaulting") { // memoryvsfaulting
      typeDescription = "Faulting";
    }
    let peakNum = parseInt(peak);
   
    if(data.data.length === 0){
      return (<div>No data found for selected period</div>)
    }else{
      return (
        <div className="findings_col">
          <div className={checkSystemStatus(data)}>
            The average {typeDescription} was {average}
            {avgPercentageSymBol}
          </div>
          {/* peakNum>999?Math.floor(peak)?.toLocaleString(): */}
          <div className={checkSystemStatus(data)}>
            The peak {typeDescription} was {peak}
            {peakPercentageSymBol} (
            {moment(data.event_time).format("MMMM Do YYYY, h:mm a")})
          </div>
          {/* <div className={checkGrowthStatus(data)}>
            For the historical period analyzed, the average {typeDescription}{" "}
            increased {Math.floor(difference)?.toLocaleString()}
            {diffPercentageSymBol}{" "}
          </div> */}
          {type === "memoryvsfaulting" && (  // memoryvsfaulting
            <>
              <br></br>
              <div className={checkSystemStatus(data)}>
                The average Memory was {Math.floor(data.avrgmem)?.toLocaleString()}
                {avgPercentageSymBol}
              </div>
              <div className={checkSystemStatus(data)}>
                The peak Memory was {Math.floor(data.peakmemory)?.toLocaleString()}
                {peakPercentageSymBol} (
                {moment(data.event_time).format("MMMM Do YYYY, h:mm a")}
                )
              </div>
              {/* <div className={checkGrowthStatus(data)}>
                For the historical period analyzed, the average Memory increased{" "}
                {data.diffmemory}
                {diffPercentageSymBol}{" "}
              </div> */}
            </>
          )}
        </div>
      );
    }
  };

  const renderFindingsForComparison = (data) => {
    let type = data.dtype || "";
    let typeDescription = data.dtypedesc || "";
    if (type === "TopPoolFaultingRate") {
      const poolList = data.data || [];
      const dataDom = poolList.map((item) => (
        <>
          <div>The following pool was analyzed for : {item.pool}</div>
          <div>
            The average faulting rate was increased by {item.faulting_rate} fault/sec
          </div>
          <br></br>
        </>
      ));
      return dataDom;
    }
    let avgValue = data.data.length ? data.data[0].avrg : 0;
    let peakValue = data.data.length ? data.data[0].peak : 0;
    let diffValue = data.data.length ? data.data[0].diff : 0;
    let avgPercentageSymBol = "%";
    let peakPercentageSymBol = "%";
    let diffPercentageSymBol = "%";
    let isDecimal =
      type === "cpums" || type === "total_transactions" ? false : true;

    switch (type) {
      case "DiskResponseTime":
        avgPercentageSymBol = peakPercentageSymBol = " ms";
        break;

      case "numCores":
      case "cpums":
      case "total_transactions":
        avgPercentageSymBol = peakPercentageSymBol = "";
        diffPercentageSymBol = "%";
        break;
      case "total_disk_ops":
      case "ethernet_line_utilization":
        avgPercentageSymBol = peakPercentageSymBol = "%"; //ops / sec
        diffPercentageSymBol = "%";
        break;
      case "TotalFaultingRate":  
      case "faulting_rate": // FaultingRate
      case "machine_pool_faulting":
      case "memory_size_faulting":  
        avgPercentageSymBol = peakPercentageSymBol = " faults / sec";
        diffPercentageSymBol = "%";
        break;
      case "response_time_5250":
        avgPercentageSymBol = peakPercentageSymBol = " seconds";
        diffPercentageSymBol = "%";
        break;

      default:
        break;
    }

    let average = isDecimal ? avgValue : Math.floor(avgValue)?.toLocaleString();
    
    let peak = isDecimal
      ? peakValue?.toLocaleString()
      : Math.floor(peakValue)?.toLocaleString();
    // let peak = Math.floor(peakValue)?.toLocaleString();
    let difference = isDecimal
      ? diffValue?.toLocaleString()
      : Math.floor(diffValue)?.toLocaleString();

    if (type === "memoryvsfaulting") { // memoryvsfaulting
      typeDescription = "Faulting";
    }
    let peakNum = parseInt(peak);
   
    if(data.data.length === 0){
      return (<div>No data found for selected period</div>)
    }else{
      return (
        <div className="findings_col">
          <div className={checkSystemStatus(data)}>
            The average {typeDescription} was increased by {average}
            {avgPercentageSymBol}
          </div>
          {/* peakNum>999?Math.floor(peak)?.toLocaleString(): */}
          <div className={checkSystemStatus(data)}>
            The peak {typeDescription} was increased by {peak}
            {peakPercentageSymBol} (
            {moment(data.event_time).format("MMMM Do YYYY, h:mm a")})
          </div>
          {/* <div className={checkGrowthStatus(data)}>
            For the historical period analyzed, the average {typeDescription}{" "}
            increased {Math.floor(difference)?.toLocaleString()}
            {diffPercentageSymBol}{" "}
          </div> */}
          {type === "memoryvsfaulting" && (  // memoryvsfaulting
            <>
              <br></br>
              <div className={checkSystemStatus(data)}>
                The average Memory was increased by {Math.floor(data.avrgmem)?.toLocaleString()}
                {avgPercentageSymBol}
              </div>
              <div className={checkSystemStatus(data)}>
                The peak Memory was increased by {Math.floor(data.peakmemory)?.toLocaleString()}
                {peakPercentageSymBol} (
                {moment(data.event_time).format("MMMM Do YYYY, h:mm a")}
                )
              </div>
              {/* <div className={checkGrowthStatus(data)}>
                For the historical period analyzed, the average Memory increased{" "}
                {data.diffmemory}
                {diffPercentageSymBol}{" "}
              </div> */}
            </>
          )}
        </div>
      );
    }
  };

const renderHeader1 = () => {
    return (
        // <div className="flex justify-content-between align-items-center">
        <div>
            <h5 className="anotherHeader">Application v4.1</h5>
            <h5 className="m-0">April 1, 2021</h5>
        </div>
    )
}

const renderHeader2 = () => {
  return (
      // <div className="flex justify-content-between align-items-center">
      <div>
          <h5>"Comparing Periods (April 1, 2021 vs. May 1, 2021)"</h5>
      </div>
  )
}

const calcPercentDiff = () => {
  // (v1-v2)/((v1+v2)/2)*(100)
}

  return (
    <>
      <PeriodHeaderDetails props = {props} />    
        <div className='wrapDataTables'>                
            <table className="table table-bordered table-striped tableAlign">
                <thead >
                    <tr style={{backgroundColor:'#efefef'}}>
                      <th colspan="3">Application v4.1</th>
                      <th colspan="2">Application v5.1</th>
                      <th></th>                                   
                    </tr>
                    <tr style={{backgroundColor:'#efefef'}}>
                      <th colspan="3">April 1</th>
                      <th colspan="2">May 1</th>
                      <th></th>
                    </tr>
                    <tr style={{backgroundColor:'#75c5f0'}}>
                      <th>Core Metric</th>
                      <th>Status</th>
                      <th>Observations</th>
                      {/* <th>Core Metric</th> */}
                      <th>Status</th>
                      <th>Observations</th>
                      <th>Comparing versions (v4.1 vs v5.1)</th>                                        
                    </tr>
                </thead>
                <tbody>
                    { props.allExecutiveDataSets.map((res,index)=>{
                        let systemStatus = checkSystemStatus(res);
                        let findings = renderFindings(res);
                        let ranNum = renderFindingsRandom(res);
                        let compData = renderFindingsForComparison(res);
                        return (
                          <tr>
                            <td>{res.dtypedesc}</td>
                            <td>{
                                <span className={checkSystemStatus(res)}>
                                {systemStatus}</span>
                              }
                            </td>
                            <td>{findings}</td>
                            {/* <td>{res.dtypedesc}</td> */}
                            <td>{
                                  <span className={checkSystemStatus(res)}>
                                      {systemStatus}
                                  </span>
                                }</td>
                            <td>{ranNum}</td>
                            <td>{compData}</td>
                          </tr>
                        )
                      })                         
                    }
                </tbody>
            </table>                
        </div> 
      
    </>
  )
}
export default PeriodVsPeriod