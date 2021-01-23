import Draggable from 'react-draggable';
import './Table.scss';
import { useState } from 'react';

export default function Table(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const trackPos = (data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      bounds="parent"
      onStart={props.edit}
      defaultPosition={{ x: props.x_pos, y: props.y_pos }}
      onDrag={(e, data) => trackPos(data)}
    >
      <div className="table">
        <div>
          x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
        </div>
        <h1>{props.id}</h1>
      </div>
    </Draggable>
  );
}
