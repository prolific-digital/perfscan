import React, { Suspense} from "react";
import * as _l from "lodash";
import HistoricalDataReports from "./HistoricalDataReports";
import { useLocation } from "react-router-dom";
import { BeatLoader } from "react-spinners";

 function HistoricalDataReportMainPage()  {
  
const location = useLocation();

return (
    <div>
      <div className="filter_option">
          <Suspense fallback={<BeatLoader color="#366bd6"/>}>
               <HistoricalDataReports filters={location.state}/>
          </Suspense>
      </div>
    </div>
  )
}

export default HistoricalDataReportMainPage
