import { useState, useEffect } from 'react';
import axios from 'axios';
import './TablesScreen.scss';
import Table from './Table';
import EditPanel from './EditPanel';
import Lock from '../../img/icons/locklight.png';
import Edit from '../../img/icons/editlight.png';
import Side from './Side';
export default function Tables(props) {
  const [tables, setTables] = useState({
    edit: false,
    layout: [],
    open: [],
    employees: [],
    reservations: [],
    grid: 1,
    seats: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
  });

  const [edit, setEdit] = useState({
    button: 'Edit',
  });
  useEffect(() => {
    console.log(tables.reservations);
  }, [tables]);
  const [tableInfo, setTableInfo] = useState({
    table: 0,
    tableObj: {},
  });

  const [selectValue, setSelectValue] = useState({
    employee: 'DEFAULT',
    seats: 'DEFAULT',
    name: '',
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
    console.log(tables.open);
  }, [tables]);

  const editFunc = () => {
    return true;
  };

  const lockFunc = () => {
    return false;
  };

  const editClick = () => {
    if (edit.button === 'Edit') {
      setEdit({
        ...edit,
        button: 'Lock',
      });
      setTables({
        ...tables,
        edit: true,
      });
    }
    if (edit.button === 'Lock') {
      setEdit({
        ...edit,
        button: 'Edit',
      });
      setTables({
        ...tables,
        edit: false,
      });
    }
  };
  return (
    <div className="table-screen-container">
      <div className="layout-screen">
        <div
          style={{ backgroundColor: tables.edit ? '#4ba99a' : '#2c2636' }}
          className="tables-container"
        >
          <div onClick={editClick} className="edit-layout-button">
            {edit.button + ' '}
            {tables.edit ? (
              <img alt="lock" className="edit-icon" src={Lock}></img>
            ) : (
              <img alt="lock" className="edit-icon" src={Edit}></img>
            )}
          </div>
          {tables.layout.map((table) => {
            let open = tables.open.find((obj) => obj.table_id === table.id);
            console.log(open);
            return (
              <Table
                key={table.id}
                id={table.id}
                tables={tables}
                open={open}
                setTables={setTables}
                tableInfo={tableInfo}
                setTableInfo={setTableInfo}
                selectValue={selectValue}
                setSelectValue={setSelectValue}
                edit={tables.edit ? editFunc : lockFunc}
                x_pos={table.x_pos}
                y_pos={table.y_pos}
              />
            );
          })}
        </div>
        <EditPanel
          tableInfo={tableInfo}
          setTableInfo={setTableInfo}
          tables={tables}
          setTables={setTables}
          selectValue={selectValue}
          setSelectValue={setSelectValue}
          edit={edit}
          setEdit={setEdit}
        ></EditPanel>

        <Side
          tables={tables}
          setTables={setTables}
          tableInfo={tableInfo}
          setTableInfo={setTableInfo}
          selectValue={selectValue}
          setSelectValue={setSelectValue}
        ></Side>
      </div>
    </div>
  );
}
