import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllEvents, deleteEvent } from "../../../../services/apiService";
import SettingHeader from "../SettingHeader";
import { confirmDialog } from "primereact/confirmdialog";
import moment from "moment";
import { Dropdown } from "primereact/dropdown";
import {getAllSystems} from "../../../../services/apiService"
import _ from "lodash";
import { useDispatch } from "react-redux";
import { deleteTemporaryReport } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getParametersFromLocalStorage } from "../../../../helpers/commonHelper";

function ChangeEventsList() {
  let navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const [, setIsError] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState({});
  const [systemsList, setSystemsList] = useState([]);
  const uniqueId = getParametersFromLocalStorage("uniqueid")
  const [filters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // fetchAllEvents(selectedSystem.id || 1);
    fetchAllSystems();
  }, []);

  useEffect(() => {
    if (_.isEmpty(selectedSystem)) {
      fetchAllEvents("");
    }
    if (selectedSystem && selectedSystem.id) {
      fetchAllEvents(selectedSystem.id);
    }
  }, [selectedSystem]);

  const fetchAllSystems = async () => {
    try {
      const response = await getAllSystems();
      if (response.status === 200) {
        const data = response.data || [];
        if (data.length) {
          setSystemsList(data);
          // setSelectedSystem(data[0]);
        }
      }
    } catch (error) {}
  };

  const systemOptionTemplate = (option) => {
    return (
      <div className="value-options">
        {option.entity_name} - {option.entity_description} -{" "}
        {option.entity_data.frame.serial_number}
      </div>
    );
  };

  const selectedSystemTemplate = (option, props) => {
    if (option) {
      return (
        <div className="value-options">
          {option.entity_name} - {option.entity_description} -{" "}
          {option.entity_data.frame.serial_number}
        </div>
      );
    }
    return <span>{props.placeholder}</span>;
  };

  const fieldName = (option) => {
    return (
      <div className="value-options">
        {option.system_name} - {option.entity_data.frame.serial_number}
      </div>
    );
  };

  const fetchAllEvents = async (sysID) => {
    try {
      setIsloading(true);
      let response = await getAllEvents(sysID);
      if (response.status === 200) {
        if (response.data) {
          setEventsList(response.data || []);
        }
      }
    } catch (error) {
      setIsError("Something went wrong!! Please try again later");
    } finally {
      setIsloading(false);
    }
  };
  

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setGlobalFilterValue1(value);
  };
  const removeEvent = async (id) => {
    try {
      setIsloading(true);
      let response = await deleteEvent(id);
      if (response.status === 200) {
        fetchAllEvents();
      }
    } catch (error) {
      setIsError("Something went wrong!! Please try again later");
    } finally {
      setIsloading(false);
    }
  };
  const confirm = (id) => {
    confirmDialog({
      message: "Are you sure you want to Delete this event?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => removeEvent(id),
      reject: () => {},
    });
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

  const navigateToEdit = (item) => {
    navigate({
      pathname: `edit/${item.id}`,
    });
  };
  const renderSystemActions = (item) => {
    return (
      <div style={{ display: "flex" }}>
        <button
          className="btn btn-icon-secondary btn-icon"
          onClick={() => navigateToEdit(item)}
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

  // useEffect(()=>{
  //   if(uniqueId?.data?.uniqueid){
  //    dispatch(deleteTemporaryReport({uniqueid:uniqueId.data.uniqueid}));
  //   }
  // },[]) 

  return (
    <>
      <SettingHeader
        iconClass={"fa fa-calendar-check-o"}
        title={"Change Events"}
        subTitle={"Enter the change events that have occurred"}
      />
      <div className="manage-events-list">
        <div className="system-option">
              <Dropdown
                value={selectedSystem}
                options={systemsList}
                onChange={(e) => setSelectedSystem(e.value)}
                optionLabel="name"
                filter
                filterBy="entity_name"
                placeholder="Select a System"
                valueTemplate={selectedSystemTemplate}
                itemTemplate={systemOptionTemplate}
              />
            </div>
        <button className="btn btn-primary" onClick={() => navigate("add")}>
          Add Events
        </button>
        <DataTable
          value={eventsList}
          paginator
          className="systems-table"
          showGridlines
          rows={10}
          dataKey="id"
          filters={filters1}
          filterDisplay="menu"
          loading={isloading}
          responsiveLayout="scroll"
          globalFilterFields={["event_type", "sub_type"]}
          header={header}
          emptyMessage="There are no change events"
          sortField="version"
        >
          <Column field={fieldName} header="Name" sortable></Column>
          <Column field="change_type" header="Event Type" sortable></Column>
          <Column field="change_subtype" header="Name" sortable></Column>
          <Column field="version" header="Version/Release" sortable></Column>
          <Column
            field={(item) => moment(item.start_date).format("LLL")}
            header="Start Date"
            sortable
          ></Column>
          <Column
            field={(item) =>
              item.edate ? moment(item.edate).format("LLL") : ""
            }
            header="End Date"
            sortable
          ></Column>
          <Column
            field={(data) => renderSystemActions(data)}
            header="Actions"
            style={{}}
          ></Column>
        </DataTable>
      </div>
    </>
  );
}

export default ChangeEventsList;
