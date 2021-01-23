import { useState } from 'react';
import tables from '../../routes/tables';
import './EditPanel.scss';

export default function EditPanel(props) {
  const [edit, setEdit] = useState({
    button: 'Edit',
  });

  const editClick = () => {
    if (edit.button === 'Edit') {
      setEdit({
        ...edit,
        button: 'Save',
      });
      props.setTables({
        ...props.tables,
        edit: true,
      });
    }
    if (edit.button === 'Save') {
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
  return (
    <div className="edit-panel">
      <button onClick={editClick} className="edit-layout-button">
        {edit.button}
      </button>
    </div>
  );
}
