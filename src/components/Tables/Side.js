import './Side.scss';
import EditPanel from './EditPanel';

import TableInfo from './TableInfo';
import Reservations from './Reservations';
import AllReservations from './AllReservations';
export default function Side(props) {
  return (
    <div className="side-container">
      {!props.tableInfo.table ? (
        <>
          {!props.tables.edit ? (
            <AllReservations
              tables={props.tables}
              setTables={props.setTables}
              tableInfo={props.tableInfo}
              setTableInfo={props.setTableInfo}
            ></AllReservations>
          ) : null}
        </>
      ) : null}
      {props.tableInfo.table ? (
        <Reservations
          tables={props.tables}
          setTables={props.setTables}
          tableInfo={props.tableInfo}
          setTableInfo={props.setTableInfo}
        ></Reservations>
      ) : null}
      <EditPanel
        tableInfo={props.tableInfo}
        setTableInfo={props.setTableInfo}
        tables={props.tables}
        setTables={props.setTables}
        selectValue={props.selectValue}
        setSelectValue={props.setSelectValue}
        edit={props.edit}
        setEdit={props.setEdit}
      ></EditPanel>
    </div>
  );
}
