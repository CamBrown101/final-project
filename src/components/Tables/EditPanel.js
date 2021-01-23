import { useState } from 'react';
import './EditPanel.scss';
import axios from 'axios';
export default function EditPanel(props) {
  const [edit, setEdit] = useState({
    button: 'Edit',
  });

  const editClick = () => {
    if (edit.button === 'Edit') {
      setEdit({
        ...edit,
        button: 'Lock',
      });
      props.setTables({
        ...props.tables,
        edit: true,
      });
    }
    if (edit.button === 'Lock') {
      setEdit({
        ...edit,
        button: 'Edit',
      });
      props.setTables({
        ...props.tables,
        edit: false,
      });
    }
  };

  const addTable = () => {
    const URL = `/api/layout/`;
    const promise = axios
      .post(URL)
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
        //reset psql id counter
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
      <button onClick={editClick} className="edit-layout-button">
        {edit.button}
      </button>
      {props.tables.edit ? (
        <button onClick={addTable} className="edit-layout-button">
          Add Table
        </button>
      ) : null}
      {props.tables.edit ? (
        <select onChange={grid} name="grid" id="grid">
          <option value="1">Grid Size 1</option>
          <option value="5">Grid Size 5</option>
          <option value="10">Grid Size 10</option>
          <option value="25">Grid Size 25</option>
          <option value="50">Grid Size 50</option>
        </select>
      ) : null}
      {props.tables.edit ? (
        <button onClick={resetTables} className="edit-layout-button">
          Reset All
        </button>
      ) : null}
    </div>
  );
}
