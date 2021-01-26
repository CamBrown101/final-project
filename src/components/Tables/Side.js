import './Side.scss';
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
    </div>
  );
}
