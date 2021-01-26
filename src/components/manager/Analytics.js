import React, { useState } from "react";
import "./Analytic.scss";
import { CanvasJSChart } from "canvasjs-react-charts";
import Axios from "axios";
import ManagerNav from "./ManagerNav";

export default function Analytics() {
  //Generates formatted Sales by Day to feed into graph
  const getSalesbyDay = (days) => {
    const data = days;
    return Axios.get("/api/analytics/gross-sales", {
      params: { days: data },
    }).then((res) => {
      const temp = res.data.map((item, i) => {
        const date = new Date(item.timestamp).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        });
        return { label: date, y: parseInt(item.sum) };
      });
      const grossSales = JSON.parse(JSON.stringify(options1));
      grossSales.data[0].dataPoints = [...temp];
      grossSales.title.text = "Gross Sales";
      return grossSales;
    });
  };
  let grossSales;
  getSalesbyDay(8).then((res) => {
    grossSales = res;
  });

  //Generates formatted Labour by Day to feed into graph
  const getLabourByDay = (days) => {
    const data = days;
    return Axios.get("/api/analytics/labour", { params: { days: data } }).then(
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
        const labour = JSON.parse(JSON.stringify(options1));
        labour.data[0].dataPoints = [...temp];
        labour.title.text = "Labour Cost Last Week";
        return labour;
      }
    );
  };
  let labour;
  let netSales;

  //gets net sales for the day
  getLabourByDay(8).then((res) => {
    labour = res;
    netSales = JSON.parse(JSON.stringify(options1));
    //eslint-disable-next-line
    const temp = grossSales.data[0].dataPoints.map((day) => {
      for (const lday of labour.data[0].dataPoints) {
        if (day.label === lday.label) {
          const temp = { label: day.label, y: day.y - lday.y };
          return temp;
        } else return day;
      }
    });
    netSales.data[0].dataPoints = temp;
    netSales.title.text = "Net Sales Last Week";
  });

  //Generates formatted Item Sales by Day to feed into graph
  const getItemSalesByDay = (days, top) => {
    const data = days;
    return Axios.get("/api/analytics/sales", {
      params: { days: data },
    }).then((res) => {
      const dataEnd = top ? 10 : res.data.length;
      const temp = res.data.slice(dataEnd - 10, dataEnd).map((item) => {
        return { label: item.name, y: parseInt(item.sold) };
      });
      const sales = JSON.parse(JSON.stringify(options1));
      sales.data[0].dataPoints = [...temp];
      sales.title.text = (top ? "Top " : "Bottom ") + "Ten Items Last Week";
      return sales;
    });
  };

  //Generates formatted Category Sales by Day to feed into graph
  const getCategorySalesByDay = (days, food) => {
    const data = days;
    return Axios.get("/api/analytics/sales", {
      params: { days: data },
    }).then((res) => {
      const temp = res.data
        .filter((item) => item.is_food === food)
        .slice(0, 10)
        .map((item) => {
          return { label: item.name, y: parseInt(item.sold) };
        });
      const sales = JSON.parse(JSON.stringify(options1));
      sales.data[0].dataPoints = [...temp];
      sales.title.text = `Top Ten ${food ? "Food" : "Drink"} Items Last Week`;
      return sales;
    });
  };

  let topSales;
  getItemSalesByDay(8, true).then((res) => {
    topSales = res;
  });

  let bottomSales;
  getItemSalesByDay(8, false).then((res) => {
    bottomSales = res;
  });

  let topFood;
  getCategorySalesByDay(8, true).then((res) => {
    topFood = res;
  });

  let topDrink;
  getCategorySalesByDay(8, false).then((res) => {
    topDrink = res;
  });

  const options1 = {
    animationEnabled: true,
    animationDuration: 2000,
    height: 750,
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
      },
    ],
  };

  const [option, setOption] = useState({ ...options1 });
  const [key, setKey] = useState(1);

  return (
    <div className="analytic-container">
      <div className="analytic-buttons">
        <button
          className="options-button"
          onClick={() => {
            setOption(grossSales);
            setKey(2);
          }}
        >
          Sales last 7 days
        </button>
        <button
          className="options-button"
          onClick={() => {
            setOption(labour);
            setKey(1);
          }}
        >
          Labour last 7 days
        </button>
        <button
          className="options-button"
          onClick={() => {
            setOption(topSales);
            setKey(3);
          }}
        >
          Top Item Sales last 7 days
        </button>
        <button
          className="options-button"
          onClick={() => {
            setOption(bottomSales);
            setKey(4);
          }}
        >
          Bottom Item Sales last 7 days
        </button>
        <button
          className="options-button"
          onClick={() => {
            setOption(netSales);
            setKey(5);
          }}
        >
          Net Sales
        </button>
        <button
          className="options-button"
          onClick={() => {
            setOption(topFood);
            setKey(6);
          }}
        >
          Top Food Items
        </button>
        <button
          className="options-button"
          onClick={() => {
            setOption(topDrink);
            setKey(7);
          }}
        >
          Top Drink Items
        </button>
      </div>
      <div className="chart-container">
        <CanvasJSChart options={option} key={key} />
      </div>
      <ManagerNav />
    </div>
  );
}
