import './AllReservationsPartial.scss';

export default function AllReservationsPartial(props) {
  console.log(props);
  let minute = props.minute;
  if (!props.minute) {
    minute = '00';
  }
  return (
    <div className="all-reservations-partial">
      <h2 className="all-reservations-partial-title">Table {props.table}</h2>
      <p className="all-reservations-partial-time">
        Time: {props.hour}:{minute}
      </p>
      <p className="all-reservations-partial-seats">Seats: {props.seats}</p>
      <p className="all-reservations-partial-name">Name: {props.name}</p>
      <p className="all-reservations-partial-seats">Seats: {props.seats}</p>
    </div>
  );
}
