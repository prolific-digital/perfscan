import React, { useEffect, useState } from "react";
import SettingHeader from "../SectionHeader"
import Loading from "../Loading"
import Error from "../Error";
import { confirmDialog } from "primereact/confirmdialog";


const Branding = () => {
    return (
        <div>
          <SettingHeader
          iconClass={"fa fa-line-chart"}
          title={"Manage Branding"}
          subTitle={""}
        />
        </div>
      );
}

export default Branding;