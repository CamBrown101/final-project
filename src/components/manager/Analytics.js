import React, { useState, useEffect } from 'react';
import './Analytic.scss';
import { CanvasJSChart } from 'canvasjs-react-charts';
import Axios from 'axios';

export default function Analytics() {
  const getSalesbyDay = (days) => {
    const data = days;
    Axios.get('/api/analytics/sales', { params: { days: data } }).then(
      (res) => {
        console.log(res.data);
      }
    );
  };
  const Sales7Days = {
    animationEnabled: true,
    animationDuration: 2000,
    exportEnabled: true,
    theme: 'dark2', //"light1", "dark1", "dark2"
    title: {
      text: 'Item Sales By Day For The Last Week',
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: 'column', //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        indexLabelPlacement: 'outside',
        dataPoints: [
          { x: 10, y: 71 },
          { x: 20, y: 55 },
          { x: 30, y: 50 },
          { x: 40, y: 65 },
          { x: 50, y: 71 },
          { x: 60, y: 68 },
          { x: 70, y: 38 },
          { x: 80, y: 92, indexLabel: 'Highest' },
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
    theme: 'dark2', //"light1", "dark1", "dark2"
    title: {
      text: 'Item Sales',
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: 'column', //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: '#5A5757',
        indexLabelPlacement: 'outside',
        dataPoints: [
          { x: 10, y: 71 },
          { x: 20, y: 23 },
          { x: 30, y: 45 },
          { x: 40, y: 13 },
          { x: 50, y: 71 },
          { x: 60, y: 43 },
          { x: 70, y: 38 },
          { x: 80, y: 93, indexLabel: 'Highest' },
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
          setOption({ ...Sales7Days });
          setKey(2);
          getSalesbyDay(7);
        }}>
        Sales last 7 days
      </button>
      <button
        className="options-button"
        onClick={() => {
          setOption({ ...options1 });
          setKey(1);
        }}>
        Sales last 7 days
      </button>
    </div>
  );
}
