import React, {  Suspense } from "react";
import * as _l from "lodash";
import PeriodVsPeriodPrint from "./PeriodVsPeriodPrint";
import GridLoader from "react-spinners/GridLoader";

function PeriodVsPeriodPrintMainPage() {

  return (
    <div className="performance_wrapper">
      <div className="filter_option">
        <Suspense fallback={<div><GridLoader color="#366bd6"/> </div>}>
          <PeriodVsPeriodPrint />
        </Suspense>
      </div>
    </div>
  );
}

export default PeriodVsPeriodPrintMainPage;
