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

  const [reservations, setReservations] = useState({
    timeHour: false,
    time00: false,
    time15: false,
    time30: false,
    time45: false,
    seat1: false,
    seat2: false,
    seat3: false,
    seat4: false,
    seat5: false,
    seat6: false,
    seat: 1,
    bgActive: 'darkgrey',
    bgInActive: 'lightgrey',
    showForm: false,
    reserved: false,
    name: '',
    phone: '',
    minute: 0,
  });

  const reservationsCopy = [...props.tables.reservations];
  const mapHours = reservationsCopy.map((reservation) => {
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
        reservations={reservations}
        setReservations={setReservations}
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
        reservations={reservations}
        setReservations={setReservations}
      ></ReservationsNav>
      {mapHours}
    </div>
  );
}
