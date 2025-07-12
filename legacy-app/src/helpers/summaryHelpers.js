import _ from "lodash";
import useChartList from "../hooks/useChartList";

const moment = require("moment");

const checkSystemStatus = (data) => {
  let status = "";
  if (+data.warning === 0 && +data.critical === 0) {
    status = "Info";
  } else if (
    +data.data[0].avrg < +data.warning &&
    +data.data[0].avrg < +data.critical
  ) {
    status = "Good";
  } else if (
    +data.data[0].avrg > +data.warning &&
    +data.data[0].avrg < +data.critical
  ) {
    status = "Warning";
  } else if (+data.data[0].avrg > +data.critical) {
    status = "Critical";
  }
  return status;
};

const checkPeakSystemStatus = (data) => {
  let status = "";
  if (+data.warning === 0 && +data.critical === 0) {
    status = "Info";
  } else if (
    +data.data[0].peak < +data.warning &&
    +data.data[0].peak < +data.critical
  ) {
    status = "Good";
  } else if (
    +data.data[0].peak > +data.warning &&
    +data.data[0].peak < +data.critical
  ) {
    status = "Warning";
  } else if (+data.data[0].peak > +data.critical) {
    status = "Critical";
  }
  return status;
};

const checkGrowthStatus = (data) => {
  let status = "Info";
  if (+data.warning_change_growth === 0 && +data.critical_change_growth === 0) {
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

const checkTrendGrowthStatus = (trendData, data) => {
  let status = "Info";
  if (
    +data?.warning_change_growth === 0 &&
    +data?.critical_change_growth === 0
  ) {
    status = "Info";
  } else if (+trendData?.coalesce < +data?.warning_change_growth) {
    status = "Black";
  } else if (+trendData?.coalesce > +data?.critical_change_growth) {
    status = "Critical";
  } else if (
    +trendData?.coalesce < +data?.critical_change_growth &&
    +trendData?.coalesce > +data?.warning_change_growth
  ) {
    status = "Warning";
  }
  return status;
};

const renderFindings = (data, pd = false, trendData, globalConfigData) => {
  let type = data.dtype || "";
  let typeDescription = data.dtypedesc || "";
  let trendType = trendData?.data?.data?.find(
    (ele) => ele.dtype === data.dtype
  );
  let trendType2 = trendData?.data?.data?.filter(
    (ele) => ele.dtype === "cache_hit_perc"
  );

  let status = "Info";
  if (type === "TopPoolFaultingRate") {
    // let skey = Object.keys(data.data);
    // const poolList = data.data[skey[0]] || [];
    const poolList = data.data || [];
    if (poolList.length !== 0) {
      const dataDom = poolList.map((item, idx) => (
        <div className="findings_col">
          <div className="Info">
            The following pool was analyzed for : {item.pool}
          </div>
          <div className="Info">
            The average faulting rate was {item.faulting_rate} fault/sec
          </div>
          <br></br>
        </div>
      ));
      return dataDom;
    } else {
      return (
        <div className="findings_col">
          <div className="Info">No data found for selected period.</div>
        </div>
      );
    }
  }
  if (type === "pool_faulting_rate") {
    const poolList = data.data || [];
    if (poolList.length !== 0) {
      const dataDom = poolList.map((item, idx) => (
        <div className="findings_col">
          <div className="Info">
            The following pool was analyzed for : {item.pool}
          </div>
          <div className={checkSystemStatus(data)}>
            The average faulting rate was{" "}
            {parseFloat(item.avrg)
              .toFixed(1)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            <span className="table_wrapper_symbol">fault/sec</span>
          </div>
          <div className={checkPeakSystemStatus(data)}>
            The peak faulting rate was{" "}
            {parseFloat(item.peak)
              .toFixed(1)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            <span className="table_wrapper_symbol">fault/sec</span>
          </div>
          <div className={checkGrowthStatus(data)}>
            For the period analyzed, the average Memory increased{" "}
            {parseFloat(item.diff)
              .toFixed(1)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {" %"}
            {/* For the historical period analyzed, the minimum {item.pool} faulting rate is {item.min} and the maximum {item.pool} faulting rate is {item.max}.
              <br/>
              (Difference is {item.diff === null ? "0.0" : item.diff}{" %"}) */}
          </div>
          <br />
        </div>
      ));
      return dataDom;
    } else {
      return (
        <div className="findings_col">
          <div className="Info">No data found for selected period.</div>
        </div>
      );
    }
  }
  if (type === "cache_hit_perc") {
    const dataList = data.data || [];
    if (dataList.length !== 0) {
      const dataDom = dataList.map((item, idx) => (
        <div className="findings_col">
          <div className="Info">
            <span className="table_wrapper_label">{item.dtypedesc}</span>
          </div>
          <div className={checkSystemStatus(data)}>
            The average was{" "}
            {item.avrg === null
              ? "0.0"
              : parseFloat(item.avrg)
                  .toFixed(1)
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            <span className="table_wrapper_symbol">%</span>
          </div>
          <div className={checkPeakSystemStatus(data)}>
            The peak was{" "}
            {parseFloat(item.peak)
              .toFixed(1)
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            <span className="table_wrapper_symbol">%</span>
            <span className="table_wrapper_date">
              ({moment(item.event_time).format("MMMM Do YYYY, h:mm a")})
            </span>
          </div>
          {/* {(pd === false) && */}
          <div className={checkGrowthStatus(data)}>
            {/* For the historical period analyzed, the average increased{" "}
                {item.diff === null ? "0.0" : item.diff}{" %"} */}
            For the period analyzed, the minimum {item.dtypedesc} is{" "}
            {item.max
              ? parseFloat(item.min)
                  .toFixed(1)
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "0.0"}{" "}
            and the maximum {item.dtypedesc} is{" "}
            {item.max
              ? parseFloat(item.max)
                  .toFixed(1)
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "0.0"}
            .
            <br />
            (Percentage of change is{" "}
            {item.diff === null
              ? "0"
              : parseFloat(item.diff)
                  .toFixed(1)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {" %"})
          </div>
          {/* } */}

          {trendData?.loading && <p>Performing trend calculation...</p>}

          {!trendData?.loading && trendType2 && trendType2.length && (
            <>
              {+trendType2[idx].coalesce === 0 && (
                <div div className="Black">
                  Based on the current trend, there is no change in{" "}
                  {trendType2[idx].dtypedesc}
                </div>
              )}
              {+trendType2[idx].coalesce > 0 && (
                <div className={checkTrendGrowthStatus(trendType, data)}>
                  Based on the current trend, {trendType2[idx].dtypedesc}{" "}
                  increased by{" "}
                  {trendType2[idx].coalesce
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  <span className="table_wrapper_symbol">%</span>
                </div>
              )}
              {+trendType2[idx].coalesce < 0 && (
                <div className={checkTrendGrowthStatus(trendType, data)}>
                  Based on the current trend, {trendType2[idx].dtypedesc}{" "}
                  decreased by{" "}
                  {Math.abs(
                    trendType2[idx].coalesce
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  )}
                  <span className="table_wrapper_symbol">%</span>
                </div>
              )}
            </>
          )}
          <br />
        </div>
      ));
      return dataDom;
    } else {
      return (
        <div className="findings_col">
          <div className="Info">No data found for selected period.</div>
        </div>
      );
    }
  }

  let avgValue = data.data.length
    ? parseFloat(data.data[0].avrg).toFixed(2)
    : 0;
  let peakValue = data.data.length
    ? parseFloat(data.data[0].peak).toFixed(2)
    : 0;
  let diffValue = data.data.length
    ? parseFloat(data.data[0].diff).toFixed(2)
    : 0;
  let minValue = data.data.length ? parseFloat(data.data[0].min).toFixed(2) : 0;
  let maxValue = data.data.length ? parseFloat(data.data[0].max).toFixed(2) : 0;
  let avgPercentageSymBol = "%";
  let peakPercentageSymBol = "%";
  let diffPercentageSymBol = "%";
  let isDecimal =
    type === "cpums" || type === "total_transactions" ? false : true;

  switch (type) {
    case "disk_response_time":
    case "cpu_ms":
      avgPercentageSymBol = peakPercentageSymBol = " ms";
      diffPercentageSymBol = " %";
      break;
    case "no_of_cores":
    case "cpw":
      avgPercentageSymBol = peakPercentageSymBol = "";
      diffPercentageSymBol = " %";
      break;
    case "total_transactions":
      avgPercentageSymBol = peakPercentageSymBol = "";
      diffPercentageSymBol = "%";
      break;
    case "total_disk_ops":
      avgPercentageSymBol = peakPercentageSymBol = " ops / sec ";
      diffPercentageSymBol = " %";
      break;
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

  let average = isDecimal
    ? avgValue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : Math.floor(avgValue)?.toLocaleString();

  let peak = isDecimal
    ? peakValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : Math.floor(peakValue)?.toLocaleString();
  // let peak = Math.floor(peakValue)?.toLocaleString();

  let difference = isDecimal
    ? diffValue?.toLocaleString()
    : Math.floor(diffValue)?.toLocaleString();

  if (type === "memoryvsfaulting") {
    // memoryvsfaulting
    typeDescription = "Faulting";
  }
  let peakNum = parseInt(peak);

  if (data.data.length === 0 && pd === false) {
    return <div>No data found for selected period</div>;
  }
  // else if(data.data.length !== 0 && pd === true && +data.warning === 0 && +data.critical === 0){
  //   return (<div>No issue found for selected period</div>)
  // }
  else if (data.data.length === 0 && pd === true) {
    return (
      <div className="findings_col">
        <div className="Info">No data found for selected period.</div>
      </div>
    );
  } else {
    return (
      <div className="findings_col">
        <div className={checkSystemStatus(data)}>
          The average {typeDescription} was {average}
          <span className="table_wrapper_symbol">{avgPercentageSymBol}</span>
        </div>
        {pd === false && (
          <div className={checkPeakSystemStatus(data)}>
            The peak {typeDescription} was {peak}
            <span className="table_wrapper_symbol">{peakPercentageSymBol}</span>
            <span className="table_wrapper_date">
              ({moment(data.data[0].event_time).format("MMMM Do YYYY, h:mm a")})
            </span>
          </div>
        )}
        {pd === true && (
          <div className={checkPeakSystemStatus(data)}>
            The peak {typeDescription} was{" "}
            {peak.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            <span className="table_wrapper_symbol">{peakPercentageSymBol}</span>
          </div>
        )}
        {
          // (pd === false) &&
          globalConfigData?.data[1]?.config_value === "true" && (
            <div className={checkGrowthStatus(data)}>
              {/* For the historical period analyzed, the average {typeDescription}{" "}
              increased {difference}{" "} */}
              For the period analyzed, the minimum {typeDescription} is{" "}
              {minValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} and
              the maximum {typeDescription} is{" "}
              {maxValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.
              <br />
              (Percentage of change is{" "}
              {difference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <span className="table_wrapper_symbol">
                {diffPercentageSymBol}
              </span>
              )
            </div>
          )
        }
        {trendData.loading && <p>Performing trend calculation...</p>}
        {!trendData?.loading && trendType && !_.isEmpty(trendType) && (
          <>
            {+trendType.coalesce === 0 && (
              <div className="Black">
                Based on the current trend, there is no change in{" "}
                {trendType.dtypedesc}
              </div>
            )}
            {+trendType.coalesce > 0 && (
              <div className={checkTrendGrowthStatus(trendType, data)}>
                Based on the current trend, {trendType.dtypedesc} increased by{" "}
                {trendType.coalesce
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                <span className="table_wrapper_symbol">
                  {diffPercentageSymBol}
                </span>
              </div>
            )}
            {+trendType.coalesce < 0 && (
              <div className={checkTrendGrowthStatus(trendType, data)}>
                Based on the current trend, {trendType.dtypedesc} decreased by{" "}
                {Math.abs(
                  trendType.coalesce
                    ?.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                )}
                <span className="table_wrapper_symbol">
                  {diffPercentageSymBol}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
};

const getPdMemoryStatus = (data) => {
  let status = "";
  if (+data.warning === 0 && +data.critical === 0) {
    status = "Info";
  } else if (
    +data.faulting_rate < +data.warning &&
    +data.faulting_rate < +data.critical
  ) {
    status = "Good";
  } else if (
    +data.faulting_rate > +data.warning &&
    +data.faulting_rate < +data.critical
  ) {
    status = "Warning";
  } else if (+data.faulting_rate > +data.critical) {
    status = "Critical";
  }
  return status;
};
const renderCommonPdMemory = (data, value) => {
  if (value) {
    return (
      <div className="findings_col">
        <div
          className={"Info"}
          style={{ textAlign: "center" }}
        >
          {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </div>
      </div>
    );
  } else {
    return <div>No data</div>;
  }
};

const renderStatus = (data, value) => {
  let status = "Info";
  // if (+data.warning === 0 && +data.critical === 0) {
  //   status = "Info";
  // } else if (
  //   +data.data[0].avrg < +data.warning &&
  //   +data.data[0].avrg < +data.critical
  // ) {
  //   status = "Good";
  // } else if (
  //   +data.data[0].avrg > +data.warning &&
  //   +data.data[0].avrg < +data.critical
  // ) {
  //   status = "Warning";
  // } else if (+data.data[0].avrg > +data.critical) {
  //   status = "Critical";
  // }
  return status;
};

export {
  checkSystemStatus,
  checkGrowthStatus,
  renderFindings,
  renderCommonPdMemory,
  getPdMemoryStatus,
  renderStatus,
};
