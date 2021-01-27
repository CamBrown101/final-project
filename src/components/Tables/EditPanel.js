import './EditPanel.scss';
import axios from 'axios';
import TableInfo from './TableInfo';
import Grid from '../../img/icons/grid.png';
export default function EditPanel(props) {
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
  const grid = (size) => {
    const gridValue = size;
    props.setTables({
      ...props.tables,
      grid: gridValue,
    });
  };

  const grid1 = () => {
    grid(1);
  };

  const grid5 = () => {
    grid(5);
  };

  const grid10 = () => {
    grid(10);
  };

  const grid25 = () => {
    grid(25);
  };

  const grid50 = () => {
    grid(50);
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
            <div onClick={resetTables} className="edit-layout-button">
              Reset All
            </div>

            <div className="grid-size-select">
              Grid
              <img className="grid-logo" alt="grid" src={Grid} />
              <div onClick={grid1} className="grid-1">
                1
              </div>
              <div onClick={grid5} className="grid-1">
                5
              </div>
              <div onClick={grid10} className="grid-1">
                10
              </div>
              <div onClick={grid25} className="grid-1">
                25
              </div>
              <div onClick={grid50} className="grid-1">
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
