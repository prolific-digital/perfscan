import React, { useState } from "react";
import Modal from "react-modal";
import { Button } from "reactstrap";

const EditGroupModal = (props) => {
  const { isEditGroup, onModalClose } = props;
  const [groupValue, setGroupValue] = useState("");

  const lettersOnly = (value) => {
    const regex = /[^\w\s]/gi;
    let val = value.replace(regex, "");
    setGroupValue(val);
  };

  return (
    <Modal
      isOpen={isEditGroup}
      onRequestClose={onModalClose}
      className={"modal-dialog modal-sm modal-edit-group"}
      overlayClassName={"modal-backdrop "}
      contentLabel="Edit group Modal"
    >
      <div className="modal-content" aria-modal="true" id="modal-content-block">
        <div className="modal_header">
          <div className="modal_title">Add/Edit Group</div>
          <Button
            className="btn btn-icon btn-circle btn-icon-secondary"
            onClick={onModalClose}
          >
            <i className="fa fa-close"></i>
          </Button>
        </div>

        <div className="modal_body">
          <div className="edit-group-form">
            <div className="form-group">
              <label className="label">Group Title</label>
              <input
                className="form-control"
                placeholder="Enter your group title"
                onChange={(e) => lettersOnly(e.target.value)}
                value={groupValue}
                defaultValue={groupValue}
              />
            </div>
            <button className="btn btn-primary mt-3 btn-center">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditGroupModal;
