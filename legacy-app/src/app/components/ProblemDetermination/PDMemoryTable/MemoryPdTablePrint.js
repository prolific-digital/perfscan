import React, { useEffect } from "react";
import { fetchAsyncPdMemoryTableSlice, getPdCommonMemoryTableData } from "../../../../store/problemDetermination/pdCommonMemoryTableSlice";
import { useDispatch, useSelector } from "react-redux";
import * as _ from 'lodash';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { renderCommonPdMemory, getPdMemoryStatus } from "../../../../helpers/summaryHelpers";
import ReportHeaderProblemDetermination from "./ReportHeaderProblemDetermination";
import GridLoader from "react-spinners/GridLoader";
import usePDQueryData from "../QueryDates/usePDQueryData";
import moment from "moment";
import { getParametersFromLocalStorage } from "../../../../helpers/commonHelper";

const MemoryPdTablePrint = ({runReportStateValue}) => {
  const dispatch = useDispatch();
  const getSysId = useSelector(state => state.filters.system_filter?.id);
  let qd = usePDQueryData();
  const userId = getParametersFromLocalStorage("userID");
  const pdMemoryData = useSelector(getPdCommonMemoryTableData);
  if (runReportStateValue === false) {
    qd = {
      sdate: moment(new Date()).format(),
      edate: moment(new Date()).format(),
      stime: moment(new Date()).subtract(15, 'minutes').format('h:mm:ss'),
      etime: moment(new Date()).format('h:mm:ss'),
      sysid: getSysId,
      pd: true,
      userId: userId
    }
  }

  useEffect(() => {
    dispatch(fetchAsyncPdMemoryTableSlice(qd))
  }, [dispatch]);
  return (
    <div className="table_wrapper">
      <div style={{ pageBreakAfter: "always" }}>
        <ReportHeaderProblemDetermination />
        {pdMemoryData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
      {!pdMemoryData.loading &&
        <DataTable
          value={pdMemoryData.data.data}
          stripedRows
          showGridlines
          responsiveLayout="scroll"
        >
          <Column
            field="pool"
            header="Memory Pool"
            align="center"
            style={{ width: "264px" }}
          ></Column>
          <Column
            align="center"
            field={(data) => renderCommonPdMemory(data, data.memory_size)}
            header="Memory (GB)"
          ></Column>
          <Column
            align="center"
            field={(data) => renderCommonPdMemory(data, data.mem_perc)}
            header="% of Memory in Pool"
          ></Column>
          <Column
            align="center"
            field={(data) => renderCommonPdMemory(data, data.faulting_rate)}
            header="Average Faulting Rate (Faults / Sec)"
          ></Column>
        </DataTable>
      }
      </div>
    </div>
  )
}

export default MemoryPdTablePrint