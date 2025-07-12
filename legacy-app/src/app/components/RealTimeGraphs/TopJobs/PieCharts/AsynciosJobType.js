import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import CanvasJSReact from "../../../../../scripts/canvasjs.react";
import { topJobsPieChartSub } from "../../../../pages/GraphQL/Subscriptions/TopJobsSubscriptions";

import { useSubscription } from "@apollo/client";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const AsynciosJobType = ({ pieChartWholeDayData, selectedSystem, id}) => {
  const [checkData, setCheckData] = useState(false);
  const [chartData, setChartData] = useState([]);
  const piechartSubData = useSubscription(topJobsPieChartSub, {
    variables: { topJobsPieDataId: +id },
  });

  useEffect(() => {
    if (
      pieChartWholeDayData &&
      !pieChartWholeDayData?.loading &&
      pieChartWholeDayData?.data
    ) {
      if (
        !_.isEmpty(pieChartWholeDayData?.data?.topJobsPieData) &&
        !_.isEmpty(pieChartWholeDayData?.data?.topJobsPieData?.asyncios) &&
        pieChartWholeDayData?.data?.topJobsPieData?.asyncios
      ) {
        setCheckData(true);
        setChartData(pieChartWholeDayData?.data?.topJobsPieData?.asyncios);
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
          piechartSubData?.data?.topJobsPieData?.asyncios?.length &&
          chartData?.length
        ) {
          setChartData((preVal) => {
            const filteredEle = preVal?.filter(
              (ele) =>
                ele?.jobname !==
                  piechartSubData?.data?.topJobsPieData?.asyncios[0]?.jobname &&
                ele?.jobname !==
                  piechartSubData?.data?.topJobsPieData?.asyncios[1]?.jobname &&
                ele?.jobname !==
                  piechartSubData?.data?.topJobsPieData?.asyncios[2]?.jobname
            );
            return [
              ...filteredEle,
              ...piechartSubData?.data?.topJobsPieData?.asyncios,
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

      {!pieChartWholeDayData?.loading &&
        !_.isEmpty(pieChartWholeDayData?.data) &&
        checkData && <CanvasJSChart options={options} title={"CPU ms"} />}

      {!pieChartWholeDayData?.loading && !checkData && (
        <div style={{ textAlign: "center" }}>
          <img
            style={{ height: "50%", width: "50%" }}
            src="/noData.webp"
            alt="No data available for Async-IOs Job Chart"
          />
        </div>
      )}
    </div>
  );
};

export default AsynciosJobType;
