import React, { useEffect, useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { useSelector, useDispatch } from "react-redux";
import "../../../../../node_modules/primeflex/primeflex.css";
import * as _ from "lodash";

import {
  getGlobalConfig,
  fetchAsyncGlobalConfig,
  updateGlobalConfig,
  updateGlobalConfigData,
} from "../../../../store/slices/appconfig/AppConfigSlice";
import Editable from "../../../components/common/Editable";

const GlobalConfig = () => {
  const [CPConfig, setCPConfig] = useState(null);
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("Default Text");
  const globalConfigData = useSelector(getGlobalConfig);
  const updateConfigData = useSelector(updateGlobalConfigData);
  const toggleValue = [{ config_value: "ON" }, { config_value: "OFF" }];

  const dispatch = useDispatch();
  const toast = useRef(null);

  useEffect(() => {
    dispatch(fetchAsyncGlobalConfig());
  }, [dispatch]);

  const save = (val, id) => {
    const qd = {
      config_value: val.config_value === 'ON' ? "true" : "false",
      config_key: "min_max_toggle",
      config_type: "global",
      config_sub_type: "GLOBAL",
    };
    dispatch(updateGlobalConfig({ id, qd }));
    return;
  };

  useEffect(() => {
    if (
      !updateConfigData?.loading &&
      updateConfigData?.data?.status === 200
    ) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Settings Saved",
      });
      dispatch(fetchAsyncGlobalConfig());
      return;
    }
    if (
      !updateConfigData?.loading &&
      updateConfigData?.error &&
      updateConfigData?.data?.length < 1
    ) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: updateConfigData?.error,
      });
      // dispatch(fetchAsyncGlobalConfig());
      return;
    }
  }, [updateConfigData]);

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div className="surface-0">
        <div className="font-medium text-3xl text-900 mb-3">
          Global Configuration Settings
        </div>
        <ul className="list-none p-0 m-0">
          {/* {globalConfigData && !globalConfigData.loading && globalConfigData.data.map((d, index)=> { */}
          {/* return ( */}
          <li className="flex align-items-center py-3 px-2 border-top-1 border-300 flex-wrap">
            <div className="text-500 w-6 md:w-4 font-medium">
              Min/Max Data Percentage of Change
            </div>
            <div className="text-900 w-full md:w-6 md:flex-order-0 flex-order-1">
              <Editable
                text={
                  globalConfigData?.data[1]?.config_value === "true"
                    ? "ON"
                    : "OFF"
                }
                onSetText={(e) => save(e, 6)}
                dropDown={true}
                toggleValue={toggleValue}
              />
            </div>
          </li>
          {/* ) */}
          {/* })} */}
        </ul>
      </div>
    </>
  );
};

export default GlobalConfig;
