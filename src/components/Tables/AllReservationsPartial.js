import './AllReservationsPartial.scss';

export default function AllReservationsPartial(props) {
  console.log(props);
  let minute = props.minute;
  if (!props.minute) {
    minute = '00';
  }
  return (
    <div className="all-reservations-partial">
      <b>Table: </b>
      {props.table}
      <br />
      <b>Time: </b>
      {props.hour + ':' + minute}
      <br />
      <b>Seats: </b>
      {props.seats}
      <br />
      <b>Name: </b>
      {props.name}
      <br />
      <b>Phone: </b>
      {props.phone}
    </div>
  );
}
