import { useState, useEffect } from 'react';
import axios from 'axios';
import './TablesScreen.scss';
import Table from './Table';

import Side from './Side';
export default function Tables(props) {
  const [tables, setTables] = useState({
    edit: false,
    layout: [],
    open: [],
    employees: [],
    grid: 1,
    seats: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
  });

  const [tableInfo, setTableInfo] = useState({
    table: 0,
    tableObj: {},
  });

  const [selectValue, setSelectValue] = useState({
    employee: 'DEFAULT',
    seats: 'DEFAULT',
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/layout'),
      axios.get('/api/tables/open'),
      axios.get('/api/employees'),
    ])
      .then((all) => {
        setTables({
          ...tables,
          layout: all[0].data,
          open: all[1].data,
          employees: all[2],
        });
      })
      .catch();
  }, []);

  useEffect(() => {
    console.log(tables);
  }, [tables]);

  const edit = () => {
    return true;
  };

  const lock = () => {
    return false;
  };

  return (
    <div className="layout-screen">
      <section
        style={{ backgroundColor: tables.edit ? 'red' : 'yellow' }}
        className="tables-container"
      >
        {tables.layout.map((table) => {
          return (
            <Table
              key={table.id}
              id={table.id}
              tables={tables}
              setTables={setTables}
              tableInfo={tableInfo}
              setTableInfo={setTableInfo}
              selectValue={selectValue}
              setSelectValue={setSelectValue}
              edit={tables.edit ? edit : lock}
              x_pos={table.x_pos}
              y_pos={table.y_pos}
            />
          );
        })}
      </section>
      <section className="side-container">
        <Side
          tables={tables}
          setTables={setTables}
          tableInfo={tableInfo}
          setTableInfo={setTableInfo}
          selectValue={selectValue}
          setSelectValue={setSelectValue}
        ></Side>
      </section>
    </div>
  );
}
