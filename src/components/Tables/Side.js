import './Side.scss';
import EditPanel from './EditPanel';
import TableInfo from './TableInfo';
export default function Side(props) {
  return (
    <div>
      <EditPanel tables={props.tables} setTables={props.setTables}></EditPanel>
      {props.tableInfo.table ? (
        <TableInfo
          tables={props.tables}
          setTables={props.setTables}
          tableInfo={props.tableInfo}
          setTableInfo={props.setTableInfo}
        ></TableInfo>
      ) : null}
    </div>
  );
}
