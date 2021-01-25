import './Side.scss';
import EditPanel from './EditPanel';
import TableInfo from './TableInfo';
import Reservations from './Reservations';
export default function Side(props) {
  return (
    <div className="side-container">
      <EditPanel tables={props.tables} setTables={props.setTables}></EditPanel>
      {!props.tables.edit ? (
        <>
          {props.tableInfo.table ? (
            <TableInfo
              tables={props.tables}
              setTables={props.setTables}
              tableInfo={props.tableInfo}
              setTableInfo={props.setTableInfo}
              selectValue={props.selectValue}
              setSelectValue={props.setSelectValue}
            ></TableInfo>
          ) : null}
        </>
      ) : null}
      <Reservations
        tables={props.tables}
        setTables={props.setTables}
        tableInfo={props.tableInfo}
        setTableInfo={props.setTableInfo}
      ></Reservations>
    </div>
  );
}
