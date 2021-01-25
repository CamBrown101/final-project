import { useState, useEffect } from 'react';
import './Reservations.scss';
import ReservationsNav from './ReservationsNav';

import ReservationsForm from './ReservationsForm';
export default function Reservations(props) {
  const [tab, setTab] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
    all: false,
    bgActive: 'darkgrey',
    bgInActive: 'lightgrey',
  });
  const reservations = [...props.tables.reservations];
  const mapHours = reservations.map((reservation) => {
    // let reservation = reservations.find((obj) => obj.hour === hour);
    let minute;
    let name;
    let phone;
    let seats;
    if (reservation.reservation) {
      minute = reservation.reservation.minute;
      name = reservation.reservation.name;
      phone = reservation.reservation.phone;
      seats = reservation.reservation.seats;
    }
    return (
      <ReservationsForm
        tab={tab}
        setTab={setTab}
        key={reservation.hour}
        id={reservation.hour}
        minute={minute}
        name={name}
        phone={phone}
        seats={seats}
        tables={props.tables}
        tableInfo={props.tableInfo}
        reservation={reservation.reservation}
      ></ReservationsForm>
    );
  });
  return (
    <div className="reservations-containter">
      <h2>Reservations:</h2>
      <ReservationsNav
        tab={tab}
        setTab={setTab}
        tables={props.tables}
        setTables={props.setTables}
        tableInfo={props.tableInfo}
        setTableInfo={props.setTableInfo}
      ></ReservationsNav>
      {mapHours}
    </div>
  );
}
