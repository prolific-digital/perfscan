import React from "react";

const NoDataFound = (props) => {
  const { title } = props;
  return (
    <div className="noErrorWrapper">
      <p>{title || "No Record Found"}</p>
    </div>
  );
};

export default NoDataFound;
