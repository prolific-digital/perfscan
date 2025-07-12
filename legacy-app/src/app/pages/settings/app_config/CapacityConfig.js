import React, { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { useSelector, useDispatch } from "react-redux";
import "../../../../../node_modules/primeflex/primeflex.css";
import * as _ from "lodash";

import {
  getCapacityConfig,
  fetchAsyncCPConfig,
  updateCPConfig,
  updateConfig,
} from "../../../../store/slices/appconfig/AppConfigSlice";
import Editable from "../../../components/common/Editable";

const CapacityConfig = () => {
  const [CPConfig, setCPConfig] = useState(null);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("Default Text");
  const cpConfigData = useSelector(getCapacityConfig);
  const updateConfigData = useSelector(updateConfig);

  const dispatch = useDispatch();
  const toast = useRef(null);

  /*const fetchCPConfig = async () => {
        try {
          const response = await fetchAsyncCPConfig();
          if (response.status === 200) {
            const data = response.data.data || [];
            if (data.length) {
              setCPConfig(data);
            }
          }
        } catch (error) { }
    };
    */
  useEffect(() => {
    dispatch(fetchAsyncCPConfig());
  }, [dispatch]);

  const save = (val, id) => {
    const qd = {
      config_value: val,
      // app_config_id: id,
    };
    dispatch(updateCPConfig({ id, qd }));
  };

  useEffect(() => {
    //need to remove this code
    if (
      !updateConfigData.loading &&
      updateConfigData.data &&
      updateConfigData.data.status === 200
    ) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Settings Saved",
      });
      return;
    }
    dispatch(fetchAsyncCPConfig());

    //updated logic after the text is updated
    // if(!updateConfigData.loading && updateConfigData.data && updateConfigData.data.status === 200){
    //     toast.current.show({ severity: 'success', summary: 'Success', detail: 'Settings Saved' });
    //     dispatch(fetchAsyncCPConfig());
    //     return;
    // }
    // if(!updateConfigData?.loading && updateConfigData?.error && updateConfigData?.data?.length < 1){
    //     toast.current.show({ severity: 'error', summary: 'Error', detail: updateConfigData?.error });
    //     return;
    // }
  }, [updateConfigData]);

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="surface-0">
        <div className="font-medium text-3xl text-900 mb-3">
          Capacity Planning Settings
        </div>
        <div className="text-500 mb-5">
          These settings are used by Capacity Planning screen
        </div>
        <ul className="list-none p-0 m-0">
          {cpConfigData &&
            !cpConfigData.loading &&
            cpConfigData.data.map((d, index) => {
              return (
                <li
                  className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap"
                  key={index}
                >
                  <div className="text-500 w-6 md:w-4 font-medium">
                    {d.config_key_desc}
                  </div>
                  <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">
                    <Editable
                      text={d.config_value}
                      onSetText={(e) => save(e, d.app_config_id)}
                    />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default CapacityConfig;
