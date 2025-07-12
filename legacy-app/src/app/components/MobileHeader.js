import React from "react";
import { Button } from "reactstrap";

function MobileHeader(props) {
  const { toggleSidebar, isSidebarOpen } = props;
  return (
    <div className="mobile-top-nav">
      <Button className="btn btn-toggle" onClick={toggleSidebar}>
        <i
          className={"fa " + (isSidebarOpen ? " fa-times" : " fa-bars")}
          aria-hidden="true"
        ></i>
      </Button>
      <a href="/performance-insights/historical-data" className="navbar-brand-main">
      <img
          className="navbar-brand-img"
          src="/PerfScanlogocolor.jpg"
          alt="logo PerfScan"
        />
      </a>
    </div>
  );
}

export default MobileHeader;
