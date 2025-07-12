import * as _ from "lodash";

import { useEffect, useState } from "react";

import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";

import {TabContent, TabPane } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useSubscription } from "@apollo/client";

import NavBar from "../../NavTab/NavBar";
import {
  topJobsTableData,
  topJobsTableDataHandler,
} from "../../../../store/slices/enterpriseServer/RTGraphSlice/enterpriseServerRTData";
import { topJobsTableTrigger } from "../../../pages/GraphQL/Mutations/TopJobsMutations";
import { topJobsTableSub } from "../../../pages/GraphQL/Subscriptions/TopJobsSubscriptions";

const TopJobsTable = ({topJobsToggle, selectedSystem, id}) => {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const topJobsData = useSelector(topJobsTableData);
  const [checkData, setCheckData] = useState(false);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [topJobsDataMutation, wholeDayData] = useMutation(topJobsTableTrigger);

  const topJobsDataSub = useSubscription(topJobsTableSub, {
    variables: { topJobsDataId: +id },
  });

  useEffect(() => {
    topJobsDataMutationHandler(+id);
  }, [id]);

  useEffect(() => {
    if (wholeDayData && !wholeDayData?.loading && wholeDayData?.data) {
      if (
        typeof wholeDayData != "undefined" &&
        wholeDayData?.hasOwnProperty("data") &&
        Object.keys(wholeDayData?.data)?.length &&
        wholeDayData?.data?.topJobsData?.length
      ) {
        dispatch(topJobsTableDataHandler(wholeDayData));
        setTableData(wholeDayData?.data?.topJobsData);
        setCheckData(true);
      }else{
        setTableData([])
      }
    }
  }, [wholeDayData.loading]);

  useEffect(() => {
    if (topJobsDataSub && !topJobsDataSub?.loading && topJobsDataSub?.data) {
      // const updatedArr = setTimeout(() => {
        if (
          !topJobsDataSub?.loading &&
          typeof topJobsDataSub === "object" &&
          topJobsDataSub?.data?.topJobsData?.length
        ) {
          setTableData(topJobsDataSub?.data?.topJobsData);
        }
      // }, 3000);

      // return () => {
      //   clearTimeout(updatedArr);
      // };
    }
  }, [topJobsDataSub]);

  const topJobsDataMutationHandler = async (id) => {
    try {
      await topJobsDataMutation({ variables: { topJobsDataId: id } });
    } catch (error) {
      console.log(error);
      if (error.name === "AbortError") {
      } else {
        console.error(error);
      }
    }
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <InputText
          style={{ maxWidth: "15rem" }}
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Keyword Search"
          className="form-control"
        />
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="topjobs-conatiner">
      <div className="top-jobs-nav">
        <NavBar tabName={"Reports"}/>
      </div>

      <TabContent activeTab={String(topJobsToggle ? 1 : "")}>
        <TabPane tabId="1">
          {topJobsData?.loading && (
            <div style={{ textAlign: "center" }}>Loading...</div>
          )}
          {!topJobsData?.loading &&
            !_.isEmpty(topJobsData?.data?.topJobsData) &&
            checkData && (
              <DataTable
                value={tableData}
                header={header}
                paginator
                className="systems-table"
                showGridlines
                rows={10}
                rowsPerPageOptions={[10, 20, 30, 40, 50]}
                dataKey="id"
                filterDisplay="menu"
                responsiveLayout="scroll"
                filters={filters}
                globalFilterFields={[
                  "jbname",
                  "jbuser",
                  "jbnbr",
                  "cpu",
                  "totalios",
                  "syncios",
                  "asyncios",
                  "faults",
                ]}
                emptyMessage="No Jobs Found"
              >
                <Column header="Job Name" field="jbname" sortable></Column>
                <Column header="User" field="jbuser" sortable></Column>
                <Column header="Job Num" field="jbnbr" sortable></Column>
                <Column header="CPU ms" field="cpu" sortable></Column>
                <Column header="Total IOs" field="totalios" sortable></Column>
                <Column header="Sync IOs" field="syncios" sortable></Column>
                <Column header="Async IOs" field="asyncios" sortable></Column>
                <Column header="Faults" field="faults" sortable></Column>
              </DataTable>
            )}
          {!topJobsData?.loading && !checkData && (
            <div style={{ textAlign: "center", padding: "15em" }}>
              No data available for Top Jobs Data Table
            </div>
          )}
        </TabPane>
      </TabContent>
    </div>
  );
};

export default TopJobsTable;
