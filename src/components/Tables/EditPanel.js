import { useState } from 'react';
import './EditPanel.scss';
import axios from 'axios';
import TableInfo from './TableInfo';
import Grid from '../../img/icons/grid.png';
import AddIcon from '../../img/icons/pluslight.png';
import Delete2 from '../../img/icons/delete2.png';

export default function EditPanel(props) {
  const [grid, setGrid] = useState({
    grid1: true,
    grid5: false,
    grid10: false,
    grid25: false,
    grid50: false,
    bgActive: '#4ba99a',
    bgInActive: '#2c2636',
  });
  const addTable = (event) => {
    event.preventDefault();
    const URL = `/api/layout/`;
    const data = {
      number_of_seats: 1,
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
  const gridSize = (size) => {
    const gridValue = size;
    props.setTables({
      ...props.tables,
      grid: gridValue,
    });
  };

  const grid1 = () => {
    gridSize(1);
    setGrid({
      ...grid,
      grid1: true,
      grid5: false,
      grid10: false,
      grid25: false,
      grid50: false,
    });
  };

  const grid5 = () => {
    gridSize(5);
    setGrid({
      ...grid,
      grid1: false,
      grid5: true,
      grid10: false,
      grid25: false,
      grid50: false,
    });
  };

  const grid10 = () => {
    gridSize(10);
    setGrid({
      ...grid,
      grid1: false,
      grid5: false,
      grid10: true,
      grid25: false,
      grid50: false,
    });
  };

  const grid25 = () => {
    gridSize(25);
    setGrid({
      ...grid,
      grid1: false,
      grid5: false,
      grid10: false,
      grid25: true,
      grid50: false,
    });
  };

  const grid50 = () => {
    gridSize(50);
    setGrid({
      ...grid,
      grid1: false,
      grid5: false,
      grid10: false,
      grid25: false,
      grid50: true,
    });
  };
  return (
    <div className="edit-panel">
      {props.tables.edit ? (
        <>
          <h1>Edit Floor Layout</h1>

          <form className="edit-form">
            <div onClick={addTable} className="add-table-button">
              Add Table <img className="plus-icon" alt="add" src={AddIcon} />
            </div>
            <div onClick={resetTables} className="reset-layout-button">
              Reset All{' '}
              <img className="delete2-icon" alt="delete" src={Delete2} />
            </div>

            <div className="grid-size-select">
              <img className="grid-logo" alt="grid" src={Grid} />
              <div
                style={{
                  backgroundColor: grid.grid1 ? grid.bgActive : grid.bgInActive,
                }}
                onClick={grid1}
                className="grid-1"
              >
                1‎‎‏‏‎ ‎
              </div>
              <div
                style={{
                  backgroundColor: grid.grid5 ? grid.bgActive : grid.bgInActive,
                }}
                onClick={grid5}
                className="grid-1"
              >
                5‏‏‎ ‎
              </div>
              <div
                style={{
                  backgroundColor: grid.grid10
                    ? grid.bgActive
                    : grid.bgInActive,
                }}
                onClick={grid10}
                className="grid-1"
              >
                10
              </div>
              <div
                style={{
                  backgroundColor: grid.grid25
                    ? grid.bgActive
                    : grid.bgInActive,
                }}
                onClick={grid25}
                className="grid-1"
              >
                25
              </div>
              <div
                style={{
                  backgroundColor: grid.grid50
                    ? grid.bgActive
                    : grid.bgInActive,
                }}
                onClick={grid50}
                className="grid-1"
              >
                50
              </div>
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
