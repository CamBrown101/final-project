import { useState, useEffect } from 'react';
import axios from 'axios';
import './TablesScreen.scss';
import Table from './Table';
import EditPanel from './EditPanel';
export default function Tables(props) {
  const [tables, setTables] = useState({
    edit: false,
    layout: [],
    open: [],
    grid: 1,
  });
  useEffect(() => {
    Promise.all([axios.get('/api/layout'), axios.get('/api/tables/open')])
      .then((all) => {
        setTables({
          ...tables,
          layout: all[0].data,
          open: all[1].data,
        });
      })
      .catch();
  }, []);

  useEffect(() => {}, [tables.layout]);

  const edit = () => {
    return true;
  };

  const lock = () => {
    return false;
  };

  return (
    <>
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
              edit={tables.edit ? edit : lock}
              x_pos={table.x_pos}
              y_pos={table.y_pos}
            />
          );
        })}
      </section>
      <EditPanel tables={tables} setTables={setTables}></EditPanel>
    </>
  );
}
