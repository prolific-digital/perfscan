import moment from "moment";
import { useSelector } from "react-redux";

import {
  CPU_UTILIZATION_SYS,
  CPU_UTILIZATION_INT,
  CPU_UTILIZATION_BATCH,
  CPU_UTILIZATION_4,
  NO_OF_CORES,
  NO_OF_CORES_TRENDS,
  TRENDS,
  CPU_MS,
  CPU_MS_TRENDS,
  DISK_SPACE_UTILIZATION,
  DISK_SPACE_TRENDS,
  DISK_ARM_UTILIZATION,
  DISK_ARM_TRENDS,
  READS,
  DISK_OPERATIONS,
  DISK_OPERATIONS_TRENDS,
  DISK_RESPONSE,
  DISK_RESPONSE_TRENDS,
  CACHE_HIT,
  CACHE_HIT_TRENDS,
  CPW_UTILIZATION_INT,
  CPW_UTILIZATION_BATCH,
  CPW_UTILIZATION_TOTAL,
  MACHINE_POOL,
  MACHINE_POOL_TRENDS
} from "../typeCodes";
import {
  getCurrent, getProposed
} from "../store/slices/capacityplanning/CapacityPlanningSlice";
import {separateComma} from "./commonHelper"

import * as _ from 'lodash';
export const getProposedSystemData = (data) => {
    let result = data?.map((item, index) => {
      return {
        key: '0',
        label: 'Documents',
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-inbox',
        children: [
            {
                key: '0-0',
                label: 'Work',
                data: 'Work Folder',
                icon: 'pi pi-fw pi-cog',
                children: [
                    { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                    { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
                ]
            },
            {
                key: '0-1',
                label: 'Home',
                data: 'Home Folder',
                icon: 'pi pi-fw pi-home',
                children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
            }
        ]
      };
    });
    return result;
  };
  export const getDataPointsGrowth = (data, type, perc_growth) => {
    let result = data?.map((item, index) => {
      let dateTime = item.event_time
        ? moment(item.event_time)
        : moment();
      const year = dateTime.year();
      const month = dateTime.month();
      const date = dateTime.date();
      const hours = dateTime.hours();
      const minutes = dateTime.minutes();
      const d = new Date(year, month, date, hours, minutes);
      const dt = new Date(d.getTime());
      const growth = (item[type]*perc_growth)/100
      return {
        x: dt,
        y: _.round((+item[type] + growth),2)
      };
    });
    return result;
  };

  export const getDataPointsForMemVsFaultGrowth = (data, type, perc_growth) => {
    let userDate = new Date();
    let userTimezoneOffset = userDate.getTimezoneOffset() * 60000;
    let result = data[1].map((item, index) => {
      let dateTime = item.event_time
        ? moment(item.event_time)
        : moment();
      const year = dateTime.year();
      const month = dateTime.month();
      const date = dateTime.date();
      const hours = dateTime.hours();
      const minutes = dateTime.minutes();
      const d = new Date(year, month, date, hours, minutes);
      const dt = new Date(d.getTime() + userTimezoneOffset);
      const growth = (item[type]*perc_growth)/100
      return {
        x: dt,
        y: +item[type] + growth,
      };
    });
    return result;
  };

  export const getDataPointsTopPoolGrowth = (data, type) => {
    let userDate = new Date();
    let userTimezoneOffset = userDate.getTimezoneOffset() * 60000;
    let result = [];
    let colors = ['#696661', "#EDCA93", "#695A42", "#B6B1A8"]
    let pools = Object.keys(data);
    if (pools.length) {
      pools.map((item, index) => {
        let PoolData = {}
        let dataSeries = [];
        let curPoolData = data[item];
        for (let i = 0; i < curPoolData.length; i++) {
          let dateTime = curPoolData[i].etime
            ? moment(curPoolData[i].etime)
            : moment();
          const year = dateTime.year();
          const month = dateTime.month();
          const date = dateTime.date();
          const hours = dateTime.hours();
          const minutes = dateTime.minutes();
          const d = new Date(year, month, date, hours, minutes);
          const dt = new Date(d.getTime() + userTimezoneOffset).valueOf();
          /*const cYear = dt.year();
          const cMonth = dt.month();
          const cDate = dt.date();
          const curDate = moment([cYear, cMonth, cDate]).valueOf();
          //const dt = new Date(cDate.getTime() + userTimezoneOffset);*/
          dataSeries.push({ x: dt, y: +curPoolData[i].faulting_rate });
        }
        PoolData.type = 'stackedColumn'
        PoolData.showInLegend = "true"
        PoolData.xValueType = "dateTime"
        PoolData.color = colors[index]
        PoolData.name = curPoolData[0]?.pool
        PoolData.dataPoints = dataSeries
        result.push(PoolData)
      })
    }
    let res = JSON.stringify(result);
    return JSON.parse(res);
  };
  /* @params 
  proposed_cores : proposed cores
  num_cores : total number of cores proposed system has
  cpw : total cpw rating 
  */ 
  export const getCPWPerCore = (proposed_cores, num_cores, cpw) => {
    const cpw_per_core = _.toInteger(cpw / num_cores);
    return cpw_per_core * proposed_cores;
  }

  export const getPercGrowthAP = (val, growth) => {
    const growth_val = growth > 0 ? parseFloat(val) + ((parseFloat(val) * growth ) / 100) : parseFloat(val);  
    return parseFloat(growth_val);
  }

  export const getPercGrowth = (val, cpw, growth) => {
    const growth_val = getPercGrowthAP(val, growth);
    const growth_perc = ((cpw - growth_val) / growth_val) * 100  
    return parseFloat(growth_perc).toFixed(1);
  }
  
  
  export const checkSystemStatusForCapacity = (data, pNum) => {
    if (+data.data[pNum]?.warning === 0 && +data.data[pNum]?.critical === 0) {
      return (
        <span style={{ color: "#fff", background: "#16aaff", fontWeight: "bold", padding: "0.4rem 0.6rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600" }}>INFO</span>
      )
    } else if (+data.data[pNum]?.avrg < +data.data[pNum]?.warning && +data.data[pNum]?.avrg < +data.data[pNum]?.critical) {
      return (
        <span style={{ color: "#fff", background: "#3ac47d", fontWeight: "bold", padding: "0.4rem 0.6rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600" }}>GOOD</span>
      )
    } else if (+data.data[pNum]?.avrg > +data.data[pNum]?.warning && +data.data[pNum]?.avrg < +data.data[pNum]?.critical) {
      return (
        <span style={{ color: "#fff", background: "#f7b924", fontWeight: "bold", padding: "0.4rem 0.6rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600" }}>WARNING</span>
      )
    } else if (+data.data[pNum]?.avrg > +data.data[pNum]?.critical) {
      return (
        <span style={{ color: "#fff", background: "#d92550", fontWeight: "bold", padding: "0.4rem 0.6rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600" }}>CRITICAL</span>
      )
    } else {
      return (
        <span style={{ color: "#fff", background: "#16aaff", fontWeight: "bold", padding: "0.4rem 0.6rem", borderRadius: "6px", fontSize: "0.75rem", fontWeight: "600" }}>INFO</span>
      )
    }
  };

  const checkCPWGrowthStatus = (growthValue, cpwValue)=>{
    if(+growthValue > 0){
      return <span style={{color: '#3ac47d' , fontSize:'14px', paddingLeft:0}}>{separateComma(growthValue)} % {cpwValue}</span>
    } else if(+growthValue < 0){
      return <span style={{color: '#d92550', fontSize:'14px', paddingLeft:0}}>{separateComma(growthValue)} % {cpwValue}</span>
    }
    else{
      return <span style={{color: '#16aaff', fontSize:'14px', paddingLeft:0}}>{separateComma(growthValue)} % {cpwValue}</span>
    }
  }

  export const renderFindings = (data, version, MAX_CPW_PROPOSED, PERC_GROWTH) => {
    let type = data?.data[version].dtype || "";
    let typeDescription = data?.data[version].dtypedesc || "";
    
    if(typeof data.data[version] === 'undefined' && type !=="TopPoolFaultingRate"){
      return 'No data found for selected period'
    }
  
    if(_.isEmpty(data?.data[version]) && type !=="TopPoolFaultingRate"){
      return 'No data found for selected period';
    }
   

    let avgValue = 0;
    let peakValue = 0;
    let diffValue = 0; 
    let maxCPW = 0;
    let growthAvg = 0;
    let growthPeak = 0;
    let growthAvgDyn = 0;
    let growthPeakDyn = 0;
    let baseAvg = data.data.length ? data.data[0].avrg === null ? 0 : parseFloat(data.data[0].avrg).toFixed(1) : 0;
    let basePeak = data.data.length ? data.data[0].peak === null ? 0 : parseFloat(data.data[0].peak).toFixed(1) : 0;
    let avgValDyn = 0;
    let peakValDyn = 0;
    
    if (version === 1 && data.data[1]) {
      avgValue = data.data.length ? data.data[1].avrg === null ? 0 : parseFloat(data.data[1].avrg)?.toFixed(1) : 0;
      peakValue = data.data.length ? data.data[1].peak === null ? 0 : parseFloat(data.data[1].peak).toFixed(1) : 0;
      diffValue = data.data.length ? data.data[1].diff === null ? 0 : parseFloat(data.data[1].diff).toFixed(1) : 0;
      maxCPW = data.data.length ? data.data[1].MaxPossibleCpw == null ? 0 : parseInt(data.data[1].MaxPossibleCpw) : 0;
      growthAvg = data.data.length ? data.data[1].potentialGrowthAvrg === null ? 0 : parseFloat(data.data[1].potentialGrowthAvrg).toFixed(1) : 0;
      growthPeak = data.data.length ? data.data[1].potentialGrowthPeak === null ? 0 : parseFloat(data.data[1].potentialGrowthPeak).toFixed(1) : 0;
      growthAvgDyn = getPercGrowth(baseAvg, MAX_CPW_PROPOSED, PERC_GROWTH);
      growthPeakDyn = getPercGrowth(basePeak, MAX_CPW_PROPOSED, PERC_GROWTH);
      avgValDyn = getPercGrowthAP(baseAvg, PERC_GROWTH);
      peakValDyn = getPercGrowthAP(basePeak, PERC_GROWTH);
    }
    else if (version === 0 && data.data[0]) {
      avgValue = data.data.length ? data.data[0].avrg === null ? 0 : parseFloat(data.data[0].avrg).toFixed(1) : 0;
      peakValue = data.data.length ? data.data[0].peak === null ? 0 : parseFloat(data.data[0].peak).toFixed(1) : 0;
      diffValue = data.data.length ? data.data[0].diff === null ? 0 : parseFloat(data.data[0].diff).toFixed(1) : 0;
      maxCPW = data.data.length ? data.data[0].MaxPossibleCpw == null ? 0 : parseInt(data.data[0].MaxPossibleCpw) : 0;
      growthAvg = data.data.length ? data.data[0].potentialGrowthAvrg === null ? 0 : parseFloat(data.data[0].potentialGrowthAvrg).toFixed(1) : 0;
      growthPeak = data.data.length ? data.data[0].potentialGrowthPeak === null ? 0 : parseFloat(data.data[0].potentialGrowthPeak).toFixed(1) : 0;
    }
    
    

    let avgPercentageSymbol = "%";
    let peakPercentageSymbol = "%";
    let diffPercentageSymbol = "%";
    let isDecimal =
      type === "cpums" || type === "total_transactions" || type=== "cpw" ? false : true;
  
    switch (type) {
      case "disk_response_time":
      case "cpu_ms":
        avgPercentageSymbol = peakPercentageSymbol = " ms";
        diffPercentageSymbol = " % ";
        break;
      case "cpw":
      case "no_of_cores":
        avgPercentageSymbol = peakPercentageSymbol = "";
        diffPercentageSymbol = "";
        break;
      case "total_transactions":
        avgPercentageSymbol = peakPercentageSymbol = "";
        diffPercentageSymbol = "%";
        break;
      case "total_disk_ops":
        avgPercentageSymbol = peakPercentageSymbol = " ops / sec ";
        diffPercentageSymbol = " % ";
        break;
      case "ethernet_line_utilization":
        avgPercentageSymbol = peakPercentageSymbol = "%"; //ops / sec
        diffPercentageSymbol = "%";
        break;
      case "TotalFaultingRate":
      case "faulting_rate": // FaultingRate
      case "machine_pool_faulting":
      case "memory_size_faulting":
        avgPercentageSymbol = peakPercentageSymbol = " faults / sec";
        diffPercentageSymbol = "%";
        break;
      case "response_time_5250":
        avgPercentageSymbol = peakPercentageSymbol = " seconds";
        diffPercentageSymbol = "%";
        break;
      default:
        break;
    }
  
    let average = isDecimal 
      ? avgValue === 0 
      ? avgValue : avgValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
      : Math.floor(avgValue)?.toLocaleString();
  
    let peak = isDecimal
      ? peakValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : Math.floor(peakValue)?.toLocaleString();
  
    let difference = isDecimal
      ? diffValue?.toLocaleString()
      : Math.floor(diffValue)?.toLocaleString();
  
    avgValDyn = isDecimal 
      ? avgValDyn === 0 
      ? avgValDyn : avgValDyn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
      : Math.floor(avgValDyn)?.toLocaleString();
  
    peakValDyn = isDecimal
      ? peakValDyn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : Math.floor(peakValDyn)?.toLocaleString();
    
    if (type === "memoryvsfaulting") { // memoryvsfaulting
      typeDescription = "Faulting";
    }
    let peakNum = parseInt(peak);
    if (data.data.length === 0) {
      return (<div>No data found for selected period</div>)
    } else {
      return (
        <div className="findings_col">
          <div className={checkSystemStatusPVsPRenderType(data, version)}>
              Average {typeDescription} : {
                (version === 1 && avgValue !== avgValDyn)
                ? avgValDyn 
                : average }
            {avgPercentageSymbol}
          </div>
          <div className={checkSystemStatusPVsPRenderType(data, version)}>
            Peak {typeDescription} : { (version === 1 && peakValue !== peakValDyn )
              ? peakValDyn 
              : peak }
            {peakPercentageSymbol}
            <span style={{ filter: "brightness(85%)" }}>({moment(data?.data[version]?.event_time).format("MMMM Do YYYY, h:mm a")})</span>
          </div>
          <div className={checkSystemStatusPVsPRenderType(data, version)}>
            Max possible CPW : {(version === 1 && maxCPW !== MAX_CPW_PROPOSED)
             ? separateComma(MAX_CPW_PROPOSED) 
             : separateComma(maxCPW) }
          </div>
          <div className={checkSystemStatusPVsPRenderType(data, version)}>
            Potential for Growth <br />
              <span style={{ filter: "brightness(85%)", fontSize:'14px'}}>
                {(version === 1 && growthAvg !== growthAvgDyn ) 
                ?  checkCPWGrowthStatus(growthAvgDyn, " (Avg CPW)")
                : checkCPWGrowthStatus(growthAvg, " (Avg CPW)") } 
              </span> <br />
              <span style={{ filter: "brightness(85%)", fontSize:'14px'}}>
                {(version === 1 && growthPeak !== growthPeakDyn ) 
                ? checkCPWGrowthStatus(growthPeakDyn, " (Peak CPW)") 
                : checkCPWGrowthStatus(growthPeak, " (Peak CPW)") }
              </span>
          </div>
        </div>
      );
    }
  };

  export const checkSystemStatusPVsPRenderType = (data, indexType) => {
    let status = "";
    if (+data.data[indexType]?.warning === 0 && +data.data[indexType]?.critical === 0) {
      status = "Info";
    } else if (+data.data[indexType]?.avrg < +data.data[indexType]?.warning && +data.data[indexType]?.avrg < +data.data[indexType]?.critical) {
      status = "Good";
    } else if (+data.data[indexType]?.avrg > +data.data[indexType]?.warning && +data.data[indexType]?.avrg < +data.data[indexType]?.critical) {
      status = "Warning";
    } else if (+data.data[indexType]?.avrg > +data.data[indexType]?.critical) {
      status = "Critical";
    } else {
      status = "Info";
    }
    return status;
  };

  export const getChartTypeObject = (originaldata, chartType, chartName, perc_growth) => {
    let chartData;
    switch (chartName) {
      case "cpuUtilization":
        const data_cpu_utilization_sys = getDataPointsGrowth(originaldata, "syscpu");
        const data_cpu_utilization_int = getDataPointsGrowth(originaldata, "intcpu");
        const data_cpu_utilization_batch = getDataPointsGrowth(originaldata, "batchcpu");
        const data_cpu_utilization_4 = getDataPointsGrowth(originaldata, "totalcpu");
    
        chartData = [
          {
            ...CPU_UTILIZATION_SYS,
            type: chartType,
            dataPoints: data_cpu_utilization_sys,
          },
          {
            ...CPU_UTILIZATION_INT,
            type: chartType,
            dataPoints: data_cpu_utilization_int,
          },
          {
            ...CPU_UTILIZATION_BATCH,
            type: chartType,
            dataPoints: data_cpu_utilization_batch,
          },
        ];
        break;
      case "cpuUtilizationTrends":
        const data_cpu_utilization_trends_sys = getDataPointsGrowth(
          originaldata,
          "syscpu"
        );
        const data_cpu_utilization_trends_int = getDataPointsGrowth(
          originaldata,
          "intcpu"
        );
        const data_cpu_utilization_trends_batch = getDataPointsGrowth(
          originaldata,
          "batchcpu"
        );
        chartData = [
          {
            ...CPU_UTILIZATION_SYS,
            type: chartType,
            dataPoints: data_cpu_utilization_trends_sys
          },
          {
            ...CPU_UTILIZATION_INT,
            type: chartType,
            dataPoints: data_cpu_utilization_trends_int
          },
          {
            ...CPU_UTILIZATION_BATCH,
            type: chartType,
            dataPoints: data_cpu_utilization_trends_batch
          },
        ];
        break;
      case "noOfCores":
        const datanoOfCores = getDataPointsGrowth(originaldata, "totalcores");
        chartData = [
          {
            ...NO_OF_CORES,
            type: chartType,
            dataPoints: datanoOfCores,
            name: "Number of Cores",
          },
        ];
        break;
      case "noOfCoresTrends":
        const datanoOfCoresTrends = getDataPointsGrowth(originaldata, "totalcores");
        chartData = [
          {
            ...NO_OF_CORES_TRENDS,
            type: chartType,
            dataPoints: datanoOfCoresTrends,
            name: "Number of Cores",
          },
        ];
        break;
        case "cpwUtilization":
        const data_cpw_utilization_int = getDataPointsGrowth(originaldata, "interactivecpw", perc_growth);
        const data_cpw_utilization_batch = getDataPointsGrowth(originaldata, "batchcpw", perc_growth);
        const data_cpw_utilization_total = getDataPointsGrowth(originaldata, "totalcpw", perc_growth);
  
        chartData = [
          {
            ...CPW_UTILIZATION_INT,
            type: chartType,
            dataPoints: data_cpw_utilization_int,
            color: "rgb(0, 0, 102, .6)",
          },{ 
            ...CPW_UTILIZATION_BATCH,
            type: chartType,
            dataPoints: data_cpw_utilization_batch,
            color: "rgba(255, 220, 111, .6)",
          },
          { 
            ...CPW_UTILIZATION_TOTAL,
            type: chartType,
            dataPoints: data_cpw_utilization_total,
            color: "rgba(108, 47, 13, .4)",
          }
        ];
        break;
        case "cpwUtilizationTrends":
        const data_cpw_trends_int = getDataPointsGrowth(originaldata, "interactivecpw", perc_growth);
        const data_cpw_trends_batch = getDataPointsGrowth(originaldata, "batchcpw", perc_growth);
  
        chartData = [
          {
            ...CPW_UTILIZATION_BATCH,
            type: chartType,
            dataPoints: data_cpw_trends_batch,
          },
          {
            ...CPW_UTILIZATION_INT,
            type: chartType,
            dataPoints: data_cpw_trends_int,
          }          
        ];
        break;
      case "diskSpaceUtilization":
        const datadiskSpaceUtilization = getDataPointsGrowth(
          originaldata,
          "totalutilization"
        );
        chartData = [
          {
            ...DISK_SPACE_UTILIZATION,
            type: chartType,
            dataPoints: datadiskSpaceUtilization,
            color: "#29a329",
            name: "Utilization",
          },
        ];
        break;
      case "diskSpaceUtilizationTrends":
        const diskSpaceUtilizationTrends = getDataPointsGrowth(
          originaldata,
          "totalutilization"
        );
        chartData = [
          {
            ...DISK_SPACE_TRENDS,
            type: chartType,
            dataPoints: diskSpaceUtilizationTrends,
            color: "#29a329",
            name: "Utilization",
          },
        ];
        break;
      case "diskArmUtilization":
        const datadiskArmUtilization = getDataPointsGrowth(
          originaldata,
          "disk_arm_utilization"
        );
        chartData = [
          {
            ...DISK_ARM_UTILIZATION,
            type: chartType,
            dataPoints: datadiskArmUtilization,
            name: "Utilization",
          },
        ];
        break;
      case "diskArmTrends":
        const diskArmTrends = getDataPointsGrowth(originaldata, "disk_arm_utilization");
        chartData = [
          {
            ...DISK_ARM_TRENDS,
            type: chartType,
            dataPoints: diskArmTrends,
            name: "Utilization",
          },
        ];
        break;
      case "CPUMsUtilization":
        const dataCPUMsUtilization = getDataPointsGrowth(originaldata, "totalcpums");
        chartData = [
          {
            ...CPU_MS,
            type: chartType,
            dataPoints: dataCPUMsUtilization,
          },
        ];
        break;
      case "CPUMsTrends":
        const CPUMsTrends = getDataPointsGrowth(originaldata, "totalcpums");
        chartData = [
          {
            ...CPU_MS_TRENDS,
            type: chartType,
            dataPoints: CPUMsTrends,
          },
        ];
        break;
      case "readWriteRatio":
        const data_read = getDataPointsGrowth(originaldata, "read_write_ratio");
        chartData = [
          {
            ...READS,
            color: "#14e8f5",
            type: chartType,
            dataPoints: data_read,
          },
        ];
        break;
      case "readWriteRatioTrends":
        const data_read_treds = getDataPointsGrowth(originaldata, "read_write_ratio");
        chartData = [
          {
            ...READS,
            color: "#14e8f5",
            type: chartType,
            dataPoints: data_read_treds,
          },
        ];
        break;
        
      case "diskOperations":
        const data_disk_reads = getDataPointsGrowth(originaldata, "reads_per_sec");
        const data_disk_writes = getDataPointsGrowth(originaldata, "writes_per_sec");
        chartData = [
          {
            ...DISK_OPERATIONS,
            type: chartType,
            dataPoints: data_disk_reads,
            color: "#3399ff",
            name: "Reads ",
          },
          {
            ...DISK_OPERATIONS,
            type: chartType,
            dataPoints: data_disk_writes,
            color: "#001933",
            name: "Writes ",
          },
        ];
        break;
      case "diskOperationsTrends":
        const data_disk_reads_trends = getDataPointsGrowth(
          originaldata,
          "reads_per_sec"
        );
        const data_disk_writes_trends = getDataPointsGrowth(
          originaldata,
          "writes_per_sec"
        );
        chartData = [
          {
            ...DISK_OPERATIONS_TRENDS,
            type: chartType,
            dataPoints: data_disk_reads_trends,
            color: "#3399ff",
            name: "Reads ",
          },
          {
            ...DISK_OPERATIONS_TRENDS,
            type: chartType,
            dataPoints: data_disk_writes_trends,
            color: "#001933",
            name: "Writes ",
          },
        ];
        break;
      case "diskResponse":
        const data_disk_response_service = getDataPointsGrowth(originaldata, "service_time");
        const data_disk_response_wait = getDataPointsGrowth(originaldata, "wait_time");
        //const data_disk_response = getDataPointsGrowth(originaldata, "disk_response_time");
  
        chartData = [
          {
            ...DISK_RESPONSE,
            type: chartType,
            dataPoints: data_disk_response_service,
            color: "#c0c0c0",
            name: "Service",
          },
          {
            ...DISK_RESPONSE,
            type: chartType,
            dataPoints: data_disk_response_wait,
            color: "#b87333",
            name: "Wait",
          },
        ];
        break;
      case "diskResponseTrends":
        const data_disk_response_Service_trends = getDataPointsGrowth(
          originaldata,
          "service_time"
        );
        const data_disk_response_wait_trends = getDataPointsGrowth(
          originaldata,
          "wait_time"
        );
        chartData = [
          {
            ...DISK_RESPONSE_TRENDS,
            type: chartType,
            dataPoints: data_disk_response_Service_trends,
            color: "#c0c0c0",
            name: "Service",
          },
          {
            ...DISK_RESPONSE_TRENDS,
            type: chartType,
            dataPoints: data_disk_response_wait_trends,
            color: "#b87333",
            name: "Wait",
          },
        ];
        break;
      case "machinePoolFaulting":
        const data_machine_Pool_Faulting = getDataPointsGrowth(
          originaldata,
          "machine_pool_faults"
        );
        chartData = [
          {
            ...MACHINE_POOL,
            type: chartType,
            dataPoints: data_machine_Pool_Faulting,
            color: "#ff8c02",
            name: "Faults / Sec",
          },
        ];
        break;
      case "machinePoolFaultingTrends":
        const data_machine_Pool_Faulting_trends = getDataPointsGrowth(
          originaldata,
          "machine_pool_faults"
        );
        chartData = [
          {
            ...MACHINE_POOL_TRENDS,
            type: chartType,
            dataPoints: data_machine_Pool_Faulting_trends,
            color: "#ff8c02",
            name: "Faults / Sec",
          },
        ];
        break;
      /* TO BE FIXED LATER
      case "totalFaultingRate":
        const data_total_Faulting_Rate = getDataPointsGrowth(
          originaldata,
          "total_faulting_rate"
        );
        chartData = [
          {
            ...TOTAL_FAULTING,
            type: chartType,
            dataPoints: data_total_Faulting_Rate,
            color: "#1b76d2",
            name: "Faults / Sec",
          },
        ];
        break;
      case "totalFaultingRateTrends":
        const data_total_Faulting_Rate_trends = getDataPointsGrowth(
          originaldata,
          "total_faulting_rate"
        );
        chartData = [
          {
            ...TOTAL_FAULTING_TRENDS,
            type: chartType,
            dataPoints: data_total_Faulting_Rate_trends,
            color: "#1b76d2",
            name: "Faults / Sec",
          },
        ];
        break;
  
      case "topPoolFaultingRate":
        //debugger;
        const data_top_Pool_Faulting_Rate_Pool = getDataPointsTopPoolGrowth(
          originaldata,
          "faulting_rate"
        );
        chartData = data_top_Pool_Faulting_Rate_Pool;
        break;
      case "topPoolFaultingRateTrends":
        const data_top_Pool_Faulting_Rate_trends = getDataPointsTopPoolGrowth(
          originaldata,
          "faulting_rate" //  topfaults
        );
        chartData = data_top_Pool_Faulting_Rate_trends;
        break;
      case "memorySizeVsFaulting":
        const data_Faulting = getDataPointsForMemVsFaultGrowth(originaldata, "faulting_rate");
        const data_memory_size = getDataPointsForMemVsFaultGrowth(originaldata, "memory_size");
        chartData = [
          {
            ...MEMORY_VS_FAULTING,
            type: chartType,
            dataPoints: data_Faulting,
            color: "#b81f0a",
            name: "Fault / Sec",
          },
          {
            ...DISK_OPERATIONS,
  
            type: "stackedArea",
            //name: "Profit",
            markerBorderColor: "white",
            markerBorderThickness: 2,
            showInLegend: true,
            yValueFormatString: "$#,##0",
            dataPoints: data_memory_size,
            //markerSize: 1,
            //color: "#1EB294",
            name: "Total Memory Size (GB)",
          },
        ];
        break;
      case "memorySizeVsFaultingTrends":
        const data_Faulting_trends = getDataPointsGrowth(originaldata, "faulting_rate");
        const data_memory_size_trends = getDataPointsGrowth(
          originaldata,
          "memory_size"
        );
        chartData = [
          {
            ...FAULTING_TRENDS,
            type: chartType, //stepLine
            color: "#b81f0a",
  
            dataPoints: data_Faulting_trends,
            name: "Fault / Sec",
          },
          {
            ...MEMORY_TRENDS,
            type: "stackea",
            //name: "Profit",
            markerBorderColor: "white",
            markerBorderThickness: 2,
            showInLegend: true,
            yValueFormatString: "$#,##0",
            dataPoints: data_memory_size_trends,
            //markerSize: 1,
            //color: "#1EB294",
            name: "Total Memory Size (GB)",
          },
        ];
        break;
      case "specificPoolFaultingTrends":
        const specific_Pool_Faulting_Rate_trends = getDataPointsGrowth(
          originaldata,
          "faulting_rate"
        );
        chartData = [
          {
            ...SPECIFIC_POOL_FAULTING_TRENDS,
            type: chartType,
            dataPoints: specific_Pool_Faulting_Rate_trends,
            color: "#7D3C98", // previous => 388e3c
            name: "Faults / Sec",
          },
        ];
        break;
      case "responseTime5250":
        const data_response_Time_5250 = getDataPointsGrowth(
          originaldata,
          "response_time_5250"
        );
        chartData = [
          {
            ...RESPONSE_TIME_5250,
            type: chartType,
            dataPoints: data_response_Time_5250,
            color: "#EE82EE",
            name: "Seconds",
          },
        ];
        break;
      case "responseTime5250Trends":
        const data_response_Time_5250_trends = getDataPointsGrowth(
          originaldata,
          "response_time_5250"
        );
        chartData = [
          {
            ...RESPONSE_TIME_5250_TRENDS,
            type: chartType,
            dataPoints: data_response_Time_5250_trends,
            color: "#EE82EE",
            name: "Seconds",
          },
        ];
        break;
      case "totalTransactions":
        const data_total_Transactions = getDataPointsGrowth(
          originaldata,
          "total_transactions"
        );
        chartData = [
          {
            ...TOTAL_TRANSACTIONS,
            type: chartType,
            dataPoints: data_total_Transactions,
            color: "#cc9900",
            name: "Transactions",
          },
        ];
        break;
      case "totalTransactionsTrends":
        const data_total_Transactions_trends = getDataPointsGrowth(
          originaldata,
          "total_transactions"
        );
        chartData = [
          {
            ...TOTAL_TRANSACTIONS_TRENDS,
            type: chartType,
            dataPoints: data_total_Transactions_trends,
            color: "#cc9900",
            name: "Transactions",
          },
        ];
        break;
  
      case "cacheHitPercentage":
        const data_device_cache_read = getDataPointsGrowth(
          originaldata,
          "device_cache_read"
        );
        const data_controller_cache_read = getDataPointsGrowth(
          originaldata,
          "controller_cache_read"
        );
        const data_controller_cache_write = getDataPointsGrowth(
          originaldata,
          "controller_cache_write"
        );
        chartData = [
          {
            ...CACHE_HIT,
            type: chartType,
            dataPoints: data_device_cache_read,
            color: "#f7ac08",
            name: "Device Cache Read %",
          },
          {
            ...CACHE_HIT,
            type: chartType,
            dataPoints: data_controller_cache_read,
            color: "#199d2c",
            name: "Controller Cache Read %",
          },
          {
            ...CACHE_HIT,
            type: chartType,
            dataPoints: data_controller_cache_write,
            color: "#e3f606",
            name: "Controller Cache Write %",
          },
        ];
        break;
      case "cacheHitPercentageTrends":
        const data_device_cache_read_trends = getDataPointsGrowth(
          originaldata,
          "device_cache_read"
        );
        const data_controller_cache_read_trends = getDataPointsGrowth(
          originaldata,
          "controller_cache_read"
        );
        const data_controller_cache_write_trends = getDataPointsGrowth(
          originaldata,
          "controller_cache_write"
        );
        chartData = [
          {
            ...CACHE_HIT_TRENDS,
            type: chartType,
            dataPoints: data_device_cache_read_trends,
            color: "#f7ac08",
            name: "Device Cache Read %",
          },
          {
            ...CACHE_HIT_TRENDS,
            type: chartType,
            dataPoints: data_controller_cache_read_trends,
            name: "Controller Cache Read %",
            color: "#199d2c",
          },
          {
            ...CACHE_HIT_TRENDS,
            type: chartType,
            dataPoints: data_controller_cache_write_trends,
            color: "#e3f606",
            name: "Controller Cache Write %",
          },
        ];
        break;
  
      case "ethernetLineUtilization":
        const data_ethernet_line_utilization = getDataPointsGrowth(
          originaldata,
          "total_utilization" // ethernet_line_utilization
        );
        chartData = [
          {
            ...ETHERNET_LINE,
            type: chartType,
            dataPoints: data_ethernet_line_utilization,
            color: "#034C17", // prev => cc9900
            name: "Ethernet Line",
          },
        ];
        break;
      case "ethernetLineUtilizationTrends":
        const data_ethernet_line_utilization_trends = getDataPointsGrowth(
          originaldata,
          "total_utilization" //ethernet_line_utilization
        );
        chartData = [
          {
            ...ETHERNET_LINE_TRENDS,
            type: chartType,
            dataPoints: data_ethernet_line_utilization_trends,
            color: "#034C17", // prev => cc9900
            name: "Ethernet Line",
          },
        ];
        break;
        */
      default:
        break;
    }
    return chartData;
  };
  export const createChartDataMapping = (originaldata, chartType, chartName, perc_growth) => {
    return getChartTypeObject(originaldata, chartType, chartName, perc_growth);
  };
  