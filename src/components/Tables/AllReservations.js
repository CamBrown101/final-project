import { useState, useEffect } from 'react';
import './AllReservations.scss';
import AllReservationsNav from './AllReservationsNav';
import AllReservationsPartial from './AllReservationsPartial';
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
    bgActive: '#4ba99a',
    bgInActive: '#141217',
  });

  const reservationsCopy = [...props.tables.reservations];
  const mapReservations = reservationsCopy.map((reservation) => {
    return (
      <AllReservationsPartial
        key={reservation.id}
        value={reservation.id}
        name={reservation.name}
        table={reservation.table_id}
        phone={reservation.phone}
        hour={reservation.hour}
        minute={reservation.minute}
        seats={reservation.seats}
      ></AllReservationsPartial>
    );
  });
  return (
    <>
      <AllReservationsNav
        tab={tab}
        setTab={setTab}
        tables={props.tables}
        setTables={props.setTables}
      ></AllReservationsNav>
      {mapReservations}
    </>
  );
}
