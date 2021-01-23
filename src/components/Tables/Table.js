import Draggable from 'react-draggable';
import axios from 'axios';
import './Table.scss';
import { useState } from 'react';

export default function Table(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const trackPos = (data) => {
    console.log(props.tables.layout);
    setPosition({ x: data.x, y: data.y });
    const id = props.id;
    //Remove current layout info from layout array
    const tables = props.tables.layout.filter(function (obj) {
      return obj.id !== id;
    });
    //push new layout information into array
    tables.push({ id: id, x_pos: data.x, y_pos: data.y });
    props.setTables({
      ...props.tables,
      layout: tables,
    });
  };

  const update = (data_info) => {
    const data = {
      id: props.id,
      x_pos: data_info.x,
      y_pos: data_info.y,
    };
    console.log(data);
    const URL = `/api/layout/`;
    const promise = axios
      .post(URL, data)
      .then((response) => {
        props.setTables({
          ...props.tables,
        });
        console.log('Layout Updated');
      })
      .catch(function (error) {
        console.log('Layout Update Failed');
      });

    return promise;
  };

  const deleteTable = () => {
    const data = {
      id: props.id,
    };

    const URL = `/api/layout/`;
    const promise = axios
      .delete(URL, { data: data })
      .then((response) => {
        console.log(response);
        const id = props.id;
        //Remove current layout info from layout array
        const tables = props.tables.layout.filter(function (obj) {
          return obj.id !== id;
        });
        console.log(tables);

        //push new layout information into array
        props.setTables({
          ...props.tables,
          layout: tables,
        });
      })
      .catch(function (error) {
        console.log('Delete layout failed');
      });

    return promise;
  };
  return (
    <Draggable
      cancel="strong"
      bounds="parent"
      onStart={props.edit}
      defaultPosition={{ x: props.x_pos, y: props.y_pos }}
      onDrag={(e, data) => trackPos(data)}
      onStop={(e, data) => update(data)}
    >
      <div className="table">
        {props.tables.edit ? (
          <strong onClick={deleteTable} className="delete-table-layout">
            X
          </strong>
        ) : null}
        <div className="layout-position-data">
          x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
        </div>
        <h1>{props.id}</h1>
      </div>
    </Draggable>
  );
}
