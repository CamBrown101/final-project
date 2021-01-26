import './AllReservationsPartial.scss';

export default function AllReservationsPartial(props) {
  return (
    <div className="all-reservations-partial">
      {props.name}
      {props.table}
    </div>
  );
}
