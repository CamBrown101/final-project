import './Reservations.scss';
import ReservationsNav from './ReservationsNav';

import ReservationsForm from './ReservationsForm';
export default function Reservations(props) {
  const hours = [11, 12, 1, 2, 3, 4, 5, 6, 7, 8];
  const reservations = props.tables.reservations;
  const mapHours = hours.map((hour) => {
    let reservation = reservations.find((obj) => obj.hour === hour);
    let minute;
    let name;
    let phone;
    if (reservation) {
      minute = reservation.minute;
      name = reservation.name;
      phone = reservation.phone;
    }
    return (
      <ReservationsForm
        key={hour}
        id={hour}
        minute={minute}
        name={name}
        phone={phone}
        tables={props.tables}
      ></ReservationsForm>
    );
  });
  return (
    <div className="reservations-containter">
      <h2>Reservations:</h2>
      <ReservationsNav></ReservationsNav>
      {mapHours}
    </div>
  );
}
