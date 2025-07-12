import React, { useState, useEffect, useCallback } from "react";
import SectionHeader from "../../components/SectionHeader";
import SystemFilter from "./SystemFilter";
import HistoricalDateFilter from "./HistoricalDateFilter";
import {
  getParametersFromLocalStorage,
  saveParametersIntoLocalStorage,
} from "../../../helpers/commonHelper";
import { useDispatch } from "react-redux";
import {
  historicalSaveFilter,
  uniqueId,
} from "../../../store/slices/searchFilter";
import { Link } from "react-router-dom";
import {
  generateNewReport,
  getSaveNewReportData,
  saveExistingReport,
  getSaveExistingReportData,
  generateUuid,
  getUuidData,
} from "../../../store/slices/reports/SaveNewReport/SaveNewReport";
import { useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import useReportData from "../../../hooks/useSaveReportDataHistorical";
import useSaveExistingReportDataHistoricalData from "../../../hooks/useSaveExistingReportHistoricalData";
import { API_URL } from "../../../typeCodes";
import useQueryDataHistoricalPdfReport from "../../../hooks/useQueryDataHistoricalPdfReport";

const HistoricalReportFilter = ({
  dateTab,
  runReport,
  loadingReport,
  changeReport,
}) => {
  const [toggleBuildParameter, setToggleBuildParameter] = useState(true);
  const [isSaveReport, setIsSaveReport] = useState(false);
  const [saveReport, setSaveReport] = useState({
    filename: "",
    saveReport: false,
  });
  const [dateTabChange, setDateTabChange] = useState(dateTab);
  // const [runReportLoader, setRunReportLoader] = useState(false);
  const [saveReportMessage, setSaveReportMessage] = useState(false);
  const [saveReportMessage2, setSaveReportMessage2] = useState(false);
  const [toggleSaveReportButton, setToggleSaveReportButton] = useState(false);
  const [disableCheckBox, setDisableCheckBox] = useState(false);
  const savedReport = useSelector(getSaveNewReportData);
  const savedExistingReportData = useSelector(getSaveExistingReportData);
  const uuid = useSelector(getUuidData);
  const dispatch = useDispatch();

  const qdRpt = useReportData();
  const qdExistingReport = useSaveExistingReportDataHistoricalData();
  const toast = React.useRef(null);

  const qdPdf = useQueryDataHistoricalPdfReport();
  const searchParams = new URLSearchParams(qdPdf);
  let query = searchParams.toString();
  const pdfUrl = API_URL + "api/renderpdf?";

  const saveReportCheckHandler = (e) => {
    let report = "";
    if (e.target.id === "reportname" && e.target.value !== "") {
      setSaveReportMessage(false);
      setSaveReportMessage2(false);
    }

    if (e.target.id === "savereport" && !e.target.checked) {
      setSaveReportMessage(false);
      setSaveReportMessage2(false);
    }

    if (e.target.id === "reportname") {
      report = { ...saveReport, filename: e.target.value };
      setSaveReport(report);
    }
    if (e.target.id === "savereport") {
      report = { ...saveReport, saveReport: e.target.checked };
      setSaveReport(report);
      setIsSaveReport(e.target.checked);
    }
  };

  const showToast = (type, summary, details) => {
    toast.current.show({
      severity: type || "success",
      summary: summary || "Success Message",
      detail: details || "Message Content",
      life: 3000,
    });
  };

  const saveNewReportAndRunReport = () => {
    if (saveReport.filename === "" && saveReport.saveReport) {
      setSaveReportMessage(true);
    }
    dispatch(generateUuid());
    if (!isSaveReport) {
      setIsSaveReport(false);
      return runReport();
    }
  };

  useEffect(() => {
    if (!uuid?.loading && uuid.data.uniqueid) {
      dispatch(generateNewReport(qdRpt));
    }
  }, [uuid]);

  const saveExistingReportHandler = () => {
    if (saveReport.filename === "" && saveReport.saveReport) {
      setSaveReportMessage2(true);
    }
    if (
      savedReport?.loading === false &&
      +savedReport?.data?.status === 201 &&
      isSaveReport &&
      saveReport.filename
    ) {
      return dispatch(saveExistingReport(qdExistingReport));
    }
  };

  useEffect(() => {
    if (!loadingReport) {
      setToggleSaveReportButton(true);
      setDisableCheckBox(false);
      setIsSaveReport(false);
      setSaveReport((preVal) => {
        return { ...preVal, filename: "", saveReport: false };
      });
    }
  }, [loadingReport]);

  useEffect(() => {
    if (!isSaveReport) {
      setIsSaveReport(false);
      setSaveReport((preVal) => {
        return { ...preVal, filename: "", saveReport: false };
      });
    }
  }, [isSaveReport]);

  const handleReRunReportChange = useCallback(() => {
    changeReport();
  }, [loadingReport]);

  useEffect(() => {
    if (
      !savedReport.loading &&
      !Object.keys(savedReport.data).length &&
      !savedReport.error
    ) {
      return;
    }
    if (
      savedReport?.loading === false &&
      +savedReport?.data?.status === 201 &&
      saveReport.filename
    ) {
      setToggleSaveReportButton(false);
      setDisableCheckBox(true);
      showToast(
        "success",
        "Report Created",
        `Report has been created successfully`
      );
      return runReport();
    }
    if (savedReport?.loading === false && +savedReport?.data?.status === 200) {
      return showToast(
        "error",
        "Report can not be added.",
        savedReport?.data?.data || savedReport?.data?.message
      );
    }
  }, [savedReport]);

  useEffect(() => {
    if (
      !savedReport.loading &&
      !Object.keys(savedReport.data).length &&
      !savedReport.error
    ) {
      return;
    }
    if (
      savedExistingReportData?.loading === false &&
      +savedExistingReportData?.data?.status === 200
    ) {
      setDisableCheckBox(true);
      setToggleSaveReportButton(false);
      return showToast(
        "success",
        "Report Saved",
        "Report has been saved successfully"
      );
    }
    if (
      savedExistingReportData?.loading === false &&
      +savedExistingReportData?.data?.status === 409
    ) {
      return showToast(
        "error",
        "Report can not be added.",
        savedExistingReportData?.data?.data ||
          savedExistingReportData?.data?.message
      );
    }
    if (
      savedExistingReportData?.loading === false &&
      +savedExistingReportData?.data?.status === 500
    ) {
      return showToast(
        "error",
        "Report can not be added.",
        savedExistingReportData?.data?.data ||
          savedExistingReportData?.data?.message
      );
    }
  }, [savedExistingReportData]);

  useEffect(() => {
    const identifier = setTimeout(() => {
      dispatch(historicalSaveFilter(saveReport));
      saveParametersIntoLocalStorage("HistoricalSaveFilter", saveReport);
    }, 600);

    return () => {
      clearTimeout(identifier);
    };
  }, [saveReport]);

  useEffect(() => {
    if (!uuid?.loading && uuid.data.uniqueid) {
      dispatch(uniqueId(uuid));
      saveParametersIntoLocalStorage("uniqueid", uuid);
    }
  }, [uuid.data.uniqueid]);

  return (
    <div className="performance_wrapper">
      <SectionHeader
        title={"Historical Data Analysis"}
        subTitle="Performance Insights"
      />
      <div className="build_parameter_wrapper">
        <button
          className="btn btn-primary"
          onClick={() => setToggleBuildParameter(!toggleBuildParameter)}
        >
          {toggleBuildParameter ? "Hide" : "Show"} Parameters
        </button>
        {toggleBuildParameter && (
          <div className="parametes_card_wrap">
            <SystemFilter
              reportChange={handleReRunReportChange}
              loadingReport={loadingReport}
            />
            <HistoricalDateFilter
              dateTabChange={dateTabChange}
              reportChange={handleReRunReportChange}
              loadingReport={loadingReport}
            />
            <div>
              <div
                className="form-group checkbox-wrapper"
                style={{
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  whiteSpace: "nowrap",
                }}
              >
                <input
                  className="checkbox-item"
                  type="checkbox"
                  id="savereport"
                  name="savereport"
                  checked={isSaveReport}
                  onChange={saveReportCheckHandler}
                  disabled={disableCheckBox}
                />
                <label className="label" htmlFor="savereport">
                  Do you want to save this report?
                </label>
                {isSaveReport && (
                  <div className="show-field">
                    <input
                      name="reportname"
                      id="reportname"
                      className="form-control"
                      placeholder="Enter Report name"
                      onChange={saveReportCheckHandler}
                      disabled={disableCheckBox}
                      required={isSaveReport}
                    />
                    {saveReportMessage && (
                      <p style={{ color: "red" }}>
                        Please enter the report name and then run the report.
                      </p>
                    )}
                    {saveReportMessage2 && (
                      <p style={{ color: "red" }}>
                        Please enter the report name and then click on save
                        report
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div style={{ display: "flex" }}>
                <button
                  className="btn btn-primary"
                  disabled={loadingReport}
                  onClick={saveNewReportAndRunReport}
                >
                  Run Report
                </button>
                {loadingReport &&
                  isSaveReport &&
                  toggleSaveReportButton &&
                  +savedReport?.data?.status === 201 && (
                    <button
                      className="btn btn-primary"
                      style={{ marginLeft: "5px" }}
                      onClick={saveExistingReportHandler}
                    >
                      Save Report
                    </button>
                  )}
              </div>
              {loadingReport && (
                <div className="settion-header-right">
                  <a href={pdfUrl + query} target="_blank" rel="noreferrer">
                    <button type="btn" className="btn btn-primary">
                      <i className="fa fa-print"></i>Print
                    </button>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Toast ref={toast} position="top-right"></Toast>
    </div>
  );
};

export default React.memo(HistoricalReportFilter);
