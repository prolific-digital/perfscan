import React from "react";
import Modal from "react-modal";
import { Nav, NavItem, NavLink } from "reactstrap";
Modal.setAppElement("body");
function Notification(props) {
  const { isNotification, closeModal } = props;

  const renderUI = () => {
    return (
      <Nav tabs>
        <NavItem>
          <NavLink className={"active"}>Action</NavLink>
        </NavItem>
        <NavItem>
          <NavLink>User</NavLink>
        </NavItem>
      </Nav>
    );
  };

  return (
    <Modal
      isOpen={isNotification}
      onRequestClose={closeModal}
      className={"modal-dialog modal-notification"}
      overlayClassName={"modal-backdrop "}
      contentLabel="Notification Modal"
    >
      <div className="modal-content" aria-modal="true" id="modal-content-block">
        <div className="notification_header">
          <div className="title">Notification</div>
          {renderUI()}
        </div>

        <div className="notification_body">
          <div className="notification_item">
            <div className="noti_icon">
              <i className="fa fa-bell"></i>
            </div>
            <div className="noti_description">
              <div className="title">Launchday 1.4.0 update email sent</div>
              <div className="sub_title">
                Sent to all 1,851 subscribers over a 24 hour period
              </div>
              <small className="text_muted">2m ago</small>
            </div>
          </div>
          <div className="notification_item">
            <div className="noti_icon">
              <i className="fa fa-bell"></i>
            </div>
            <div className="noti_description">
              <div className="title">Launchday 1.4.0 update email sent</div>
              <div className="sub_title">
                Sent to all 1,851 subscribers over a 24 hour period
              </div>
              <small className="text_muted">2m ago</small>
            </div>
          </div>
          <div className="notification_item">
            <div className="noti_icon">
              <i className="fa fa-bell"></i>
            </div>
            <div className="noti_description">
              <div className="title">Launchday 1.4.0 update email sent</div>
              <div className="sub_title">
                Sent to all 1,851 subscribers over a 24 hour period
              </div>
              <small className="text_muted">2m ago</small>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Notification;
