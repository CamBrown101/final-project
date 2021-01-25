import './Side.scss';
import TableInfo from './TableInfo';
import Reservations from './Reservations';
export default function Side(props) {
  return (
    <div className="side-container">
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
