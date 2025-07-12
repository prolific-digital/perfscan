import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoader = ({ loading }) => {
  return (
    loading && (
      <div style={{marginRight:"1rem"}}>
        <div className="skeleton-box">
          <Skeleton height={80} width={130} />
        </div>
      </div>
    )
  );
};

export default React.memo(SkeletonLoader);
