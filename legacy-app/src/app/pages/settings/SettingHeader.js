import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

function SettingHeader(props) {
  const { iconClass, title, subTitle, pLink, showAlertButtons, getActiveTab, activeTabID } = props;
  const navigate = useNavigate();

  const activeTabHandler= useCallback((tab)=>{
    getActiveTab(tab)
  },[activeTabID])

  return (
    <div
      className="setting-header"
    >
      <div
        style={{
          display: showAlertButtons ? "flex" : "",
          flexDirection: showAlertButtons ? "column" : "",
        }}
      >
        <div
          className="settion-header-left"
          style={{ marginBottom: showAlertButtons ? "50px" : "" }}
        >
          <div className="setting-icon">
            {iconClass && <i className={iconClass}></i>}
          </div>
          <div className="setting-header-details">
            {title && <div className="setting-header-title">{title}</div>}
            {subTitle && (
              <div className="setting-header-subtitle">{subTitle}</div>
            )}
          </div>
        </div>
        {showAlertButtons && (
          <div style={{ marginBottom: "1.8rem" }}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={activeTabID === 1 ? "active" : ""}
                  onClick={() => activeTabHandler(1)}
                >
                  Notification Settings
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                className={activeTabID === 2 ? "active" : ""}
                onClick={() => activeTabHandler(2)}
                >
                  Alert Rules
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        )}
      </div>
      {pLink && (
        <div
          className="settion-header-right"
          style={{
            display: showAlertButtons ? "flex" : "",
            flexDirection: showAlertButtons ? "column" : "",
            alignItems: showAlertButtons ? "flex-end" : " ",
            marginBottom: showAlertButtons ? "1rem" : "",
          }}
        >
          {showAlertButtons && (
            <>
              <button
                className="btn btn-primary"
                // onClick={() => navigate("add-frame")}
                style={{
                  marginBottom: showAlertButtons ? "0.8rem" : "",
                }}
              >
                View Core Metrics Alerts
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate("add-user-modification")}
                style={{
                  marginBottom: showAlertButtons ? "0.8rem" : "",
                }}
              >
                Add User Notification
              </button>
            </>
          )}
          <Link
            to={pLink}
            target="_blank"
            rel="noopener noreferrer"
            
          >
            <button type="btn" className="btn btn-primary">
              <i className="fa fa-print"></i> Print
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default SettingHeader;
