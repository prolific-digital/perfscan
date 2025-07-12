import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { deleteUser } from "../../../../services/apiService";
import SettingHeader from "../SettingHeader";
import { confirmDialog } from "primereact/confirmdialog";
import {getAllUsers, getUserById} from "../../../../services/apiService"
import _ from "lodash";
import { useDispatch } from "react-redux";
import { deleteTemporaryReport } from "../../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { getParametersFromLocalStorage } from "../../../../helpers/commonHelper";
import { Toast } from "primereact/toast";

function UserManagementList() {
    let navigate = useNavigate();
    const [isloading, setIsloading] = useState(false);
    const [, setIsError] = useState("");
    const [usersList, setUsersList] = useState([]);
    const [User, setUser] = useState({});
    const uniqueId = getParametersFromLocalStorage("uniqueid");
    const curUser = getParametersFromLocalStorage("userID");
    const toast = React.useRef(null);
    const [filters1] = useState({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [globalFilterValue1, setGlobalFilterValue1] = useState("");
    const dispatch = useDispatch();
  
    useEffect(() => {
        fetchAllUsers();
        fetchCurUser();
    }, []);
  
    const fetchAllUsers = async () => {
      try {
        setIsloading(true);
        let response = await getAllUsers();
        if (response.status === 200) {
          if (response.data) {
            setUsersList(response.data.data || []);
          }
        }
      } catch (error) {
        setIsError("Something went wrong!! Please try again later");
      } finally {
        setIsloading(false);
      }
    };
  
    const fetchCurUser = async()=>{
      try{
          let response = await getUserById(curUser)
          if(response.status == 200) {
            if(response.data){
              setUser(response.data.data[0] || {});
            }
          }
      }catch(e){
        console.log(e.message);
      }
    }
    const onGlobalFilterChange1 = (e) => {
      const value = e.target.value;
      let _filters1 = { ...filters1 };
      _filters1["global"].value = value;
  
      setGlobalFilterValue1(value);
    };
    const removeUser = async (id) => {
      try {
        setIsloading(true);
        let response = await deleteUser(id);
        if (response.status === 200) {
          fetchAllUsers();
          showToast("success", "User Deleted", "User Deleted successfully!!");
        }
      } catch (error) {
        setIsError("Something went wrong!! Please try again later");
      } finally {
        setIsloading(false);
      }
    };
    const confirm = (id) => {
      confirmDialog({
        message: "Are you sure you want to Delete this user?",
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => removeUser(id),
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

    
    const showToast = (type, summary, details) => {
      toast.current.show({
        severity: type || "success",
        summary: summary || "Success Message",
        detail: details || "Message Content",
        life: 3000,
      });
    };
  
    const header = renderHeader();
  
    const navigateToEdit = (item) => {
      navigate({
        pathname: `edit/${item.id}`,
      });
    };
    const renderUsersActions = (item) => {
      return (
        <div style={{ display: "flex" }}>
          <button
            className="btn btn-icon-secondary btn-icon"
            onClick={() => navigateToEdit(item)}
          >
            <i className="pi pi-pencil"></i>
          </button>
          <button
            className="btn btn-danger btn-icon"
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
    //     dispatch(deleteTemporaryReport({uniqueid:uniqueId.data.uniqueid}));
    //    }
    // },[]) 
  
    return (
      <>
        <SettingHeader
          iconClass={"fa fa-calendar-check-o"}
          title={"User Management"}
          subTitle={"Manage app users"}
        />
        <div className="manage-events-list">
          <button className="btn btn-primary" onClick={() => navigate("add")}>
            Add User
          </button>
          <DataTable
            value={usersList}
            paginator
            className="systems-table"
            showGridlines
            rows={10}
            dataKey="id"
            filters={filters1}
            filterDisplay="menu"
            loading={isloading}
            responsiveLayout="scroll"
            globalFilterFields={["name", "firstname","lastname", "email"]}
            header={header}
            emptyMessage="No users to add"
            sortField="version"
          >
            <Column field="name" header="Name" sortable></Column>
            <Column field="firstname" header="First Name" sortable></Column>
            <Column field="lastname" header="Last Name" sortable></Column> 
            <Column field="email" header="Email id" sortable></Column>
            {User && User.role === 'admin' &&
            <Column
              field={(data) => renderUsersActions(data)}
              header="Actions"
              style={{}}
            ></Column>
            }
          </DataTable>
        <Toast ref={toast} position="top-right"></Toast>
        </div>
      </>
    );
  }
  
export default UserManagementList;
