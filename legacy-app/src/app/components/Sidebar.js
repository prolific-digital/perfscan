import React from "react";
import MetisMenu from "react-metismenu";
import Header from "./Header";
import { getUserProfile } from "../../store/slices/UserProfile/UserProfile";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import _, { last } from "lodash";
import { client_name, allowedClients } from "../../typeCodes";
import { Link } from "react-router-dom";

export const MainNav2 = [
  {
    icon: "fa fa-database",
    label: "UserName",
  },
];

const showDashboardBarBasedOnClient = () => {
  if (allowedClients.includes(client_name) ) {
    return [
      {
        icon: "fa fa-database",
        label: "Dashboard",
        content: [
          {
            label: "Real Time Monitor",
            to: "/enterprise-server",
          },
        ],
      }
    ];
  } else {
    return []
  }
};

const showSideBarBasedOnClient = () => {
  if (allowedClients.includes(client_name) ) {
    return [
      {
        icon: "fa fa-plus-square-o",
        label: "Capacity Planning",
        content: [
          {
            label: "Capacity Analysis",
            to: "/capacity-analysis",
          },
        ],
      },
      {
        icon: "fa fa-tachometer",
        label: "Performance Reports",
        content: [
          {
            label: "Saved Reports",
            to: "/existing-reports",
          },
        ],
      },
    ];
  } else {
    return [
      {
        icon: "fa fa-tachometer",
        label: "Performance Reports",
        content: [
          {
            label: "Saved Reports",
            to: "/existing-reports",
          },
        ],
      },
    ];
  }
};

export const MainNav = [
  
  // {
  //   icon: "fa fa-bar-chart",
  //   label: "Historical Data",
  //   content: [
  //     {
  //       label: "Performance Insights",
  //       to: "/performance-insights",
  //     },
  //     {
  //       label: "Period Vs Period",
  //       to: "/period-vs-period",
  //     }
  //   ],
  // },
  ...showDashboardBarBasedOnClient(),
  {
    icon: "fa fa-bar-chart",
    label: "Performance Insight",
    content: [
      {
        label: "Historical Data",
        to: "/performance-insights/historical-data",
      },
      {
        label: "What's Changed",
        to: "/performance-insights/whats-changed",
      },
      {
        label: "Period vs Period",
        to: "/performance-insights/period-vs-period",
      },
      // {
      //   label: "Problem Determination",
      //   //to: "/performance-insights/problem-determination",
      //   to: "/coming-soon",
      // },
    ],
  },
  ...showSideBarBasedOnClient(),
];

function Sidebar(props) {
  const { isSidebarOpen, sidebarRef } = props;
  const userData = useSelector(getUserProfile);
  const [userDetail, setUserDetail] = useState({
    firstName: "",
    lastName: "",
  });

  const toggleMobileSidebar = () => {
    // let { enableMobileMenu, setEnableMobileMenu } = props;
    // setEnableMobileMenu(!enableMobileMenu);
  };
  useEffect(() => {
    if (!userData.loading && !_.isEmpty(userData.data)) {
      setUserDetail({
        firstName: userData.data.data[0].firstname,
        lastName: userData.data.data[0].lastname,
      });
    }
  }, [userData.data, userData.loading]);

  return (
    <div
      className={"sidebar_main " + (isSidebarOpen ? "active" : "")}
      ref={sidebarRef}
    >
      <a
        href="/performance-insights/historical-data"
        className="navbar-brand-main"
      >
        <img
          className="navbar-brand-img"
          src="/PerfScanlogocolor.jpg"
          alt="logo PerfScan"
        />
      </a>
      {!userDetail.loading && (
        <div className="user_image">
          <div style={{ width: "2.8rem" }}>
            <img
              src="/team-male.jpg"
              alt="user_icon"
              className="user_image_styling"
            />
          </div>
          <h3 className="user_profile">
            {(userDetail.firstName + userDetail.lastName).length < 15
              ? userDetail.firstName + " " + userDetail.lastName
              : userDetail.firstName}
          </h3>
        </div>
      )}

      <MetisMenu
        content={MainNav}
        onSelected={toggleMobileSidebar}
        activeLinkFromLocation
        className="vertical-nav-menu"
        iconNamePrefix=""
        classNameStateIcon="fa fa-angle-down"
      />
      <Header />
    </div>
  );
}

export default Sidebar;
