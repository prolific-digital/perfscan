import * as _ from "lodash";


import React, { useEffect, useState } from "react";
import { topJobsPieChartSub } from "../../../../pages/GraphQL/Subscriptions/TopJobsSubscriptions";
import CanvasJSReact from "../../../../../scripts/canvasjs.react";

import { useSubscription } from "@apollo/client";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SynciosJobType = ({ pieChartWholeDayData, selectedSystem, id }) => {
  const [checkData, setCheckData] = useState(false);
  const [chartData, setChartData] = useState([]);
  const piechartSubData = useSubscription(topJobsPieChartSub, {
    variables: { topJobsPieDataId: +id },
  });

  useEffect(() => {
    if (pieChartWholeDayData && !pieChartWholeDayData?.loading && pieChartWholeDayData?.data) {
      if (
        !_.isEmpty(pieChartWholeDayData?.data?.topJobsPieData) &&
        !_.isEmpty(pieChartWholeDayData?.data?.topJobsPieData?.syncios) &&
        pieChartWholeDayData?.data?.topJobsPieData?.syncios
      ) {
        setCheckData(true);
        setChartData(pieChartWholeDayData?.data?.topJobsPieData?.syncios);
      } else {
        setCheckData(false);
      }
    }
  }, [pieChartWholeDayData]);

  useEffect(() => {
    if (piechartSubData && !piechartSubData?.loading && piechartSubData?.data) {
      // const updatedArr = setTimeout(() => {
        if (
          !piechartSubData?.loading &&
          typeof piechartSubData === "object" &&
          piechartSubData?.data?.topJobsPieData?.syncios?.length &&
          chartData?.length
        ) {
          setChartData((preVal) => {
            const filteredEle = preVal?.filter(
              (ele) =>
                ele?.jobname !==
                  piechartSubData?.data?.topJobsPieData?.syncios[0]?.jobname &&
                ele?.jobname !==
                  piechartSubData?.data?.topJobsPieData?.syncios[1]?.jobname &&
                ele?.jobname !==
                  piechartSubData?.data?.topJobsPieData?.syncios[2]?.jobname
            );
            return [
              ...filteredEle,
              ...piechartSubData?.data?.topJobsPieData?.syncios,
            ];
          });
        }
      // }, 3000);

      // return () => {
      //   clearTimeout(updatedArr);
      // };
    }
  }, [piechartSubData]);

  const options = {
    exportEnabled: true,
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Percentage Breakdown ",
      fontSize: 15,
    },
    legend: {
      verticalAlign: "center",
      horizontalAlign: "left",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y} %",
        showInLegend: "true",
        legendText: "{label} - {y}%",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: chartData.map(({ total, jobname }) => ({
          y: +total,
          label: jobname,
        })),
      },
    ],
  };

  return (
    <div>
      {pieChartWholeDayData?.loading &&
        _.isEmpty(pieChartWholeDayData?.data) && (
          <div style={{ textAlign: "center" }}>Loading...</div>
        )}

      {!pieChartWholeDayData.loading &&
        !_.isEmpty(pieChartWholeDayData?.data) &&
        checkData && <CanvasJSChart options={options} title={"CPU ms"} />}

      {!pieChartWholeDayData?.loading && !checkData && (
        <div style={{ textAlign: "center" }}>
          <img
            style={{ height: "50%", width: "50%" }}
            src="/noData.webp"
            alt="No data available for Sync-IOs Job Chart"
          />
        </div>
      )}
    </div>
  );
};

export default SynciosJobType;
