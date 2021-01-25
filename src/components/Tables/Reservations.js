import { useEffect } from 'react';
import './Reservations.scss';
import ReservationsNav from './ReservationsNav';

import ReservationsForm from './ReservationsForm';
export default function Reservations(props) {
  const reservations = [...props.tables.reservations];
  const mapHours = reservations.map((reservation) => {
    // let reservation = reservations.find((obj) => obj.hour === hour);
    let minute;
    let name;
    let phone;
    if (reservation.reservation) {
      minute = reservation.reservation.minute;
      name = reservation.reservation.name;
      phone = reservation.reservation.phone;
    }
    return (
      <ReservationsForm
        key={reservation.hour}
        id={reservation.hour}
        minute={minute}
        name={name}
        phone={phone}
        tables={props.tables}
        reservation={reservation.reservation}
      ></ReservationsForm>
    );
  });
  return (
    <div className="reservations-containter">
      <h2>Reservations:</h2>
      <ReservationsNav
        tables={props.tables}
        setTables={props.setTables}
        tableInfo={props.tableInfo}
        setTableInfo={props.setTableInfo}
      ></ReservationsNav>
      {mapHours}
    </div>
  );
}
