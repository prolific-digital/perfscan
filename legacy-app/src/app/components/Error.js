import React from "react";

function Error(props) {
  const { error } = props;
  return (
    <div className="error">
      <i className="fa fa-exclamation-triangle"></i>
      <div className="label">{error || "something went wrong"}</div>
    </div>
  );
}

export default Error;
