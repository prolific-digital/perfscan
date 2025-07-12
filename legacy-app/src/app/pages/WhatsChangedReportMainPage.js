import React, {  Suspense } from "react";
import * as _l from "lodash";
import WhatsChangedReport from "./WhatChangedReport";
import { useLocation } from "react-router-dom";

const WhatsChangedReportMainPage = () => {

  const location = useLocation();

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <WhatsChangedReport filters={location.state}/>
      </Suspense>
    </div>
  );
};

export default WhatsChangedReportMainPage;
