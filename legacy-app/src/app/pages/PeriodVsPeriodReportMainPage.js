import React, { Suspense } from "react";
import * as _l from "lodash";
import PeriodVsPeriodReport from "./PeriodVsPeriodReport";
import { useLocation } from "react-router-dom";


function PeriodVsPeriodReportMainPage() {

  const location = useLocation();

  return (
    <div className="performance_wrapper">
      <div className="filter_option">
        <Suspense fallback={<div>Loading...</div>}>
          <PeriodVsPeriodReport filters={location.state} />
        </Suspense>
      </div>
    </div>
  );
}

export default PeriodVsPeriodReportMainPage;
