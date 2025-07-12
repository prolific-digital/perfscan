import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { confirmDialog } from "primereact/confirmdialog";
import { deleteSystem, getAllFrames } from "../../../../services/apiService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { FilterMatchMode } from "primereact/api";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { getParametersFromLocalStorage } from "../../../../helpers/commonHelper";
import { getUserById } from "../../../../services/apiService";
import DelWithConfirm from "app/components/common/DelWithConfirm";

const FrameTab = () => {
  const [isloading, setIsloading] = useState(false);
  const [isError, setIsError] = useState("");
  const [frameList, setFrameList] = useState([]);
  const [User, setUser] = useState({});
  const [filters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  let navigate = useNavigate();
  const curUser = getParametersFromLocalStorage("userID");

  useEffect(() => {
    fetchAllSystems();
    fetchCurUser();

    // there was memory leak when component was unmounting,
    //so added cleanup function and reset the set before the component unmounts.
    return () => {
      setUser({});
    };
  }, []);

  const fetchAllSystems = async () => {
    try {
      setIsloading(true);
      let response = await getAllFrames();
      if (response.status === 200) {
        if (response.data?.length) {
          setFrameList(response.data);
        }
      }
    } catch (error) {
      setIsError("Something went wrong!! Please try again later");
    } finally {
      setIsloading(false);
    }
  };

  const fetchCurUser = async () => {
    try {
      let response = await getUserById(curUser);
      if (response.status == 200) {
        if (response.data) {
          setUser(response?.data?.data[0] || {});
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const removeSystem = async (id) => {
    try {
      setIsloading(true);
      let response = await deleteSystem(id);
      if (response.status === 200) {
        fetchAllSystems();
      }
    } catch (error) {
      setIsError("Something went wrong!! Please try again later");
    } finally {
      setIsloading(false);
    }
  };
  const confirm = (id) => {
    confirmDialog({
      message: "Are you sure you want to Delete this system?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => removeSystem(id),
      reject: () => {},
    });
  };

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setGlobalFilterValue1(value);
  };

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <input
          type="search"
          style={{ maxWidth: "15rem" }}
          value={globalFilterValue1}
          onChange={(e) => onGlobalFilterChange1(e)}
          placeholder="Enter your search key word"
          className="form-control"
        />
      </div>
    );
  };

  const header = renderHeader();

  const renderSystemActions = (item, page) => {
    return (
      <div style={{ display: "flex" }}>
        <button
          className="btn btn-icon-secondary btn-icon"
          onClick={() => navigate(`${page}/${item.id}`)}
        >
          <i className="pi pi-pencil"></i>
        </button>
        {/*<DelWithConfirm message={`Do you want to delete ${item.entity_description} ( ${item.entity_name} )`} onAccept={removeSystem} id={item.id} />*/}
        <button
          className="btn btn-danger  btn-icon"
          style={{ marginLeft: "5px" }}
          onClick={() => confirm(item.id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      </div>
    );
  };

  let headerGroup = (
    <ColumnGroup>
      {/* <Row> */}
      {/* <Column header="System" colSpan={2} />
        <Column header="Frame" colSpan={9} />
        <Column header="LPAR" colSpan={10} /> */}
      {/* {User && User.role === "admin" && <Column header="" />} */}
      {/* </Row> */}
      <Row>
        <Column header="Model / FC" sortable field="entity_name" />
        <Column header="Serial Number" sortable field="serial_number" />
        <Column header="Description / Location" sortable field="model" />
        <Column header="Total CPW Rating" sortable field="total_cpw_rating" />
        <Column header="Activated CPW" sortable field="activated_cpw" />
        <Column header="Cores Configured" sortable field="activated_cpw" />
        <Column header="Current CPW Used" sortable field="total_cpw_rating" />
        <Column header="Available CPW" sortable field="total_cpw_rating" />
        <Column header="Total Systems / LPAR" sortable field="total_dasd" />
        <Column header="Total DASD (TB)" sortable field="total_dasd" />
        <Column header="Total Memory (GB)" sortable field="frame_memory" />
        <Column header="Show My System" sortable field="show_my_system" />
        {User && User.role === "admin" && <Column header="Actions" />}
      </Row>
    </ColumnGroup>
  );

  return (
    <>
      {isloading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : frameList.length === 0 ? (
        <h3>There are no frames available</h3>
      ) : frameList.length > 0 ? (
        <>
          <DataTable
            value={frameList}
            paginator
            className="systems-table"
            showGridlines
            rows={10}
            dataKey="id"
            filters={filters1}
            filterDisplay="menu"
            loading={isloading}
            responsiveLayout="scroll"
            globalFilterFields={[
              "entity_name",
              "entity_data.serial_number",
              "entity_data.model",
              "entity_data.pgroup",
              "entity_data.total_frame_cores",
              "entity_data.total_cpw_rating",
              "entity_data.total_dasd",
              "entity_data.frame_memory",
              "entity_data.os",
              "entity_data.lpar_cores",
              "entity_data.virtuals",
              "entity_data.mode",
              "entity_data.cpw_rating",
              "entity_data.total_dasd",
              "entity_data.frame_memory",
              "entity_data.show_my_system",
            ]}
            header={header}
            emptyMessage="No System Found"
            headerColumnGroup={headerGroup}
          >
            <Column field={({ entity_name }) => entity_name} />
            <Column
              field={({ entity_data }) => entity_data?.frame?.serial_number}
            />
            <Column field={({ entity_description }) => entity_description} />

            <Column
              field={({ entity_data }) => entity_data?.frame?.frame_cpw}
            />
            <Column
              field={({ entity_data }) => entity_data?.frame?.activated_cpw}
            />
            <Column field={({ total_cores }) => total_cores || "-"} />
            <Column field={({ total_cpw_rating }) => total_cpw_rating || "-"} />
            <Column
              field={({ entity_data, total_cpw_rating }) =>
              total_cpw_rating? entity_data?.frame?.activated_cpw - total_cpw_rating : "-"
              }
            />
            <Column field={({ system_count }) => system_count || "-"} />
            <Column
              field={({ entity_data }) => entity_data?.frame?.total_dasd}
            />
            <Column
              field={({ entity_data }) => entity_data?.frame?.total_memory}
            />
            <Column
              field={({ entity_data }) =>
                entity_data?.frame?.show_my_system ? "Yes" : "No"
              }
            />

            {User && User.role === "admin" && (
              <Column
                field={(data) => renderSystemActions(data, "edit-frame")}
                header="Actions"
                style={{}}
              ></Column>
            )}
          </DataTable>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default FrameTab;
