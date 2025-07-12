import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector, useDispatch } from "react-redux";
import {checkSystemStatus, renderFindings} from "../../../../helpers/summaryHelpers";

const SummaryData = (summarydata, header) => {
    return <>
        {
            summarydata && summarydata.loading ? <span>loading...</span> : 
        <div>
          <DataTable
            value={summarydata}
            header={header}
            stripedRows
            showGridlines
            responsiveLayout="scroll"
          >
                <Column
                    field="dtypedesc"
                    header="Metric"
                    align="center"
                ></Column>
            <Column
              align="center"
              field={(data) => (
                <span className={checkSystemStatus(data)}>
                  {checkSystemStatus(data)}
                </span>
              )}
              header="Status"
            ></Column>
            <Column
              field={(data) => renderFindings(data)}
              header="Findings"
            ></Column>
          </DataTable>
        </div>
        }
    </>
}

export default SummaryData;