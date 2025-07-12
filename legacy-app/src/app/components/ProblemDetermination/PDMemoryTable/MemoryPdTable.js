import React, { useEffect } from "react";
import { fetchAsyncPdMemoryTableSlice, getPdCommonMemoryTableData } from "../../../../store/problemDetermination/pdCommonMemoryTableSlice";
import { useDispatch, useSelector } from "react-redux";
import * as _ from 'lodash';
import moment from "moment";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { renderCommonPdMemory, getPdMemoryStatus } from "../../../../helpers/summaryHelpers";
import ReportHeaderProblemDetermination from "./ReportHeaderProblemDetermination";
import usePDQueryData from "../QueryDates/usePDQueryData";
import GridLoader from "react-spinners/GridLoader";
import { getUuidData } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";

const MemoryPdTable = ({runReportStateValue}) => {
        const dispatch = useDispatch(); 
        const getSysId = useSelector(state=>state.filters.system_filter?.id);
        const pdMemoryData = useSelector(getPdCommonMemoryTableData);
        const pdQueryDates = usePDQueryData();
        const uuid = useSelector(getUuidData);
        let qd = null;
        if (runReportStateValue === false) {
          qd = {
            sdate: moment(new Date()).format(),
            edate: moment(new Date()).format(),
             stime: moment(new Date()).subtract(15,'minutes').format('h:mm:ss'), 
             etime: moment(new Date()).format('h:mm:ss'),
            sysid: getSysId,
             pd:true
         }
        } else {
          qd = { ...pdQueryDates, pd: true };
        }
    useEffect(() => {
      if(!uuid?.loading && uuid.data.uniqueid){
        dispatch(fetchAsyncPdMemoryTableSlice(qd))
      }
      }, [dispatch,uuid]);
      return (
        <div className="table_wrapper">
        <ReportHeaderProblemDetermination/>
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
             style={{width:"264px"}}
           ></Column>
           <Column
             align="center"
             field={(data)=>renderCommonPdMemory(data,data.memory_size)}
             header="Memory (GB)"
           ></Column>
           <Column
             align="center"
             field={(data)=>renderCommonPdMemory(data,data.mem_perc)}
             header="% of Memory in Pool"
           ></Column>
           <Column
            align="center"
            field={(data)=> renderCommonPdMemory(data,data.faulting_rate)}    
             header="Average Faulting Rate (Faults / Sec)"
           ></Column>
         </DataTable>
      }
        </div>
      )
}

export default MemoryPdTable