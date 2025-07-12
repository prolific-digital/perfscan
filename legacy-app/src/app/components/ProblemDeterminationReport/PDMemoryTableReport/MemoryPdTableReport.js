import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as _ from 'lodash';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { renderCommonPdMemory } from "../../../../helpers/summaryHelpers";
import ReportHeaderProblemDeterminationReport from "./ReportHeaderProblemDeterminationReport";
import { fetchAsyncPdMemoryReportTableSlice,getPdCommonMemoryReportTableData } from "../../../../store/slices/reports/problemDeterminationReport/pdCommonMemoryTableSlice";
import GridLoader from "react-spinners/GridLoader";

const MemoryPdTableReport = ({reportId}) => {
      const dispatch = useDispatch(); 
      const pdMemoryData = useSelector(getPdCommonMemoryReportTableData);
      useEffect(() => {
        dispatch(fetchAsyncPdMemoryReportTableSlice(reportId))
      }, [dispatch]);
      return (
        <div className="table_wrapper">
        <ReportHeaderProblemDeterminationReport queryDateTimeReport={pdMemoryData?.data?.params}/>
        {pdMemoryData.loading &&
        <div>
          <GridLoader color="#366bd6"/>
        </div>
      }
      {!pdMemoryData.loading &&
      <div style={{ pageBreakAfter: "always" }}>
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
         </div>
      }
        </div>
      )
}

export default MemoryPdTableReport