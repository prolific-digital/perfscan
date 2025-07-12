import React from "react";
import { Link } from "react-router-dom";
import { clearCookie } from "../../helpers/cookiesHelper";
import { getUserProfile } from "../../store/slices/UserProfile/UserProfile";
import { useSelector } from "react-redux";

function Profile() {
  const userData = useSelector(getUserProfile)
  const loggingOut = () => {
    clearCookie();
  }
  return (
    <div className=" custom_popup_wrapper profile_wrapper">
      {/* New Development by @Sourabh User profile data */}
      <div className="popup_header">
        <div
          className="bg_image"
          style={{
            backgroundColor: "#6c757d",
          }}
        ></div>
        <div className="popup_title">{(userData?.data?.data[0]?.firstname + userData?.data?.data[0]?.lastname).length < 15 ? 
        userData?.data?.data[0]?.firstname + " " + userData?.data?.data[0]?.lastname : userData?.data?.data[0]?.firstname }</div>
      </div>
      <div className="popup_body">
        <ul>
          <li>
            <Link to="/user-profile">Profile</Link>
          </li>
          <li>
            <Link onClick={loggingOut} to="/login">Logout</Link>
          </li>
        </ul>
      </div>

      {/*  ENDS here for User profile data */}

    </div>
  );
}

export default Profile;


      {/* Previous code is below */}

      {/* <div className="popup_header profile_header">
        <div className="user_avatar">
          <img
            src="https://demo.dashboardpack.com/architectui-html-pro/assets/images/avatars/1.jpg"
            alt="user_icon"
          />
        </div>
        <div className="user_details">
          <div className="user_name">Doug Mewmaw</div>
          <div className="user_designation">VP of Products</div>
        </div>
      </div>
      <div className="popup_body other_links">
        <ul>
          <li>
            <Link>Chat</Link>
          </li>
          <li>
            <a href="#">Edit Profile</a>
          </li>
          <li>
            <a href="#">Change Password</a>
          </li>
          <li>
            <a href="#">Log Out</a>
          </li>
        </ul>
      </div> */}
