import React, { useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";
import Notification from "./Notification";
import Profile from "./Profile";
import SettingPopup from "./SettingPopup";

function Header() {
  const [isNotification, setIsNotification] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  const profileRef = useRef();
  const settingRef = useRef();

  useClickOutside(profileRef, () => setIsProfile(false));
  useClickOutside(settingRef, () => setIsSetting(false));

  //  action handlers
  const handleNotificationClick = () => {
    setIsNotification((isNotification) => !isNotification);
  };
  const handleProfileClick = () => {
    setIsProfile(true);
  };
  const handleSettingClick = () => {
    setIsSetting(true);
  };

  return (
    <div className="main_header">
      <div className="right_section">
        <div className="notification_section">
          {/*
          <span className="notification_icon" onClick={handleNotificationClick}>
            <i className="fa fa-bell"></i>
          </span>*/}
        </div>
        <div
          className="profile_section"
          ref={profileRef}
          onClick={handleProfileClick}
        >
          <div className="user_avtar">
            <img
              src="/team-male.jpg"
              alt="user_icon"
            />
          </div>
          {isProfile && <Profile />}
        </div>
        <div
          className="setting_section"
          onClick={handleSettingClick}
          ref={settingRef}
        >
          <span className="setting_icon">
            <i className="fa fa-cog"></i>
          </span>
          {isSetting && <SettingPopup />}
        </div>
      </div>
      {isNotification && (
        <Notification
          isNotification={isNotification}
          closeModal={() => setIsNotification(false)}
        />
      )}
    </div>
  );
}

export default Header;
