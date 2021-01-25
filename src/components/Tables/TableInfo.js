import { useState, useEffect } from 'react';
import axios from 'axios';
import './TableInfo.scss';

export default function TableInfo(props) {
  const seatsChange = (event) => {
    props.setSelectValue({
      ...props.selectValue,
      seats: event.target.value,
    });
    const number_of_seats = parseInt(event.target.value);
    const data = {
      id: props.tableInfo.table,
      number_of_seats: number_of_seats,
    };

    const URL = `/api/layout/seats`;
    const promise = axios
      .put(URL, data)
      .then((response) => {
        console.log('Table Seats Updated');
      })
      .catch(function (error) {
        console.log('Table Seats Update Failed');
      });

    return promise;
  };

  const employeeChange = (event) => {
    const employee = parseInt(event.target.value);
    const data = {
      id: props.tableInfo.table,
      employee_id: employee,
    };

    let employeeFind = props.tables.employees.data.find(
      (obj) => obj.id === props.tableInfo.tableObj.employee_id
    );
    let name = `${employeeFind.firstname} ${employeeFind.lastname}`;
    props.setSelectValue({
      ...props.selectValue,
      employee: event.target.value,
      name: name,
    });

    const URL = `/api/layout/employee`;
    const promise = axios
      .put(URL, data)
      .then((response) => {
        console.log('Table Employee Updated');
      })
      .catch(function (error) {
        console.log('Table Employee Update Failed');
      });

    return promise;
  };

  return (
    <div className="table-info">
      <h3 className="table-info-title">Table {props.tableInfo.table}</h3>
      <div className="set-table-employee">
        <h4 className="table-info-employee-subtitle">Employee:</h4>
        <select
          className="select-item-employee"
          onChange={employeeChange}
          name="employee"
          value={props.selectValue.employee}
        >
          {' '}
          <option value="DEFAULT" disabled>
            {props.selectValue.name}
          </option>
          {props.tables.employees.data
            ? props.tables.employees.data.map((e, key) => {
                return (
                  <option key={key} value={e.id}>
                    {e.firstname + ' ' + e.lastname}
                  </option>
                );
              })
            : null}
        </select>
      </div>
      <div className="set-table-seats">
        <h4 className="table-info-seats-subtitle">Number of seats:</h4>
        <select
          onChange={seatsChange}
          name="seats"
          id="seats"
          className="select-item-seats"
          value={props.selectValue.seats}
        >
          {' '}
          <option value="DEFAULT" disabled>
            {props.tableInfo.tableObj.number_of_seats}
          </option>
          {props.tables.seats
            ? props.tables.seats.map((e, key) => {
                return (
                  <option key={key} value={e.id}>
                    {e.id}
                  </option>
                );
              })
            : null}
        </select>
      </div>
    </div>
  );
}

// const [tables, setTables] = useState({
//   edit: false,
//   layout: [],
//   open: [],
//   employees: [],
//   grid: 1,
// });
