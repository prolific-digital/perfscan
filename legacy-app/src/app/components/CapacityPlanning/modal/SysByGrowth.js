import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { SelectButton } from "primereact/selectbutton";

const SysByGrowth = (props) => {
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [sysData, setSysData] = useState([]);
  const [value, setValue] = useState(1);
  const items = [
    { name: "Show My Systems", value: 1 },
    { name: "Show Potential Systems", value: 2 },
  ];

  const setSys = (sys) => {
    props.setData(sys);
    setSelectedSystem(sys);
  };

  const getData = (e) => {
    // debugger
    if (+e === 2) {
      const data =
        props?.data &&
        props?.data?.filter((d) => {
          return (
            +d.perc_change >= +props.params.perc_growth - 0.5 &&
            +d.perc_change <= +props.params.perc_growth + 0.5
          );
        });
      const newData = data?.map((ele, index) => {
        return { ...ele, proposed_cpw: parseInt(+ele.proposed_cpw).toFixed(0) };
      });

      setSysData(newData);
    } else {
      setSysData([
        {
          ...props?.currentSysData[0],
          description: props?.currentSysData[0].entity_description,
          serialNum: props?.currentSysData[0].serial_num,
        },
      ]);
    }
    setValue(e);
  };
  useEffect(() => {
    if (value === 1) {
      setSysData([
        {
          ...(props?.currentSysData?.length && props?.currentSysData[0]),
          description: props?.currentSysData?.length && props?.currentSysData[0].entity_description,
          serialNum: props?.currentSysData?.length && props?.currentSysData[0].serial_num,
        },
      ]);
    } else {
      const newData = props?.data?.map((ele, index) => {
        return { ...ele, proposed_cpw: parseInt(+ele.proposed_cpw).toFixed(0) };
      });
      setSysData(newData);
    }
  }, [props?.currentSysData, props?.data, value]);

  const activeTotalCPWAndCores = (rowData) => {
    return (
      <div>
        {rowData.m_cpw} ({rowData.m_ncores})
      </div>
    );
  };

  const activeCPWAndCores = (rowData) => {
    return (
      <div>
        {rowData.active_cpw} ({rowData.active_cores})
      </div>
    );
  };

  const activeCPWAndCoresUsed = (rowData) => {
    return (
      <div>
        {rowData.total_cpw_rating} ({rowData.total_cores})
      </div>
    );
  };

  const availableCPWAndCores = (rowData) => {
    return (
      <div>
        {rowData.total_cpw_rating
          ? +rowData.active_cpw - +rowData.total_cpw_rating
          : "-"}{" "}
        ({rowData.m_ncores ? +rowData.m_ncores - +rowData.total_cores : "-"})
      </div>
    );
  };

  return (
    <div className="build_para_card_sys">
      <div className="header">
        <section className="sectionA">
          <div className="build_title">
            Proposed No. of Systems Shown : {props.data?.length}
          </div>
          <div className="build_title">
            Based on Potential for Growth (PFG) percentage :{" "}
            {props.params.perc_growth}
          </div>
          <div className="build_title">Peak CPW : {props.peak} </div>
        </section>
        <section className="sectionB">
          <SelectButton
            value={value}
            onChange={(e) => getData(e.value)}
            optionLabel="name"
            options={items}
          />
        </section>
      </div>
      {value === 1 && (
        <div className="systems">
          <DataTable
            value={props?.showMySystem ? sysData : []}
            selectionMode={true}
            selection={selectedSystem}
            onSelectionChange={(e) => setSys(e.value)}
            dataKey="m_id"
            tableStyle={{ minWidth: "80rem" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column field="description" header="Description" sortable>
              North Carolina Data Center
            </Column>
            <Column field="m_model" header="Model" sortable />
            <Column field="serialNum" header="Serial#" sortable />
            <Column
              body={activeTotalCPWAndCores}
              header="Total Frame CPW (Cores)"
              sortable
            />
            <Column
              body={activeCPWAndCores}
              header="Active CPW (Cores)"
              sortable
            />
            <Column
              body={activeCPWAndCoresUsed}
              header="Current CPW Used (Cores)"
              sortable
            />
            <Column
              body={availableCPWAndCores}
              header="Available CPW (Cores)"
              sortable
            />
            <Column
              field="proposed_lpar_cores"
              header="Proposed Cores"
              sortable
            />
            <Column field="proposed_cpw" header="Proposed CPW" sortable />
            <Column
              field="perc_change"
              header="Actual Growth Capacity %"
              sortable
            />
            <Column selectionMode="single" headerStyle={{ width: "3rem" }} />
          </DataTable>
        </div>
      )}
      {value === 2 && (
        <div className="systems">
          <DataTable
            value={sysData}
            selectionMode={true}
            selection={selectedSystem}
            onSelectionChange={(e) => setSys(e.value)}
            dataKey="m_id"
            tableStyle={{ minWidth: "80rem" }}
            paginator
            rows={5}
            rowsPerPageOptions={[5, 10, 25, 50]}
          >
            <Column field="m_ptype" header="Type" sortable />
            <Column field="m_model" header="Model" sortable />
            <Column field="m_cpw" header="CPW Rating (Frame)" sortable />
            <Column field="m_ncores" header="Total Frame Cores" sortable />
            <Column
              field="proposed_lpar_cores"
              header="Proposed LPAR Cores"
              sortable
            />
            <Column
              field="proposed_cpw"
              header="Proposed CPW Based on PFG"
              sortable
            />
            <Column
              field="perc_change"
              header="Actual Growth Capacity %"
              sortable
            />
            <Column selectionMode="single" headerStyle={{ width: "3rem" }} />
          </DataTable>
        </div>
      )}
    </div>
  );
};

export default SysByGrowth;
