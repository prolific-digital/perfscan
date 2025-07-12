import React from "react";
import { Table } from "reactstrap";
import { sysKeys } from "../../typeCodes";

const SystemSpecificReport = (props) => {
  const { data = {} } = props;

  const renderTable = (datakeys) => {
    let res = [];
    const flatObj = (data) => {
      for (var key in data) {
        if (typeof data[key] === "object") {
          flatObj(data[key]);
        } else if (data.hasOwnProperty(key)) {
          res.push({ key, value: data[key] || "--" });
        }
      }
    };
    flatObj(datakeys);
    let dataRender = res.map((item) => {
      return (
        <tr key={item.key}>
          <td>{sysKeys[item.key]}</td>
          <td>{item.value}</td>
        </tr>
      );
    });
    return dataRender;
  };
  return (
    <div className="topjobs-conatiner">
      <div className="detail-analysis">
        <p>Specifications</p>
      </div>
      <Table>
        <thead>
          <tr>
            <th colSpan={2} style={{backgroundColor: "deepskyblue"}} align="center">Frame Specs</th> 
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).length === 0 ? (
            <tr>
              <td colSpan={2}>No Data Found</td>
            </tr>
          ) : (
            Object.keys(data).length > 0 && renderTable(data["frame"])
          )}
        </tbody>
      </Table>
      <Table>
        <thead>
          <tr>
            <th colSpan={2} style={{backgroundColor: "deepskyblue"}} align="center">LPAR Specs</th> 
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).length === 0 ? (
            <tr>
              <td colSpan={2}>No Data Found</td>
            </tr>
          ) : (
            Object.keys(data).length > 0 && renderTable(data["lpar"])
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default React.memo(SystemSpecificReport);
