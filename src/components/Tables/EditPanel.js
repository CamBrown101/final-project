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

  return (
    <div className="edit-panel">
      <button onClick={editClick} className="edit-layout-button">
        {edit.button}
      </button>
      <button onClick={addTable} className="edit-layout-button">
        Add Table
      </button>
    </div>
  );
}
