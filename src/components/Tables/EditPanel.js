import { useState } from 'react';
import './EditPanel.scss';
import axios from 'axios';
import TableInfo from './TableInfo';

export default function EditPanel(props) {
  const [seats, setSeats] = useState({
    numberOfSeats: 1,
  });

  const seatsChange = (event) => {
    const seatsNum = parseInt(event.target.value);
    setSeats({
      ...seats,
      numberOfSeats: seatsNum,
    });
  };

  const addTable = (event) => {
    event.preventDefault();
    const URL = `/api/layout/`;
    const data = {
      number_of_seats: seats.numberOfSeats,
    };
    console.log(data);
    const promise = axios
      .post(URL, data)
      .then((response) => {
        //get updated list of tables and update state
        const promise = axios
          .get(URL)
          .then((response) => {
            props.setTables({
              ...props.tables,
              layout: response.data,
            });
          })
          .catch(function (error) {
            console.log('Layout Update Failed');
          });

        return promise;
      })
      .catch(function (error) {
        console.log('New table failed');
      });

    return promise;
  };

  const resetTables = () => {
    const URL = `/api/layout/reset`;
    const promise = axios
      .delete(URL)
      .then((response) => {
        console.log(response);
        const tables = [];
        console.log(tables);

        props.setTables({
          ...props.tables,
          layout: tables,
        });
        //reset psql id
        const promise = axios
          .delete('/api/layout/counter')
          .then((response) => {
            console.log(response);
          })
          .catch(function (error) {
            console.log('Reset counter failed');
          });

        return promise;
      })
      .catch(function (error) {
        console.log('Reset layout failed');
      });

    return promise;
  };
  const grid = (event) => {
    const gridValue = parseInt(event.target.value);
    props.setTables({
      ...props.tables,
      grid: gridValue,
    });
  };
  return (
    <div className="edit-panel">
      {props.tables.edit ? (
        <>
          <h1>Edit Floor Layout</h1>

          <form className="edit-form">
            <div onClick={addTable} className="add-table-button">
              Add Table
            </div>
            <select
              required
              onChange={seatsChange}
              name="seats"
              className="seats-change-button"
            >
              <option value="1">Seats: 1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="5">6</option>
            </select>
            <select onChange={grid} name="grid" className="grid-size-select">
              <option value="1">Grid Size 1</option>
              <option value="5">Grid Size 5</option>
              <option value="10">Grid Size 10</option>
              <option value="25">Grid Size 25</option>
              <option value="50">Grid Size 50</option>
            </select>
            <div onClick={resetTables} className="edit-layout-button">
              Reset All
            </div>
          </form>
        </>
      ) : null}

      {props.tables.edit ? (
        <>
          {props.tableInfo.table ? (
            <TableInfo
              tables={props.tables}
              setTables={props.setTables}
              tableInfo={props.tableInfo}
              setTableInfo={props.setTableInfo}
              selectValue={props.selectValue}
              setSelectValue={props.setSelectValue}
            ></TableInfo>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
