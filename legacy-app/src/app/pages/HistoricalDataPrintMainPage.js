import HistoricalDataPrint from "./HistoricalDataPrint";
import React, { Suspense } from "react";

const HistoricalDataPrintMainPage = () => {
  const printButton = true;

  return (
    <div>
      
      <div className="filter_option">
        <Suspense fallback={<div>Loading...</div>}>
          <HistoricalDataPrint printButton={printButton} />
        </Suspense>
      </div>
    </div>
  );
};

export default HistoricalDataPrintMainPage;
