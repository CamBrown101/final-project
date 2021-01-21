import React, { useState, useEffect } from "react";
import "./Analytic.scss";
import { CanvasJSChart } from "canvasjs-react-charts";
import Axios from "axios";

export default function Analytics() {
  const getSalesbyDay = (days) => {
    const data = days;
    Axios.get("/api/analytics/gross-sales", { params: { days: data } }).then(
      (res) => {
        const temp = res.data.map((item, i) => {
          const date = new Date(item.timestamp).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          });
          return { label: date, y: parseInt(item.sum) };
        });
        console.log(temp);
        options1.data[0].dataPoints = [...temp];
        options1.title.text = "Gross Sales";
        setOption(options1);
      }
    );
  };

  const getLabourByDay = (days) => {
    const data = days;
    Axios.get("/api/analytics/labour", { params: { days: data } }).then(
      (res) => {
        const costPerShift = res.data.map((shift) => {
          const start = new Date(shift.punch_time).getTime() / 1000;
          const end = new Date(shift.clockouttime).getTime() / 1000;
          let hours = Math.abs(end - start) / 60 / 60;
          if (shift.clockouttime === null) hours = 0;
          return {
            date: new Date(shift.punch_time).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            }),
            cost: hours * shift.wage,
          };
        });
        const costPerDay = {};
        costPerShift.forEach((shift) => {
          if (!costPerDay[shift.date]) costPerDay[shift.date] = shift.cost;
          else costPerDay[shift.date] += shift.cost;
        });
        const temp = Object.keys(costPerDay).map((key) => {
          return {
            label: key,
            y: costPerDay[key],
          };
        });
        options1.data[0].dataPoints = [...temp];
        options1.title.text = "Labour Cost Last Week";
        setOption(options1);
      }
    );
  };

  const getItemSalesByDay = (days, top) => {
    const data = days;
    Axios.get("/api/analytics/sales", {
      params: { days: data },
    }).then((res) => {
      const dataEnd = top ? 10 : res.data.length;
      const temp = res.data.slice(dataEnd - 10, dataEnd).map((item) => {
        return { label: item.name, y: parseInt(item.sold) };
      });
      console.log(temp);
      options1.data[0].dataPoints = [...temp];
      options1.title.text = (top ? "Top " : "Bottom ") + "Ten Items Last Week";
      console.log(options1);
      setOption(options1);
    });
  };

  const Sales7Days = {
    animationEnabled: true,
    animationDuration: 2000,
    exportEnabled: true,
    theme: "dark2", //"light1", "dark1", "dark2"
    title: {
      text: "Item Sales By Day For The Last Week",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: [
          { x: 10, y: 71 },
          { x: 20, y: 55 },
          { x: 30, y: 50 },
          { x: 40, y: 65 },
          { x: 50, y: 71 },
          { x: 60, y: 68 },
          { x: 70, y: 38 },
          { x: 80, y: 92, indexLabel: "Highest" },
          { x: 90, y: 54 },
          { x: 100, y: 60 },
          { x: 110, y: 21 },
          { x: 120, y: 49 },
          { x: 130, y: 36 },
        ],
      },
    ],
  };
  const options1 = {
    animationEnabled: true,
    animationDuration: 2000,
    exportEnabled: true,
    theme: "dark2", //"light1", "dark1", "dark2"
    title: {
      text: "Item Sales",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: [
          { x: 10, y: 71 },
          { x: 20, y: 23 },
          { x: 30, y: 45 },
          { x: 40, y: 13 },
          { x: 50, y: 71 },
          { x: 60, y: 43 },
          { x: 70, y: 38 },
          { x: 80, y: 93, indexLabel: "Highest" },
          { x: 90, y: 54 },
          { x: 100, y: 60 },
          { x: 110, y: 21 },
          { x: 120, y: 49 },
          { x: 130, y: 36 },
        ],
      },
    ],
  };

  const [option, setOption] = useState({ ...options1 });
  const [key, setKey] = useState(1);
  return (
    <div className="analytic-container">
      <h1>Analytics</h1>
      <CanvasJSChart options={option} key={key} />
      <button
        className="options-button"
        onClick={() => {
          getSalesbyDay(8);
          setKey(2);
        }}
      >
        Sales last 7 days
      </button>
      <button
        className="options-button"
        onClick={() => {
          getLabourByDay(8);
          setKey(1);
        }}
      >
        Labour last 7 days
      </button>
      <button
        className="options-button"
        onClick={() => {
          getItemSalesByDay(7, true);
          setKey(3);
        }}
      >
        Top Item Sales last 7 days
      </button>
      <button
        className="options-button"
        onClick={() => {
          getItemSalesByDay(7, false);
          setKey(3);
        }}
      >
        Bottom Item Sales last 7 days
      </button>
    </div>
  );
}
