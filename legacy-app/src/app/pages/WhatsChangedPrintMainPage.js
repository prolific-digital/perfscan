import React, { Suspense } from "react";
import * as _l from "lodash";
import WhatsChangedDataPrint from "./WhatsChangedDataPrint";

const WhatsChangedPrintMainPage = () => {
  const printButton = true;

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <WhatsChangedDataPrint printButton={printButton} />
      </Suspense>
    </div>
  );
};

export default WhatsChangedPrintMainPage;
