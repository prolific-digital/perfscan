import { Toast } from "primereact/toast";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { validateAddUser } from "../../../../helpers/commonHelper";
import {addUser} from "../../../../services/apiService";

function AddUser() {
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState({
      username: "",
      email: "",
      password: "",
    });
    const toast = React.useRef(null);
  
    const handleInputChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
        setUserData({ ...userData, [name]: value });
    };
  
    const createUser = async () => {
      setIsLoading(true);
      try {
        const finalData = {
          name: userData.username,
          email: userData.email,
          password : userData.password,
          firstname : userData.firstname,
          lastname : userData.lastname
          //questionId: "1",
          //answer: ""
        };
        const errors = validateAddUser(finalData);
        if (errors.length) {
          let errList = errors.map((err) => ({
            severity: "error",
            summary: `${err}`,
            life: 3000,
          }));
          toast.current.show(errList);
          return;
        }
        const response = await addUser(finalData);
          if (response.status === 201) {
          showToast("success", "User Created", "User Created successfully!!");
            setTimeout(() => {
              navigate(-1);
            }, 1000);
          } 
      } catch (error) {
        showToast("error", "Error", error.message);
      } finally {
        setIsLoading(false);
      }
    };
    const showToast = (type, summary, details) => {
      toast.current.show({
        severity: type || "success",
        summary: summary || "Success Message",
        detail: details || "Message Content",
        life: 3000,
      });
    };
  
    return (
      <div className="add-events">
        <button
          className="btn btn-icon-primary btn-icon"
          onClick={() => navigate(-1)}
        >
          <i className="pi pi-arrow-left"></i>
        </button>
        <div className="sidebar-title">Add User</div>
        <div className="form-options">
          <div className="form_group">
            <label className="label">User name</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="User name"
              value={userData.username}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="form_group">
            <label className="label">First Name</label>
            <input
              type="text"
              name="firstname"
              className="form-control"
              placeholder="Enter first name"
              value={userData.firstname}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="form_group">
            <label className="label">Last Name</label>
            <input
              type="text"
              name="lastname"
              className="form-control"
              placeholder="Enter last name"
              value={userData.lastname}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="form_group">
            <label className="label">Email id</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email id"
              value={userData.email}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div className="form_group">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={userData.password}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
        <button
          className="btn btn-primary"
          style={{ margin: "auto" }}
          onClick={() => createUser()}
        >
          {isLoading && <i className="pi pi-spin pi-spinner"></i>} Save and Close
        </button>
        <Toast ref={toast} position="top-right"></Toast>
      </div>
    );
  }

export default AddUser;
