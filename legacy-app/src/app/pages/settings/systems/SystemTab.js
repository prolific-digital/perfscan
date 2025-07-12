import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import { confirmDialog } from "primereact/confirmdialog";
import { deleteSystem, getAllSystems } from "../../../../services/apiService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { FilterMatchMode } from "primereact/api";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { useDispatch } from "react-redux";
import { getParametersFromLocalStorage } from "../../../../helpers/commonHelper";
import { getUserById } from "../../../../services/apiService";
import { TabContent, TabPane } from "reactstrap";

const SystemTab = () => {
  const [isloading, setIsloading] = useState(false);
  const [isError, setIsError] = useState("");
  const [systemsList, setSystemsList] = useState([]);
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
      let response = await getAllSystems();
      if (response.status === 200) {
        if (response.data?.length) {
          setSystemsList(response.data);
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
      {/*
      <Row>
        <Column header="System" colSpan={2} />
        <Column header="Frame" colSpan={9} />
        <Column header="LPAR" colSpan={10} />      
      </Row>
      */}
      <Row>
        <Column header="Name" sortable field="entity_name" />
        <Column header="Description" sortable field="entity_description" />
        <Column header="Serial Number" sortable field="serial_number" />
        <Column header="Model" sortable field="model" />
        <Column header="Feature Code" sortable field="feature_code" />
        <Column header="PGroup" sortable field="pgroup" />
        {/*<Column header="# of Cores" sortable field="total_frame_cores" />*/}
        <Column header="# of Cores" sortable field="lpar_cores" />
        <Column header="Virtuals" sortable field="virtuals" />
        <Column header="Total CPW Rating" sortable field="total_cpw_rating" />
        <Column header="DASD Installed" sortable field="total_dasd" />
        <Column header="Memory Installed" sortable field="frame_memory" />        
        {/*<Column header="Operating System" sortable field="os" />*/}

        {/*<Column header="Number" sortable field="#" />*/}
       
        
        <Column header="Mode" sortable field="mode" />
        {/*<Column header="CPW rating" sortable field="cpw_rating" />*/}
        
        <Column header="My Systems" sortable field="" />
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
      ) : systemsList.length === 0 ? (
        <p>'no Data found'</p>
      ) : systemsList.length > 0 ? (
        <>
          <DataTable
            value={systemsList}
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
              "entity_description",
              "entity_data.serial_number",
              "entity_data.model",
              "entity_data.feature_code",
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
            ]}
            header={header}
            emptyMessage="No System Found"
            headerColumnGroup={headerGroup}
          >
            <Column field={({ entity_name }) => entity_name} />
            <Column field={({ entity_description }) => entity_description} />
            <Column field={({ entity_data }) => entity_data?.frame?.serial_number} />
            <Column field={({ entity_data }) => entity_data?.frame?.model} />
            <Column field={({ entity_data }) => entity_data?.frame?.feature_code}/>
            <Column field={({ entity_data }) => entity_data?.frame?.pgroup} />
            {/*<Column field={({ entity_data }) => entity_data?.frame?.total_frame_cores} />*/}
            <Column field={({ entity_data }) => entity_data?.lpar?.lpar_cores}/>
            <Column field={({ entity_data }) => entity_data?.lpar?.virtuals} />
            {/*<Column field={({ entity_data }) => entity_data?.frame?.total_cpw_rating} />*/}
            <Column field={({ entity_data }) => entity_data?.lpar?.cpw_rating} />
            <Column field={({ entity_data }) => entity_data?.lpar?.lpar_dasd} />
            
            
            {/*<Column field={({ entity_data }) => entity_data?.lpar?.total_dasd} />*/}
            <Column field={({ entity_data }) => entity_data?.frame?.frame_memory} />
            <Column field={({ entity_data }) => entity_data?.lpar?.mode} />
            {/*<Column field={({ entity_data }) => entity_data?.frame?.os} />*/}
            {/*<Column field="#" body={(data, options) => options?.rowIndex + 1} />*/}
            <Column field={({ entity_data }) => entity_data?.frame?.show_my_system ? "Yes" : "No" }/>            
            <Column field={(data) => renderSystemActions(data, "edit-system")}  header="Actions" style={{}}></Column>            
          </DataTable>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default SystemTab;
