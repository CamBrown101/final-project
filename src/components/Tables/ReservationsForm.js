import { useEffect, useState } from 'react';
import axios from 'axios';
import './ReservationsForm.scss';

export default function ReservationsForm(props) {
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

  useEffect(() => {
    console.log(props.tables);
  }, [props.tables]);
  useEffect(() => {
    if (!props.name) {
      setReservations({
        ...reservations,
        timeHour: false,
        time00: false,
        time15: false,
        time30: false,
        time45: false,
        reserved: false,
      });
    }
    if (props.name) {
      let string = 'time' + props.minute;

      setReservations({
        ...reservations,
        timeHour: true,
        time00: false,
        time15: false,
        time30: false,
        time45: false,
        [string]: true,
        reserved: true,
      });
    }
    if (props.minute === 0) {
      setReservations({
        ...reservations,
        timeHour: true,
        time00: true,
        time15: false,
        time30: false,
        time45: false,
        reserved: true,
      });
    }
  }, [props.tables.reservations]);

  useEffect(() => {}, [props.hours]);
  const timeHour = () => {
    if (!props.minute) {
      setReservations({
        ...reservations,
        timeHour: true,
        time00: true,
        time15: false,
        time30: false,
        time45: false,
      });
    }
  };
  const time00Click = () => {
    if (!props.minute) {
      setReservations({
        ...reservations,
        timeHour: true,
        time00: true,
        time15: false,
        time30: false,
        time45: false,
        minute: 0,
      });
    }
  };

  const time15Click = () => {
    if (!props.minute) {
      setReservations({
        ...reservations,
        timeHour: true,
        time00: false,
        time15: true,
        time30: false,
        time45: false,
        minute: 15,
      });
    }
  };

  const time30Click = () => {
    if (!props.minute) {
      setReservations({
        ...reservations,
        timeHour: true,
        time00: false,
        time15: false,
        time30: true,
        time45: false,
        minute: 30,
      });
    }
  };

  const time45Click = () => {
    if (!props.minute) {
      setReservations({
        ...reservations,
        timeHour: true,
        time00: false,
        time15: false,
        time30: false,
        time45: true,
        minute: 45,
      });
    }
  };

  const showForm = () => {
    setReservations({
      ...reservations,
      showForm: true,
    });
  };

  const seat1 = () => {
    setReservations({
      ...reservations,
      seat1: true,
      seat2: false,
      seat3: false,
      seat4: false,
      seat5: false,
      seat6: false,
      seat: 1,
    });
  };

  const seat2 = () => {
    setReservations({
      ...reservations,
      seat1: false,
      seat2: true,
      seat3: false,
      seat4: false,
      seat5: false,
      seat6: false,
      seat: 2,
    });
  };

  const seat3 = () => {
    setReservations({
      ...reservations,
      seat1: false,
      seat2: false,
      seat3: true,
      seat4: false,
      seat5: false,
      seat6: false,
      seat: 3,
    });
  };

  const seat4 = () => {
    setReservations({
      ...reservations,
      seat1: false,
      seat2: false,
      seat3: false,
      seat4: true,
      seat5: false,
      seat6: false,
      seat: 4,
    });
  };

  const seat5 = () => {
    setReservations({
      ...reservations,
      seat1: false,
      seat2: false,
      seat3: false,
      seat4: false,
      seat5: true,
      seat6: false,
      seat: 5,
    });
  };

  const seat6 = () => {
    setReservations({
      ...reservations,
      seat1: false,
      seat2: false,
      seat3: false,
      seat4: false,
      seat5: false,
      seat6: true,
      seat: 6,
    });
  };

  const name = (event) => {
    setReservations({
      ...reservations,
      name: event.target.value,
    });
  };

  const phone = (event) => {
    setReservations({
      ...reservations,
      phone: event.target.value,
    });
  };

  const getDay = () => {
    let day = '';
    if (props.tab.mon) {
      day = 'mon';
    }
    if (props.tab.tue) {
      day = 'tue';
    }
    if (props.tab.wed) {
      day = 'wed';
    }
    if (props.tab.thu) {
      day = 'thu';
    }
    if (props.tab.fri) {
      day = 'fri';
    }
    if (props.tab.sat) {
      day = 'sat';
    }
    if (props.tab.sun) {
      day = 'sun';
    }
    return day;
  };

  const createArr = (reservations) => {
    let hours = [11, 12, 1, 2, 3, 4, 5, 6, 7, 8];
    let arr = [];
    for (let i = 0; i < 10; i++) {
      let reservation = reservations.find((obj) => obj.hour === hours[i]);
      arr.push({ hour: hours[i], reservation: reservation });
    }
    return arr;
  };
  const getDayReservations = (dayName) => {
    const data = {
      table: props.tableInfo.table,
      day: dayName,
    };
    console.log(data);
    const promise = axios
      .post('/api/reservations/day', data)
      .then((response) => {
        console.log(response.data);
        props.setTables({
          ...props.tables,
          reservations: [...createArr(response.data)],
        });
      })
      .catch(function (error) {
        console.log('Get reservations failed');
      });
    return promise;
  };

  const cancel = () => {
    let day = getDay();

    const data = {
      table: props.tableInfo.table,
      day: day,
      hour: props.id,
    };
    console.log(data);

    const promise = axios
      .post('/api/reservations/close', data)
      .then((response) => {
        getDayReservations(day);
        setReservations({
          ...reservations,
          timeHour: false,
          time00: false,
          time15: false,
          time30: false,
          time45: false,
          showForm: false,
          minute: 0,
        });
      })
      .catch(function (error) {
        console.log('Close Reservation failed');
      });
    return promise;
  };

  const cancelSubmit = () => {
    setReservations({
      ...reservations,
      showForm: false,
      name: '',
      phone: '',
    });
  };
  const submitReservation = (event) => {
    event.preventDefault();
    let day = getDay();
    const data = {
      table: props.tableInfo.table,
      name: reservations.name,
      phone: reservations.phone,
      hour: props.id,
      minute: reservations.minute,
      day: day,
      seats: reservations.seat,
    };
    const promise = axios
      .post('/api/reservations/', data)
      .then((response) => {
        getDayReservations(day);
        setReservations({
          ...reservations,
          name: '',
          phone: '',
          showForm: false,
        });
      })
      .catch(function (error) {
        console.log('Submit Reservation failed');
      });
    return promise;
  };

  //map out the reservation form seat buttons
  const reserveSeats = () => {
    let seatsArr = [];
    for (let i = 1; i < props.tableInfo.tableObj.number_of_seats + 1; i++) {
      seatsArr.push({ seat: i });
    }
    const seats = seatsArr.map((e, i) => {
      let seatsName = 'seat-' + e.seat;
      let seatClickName = 'seat' + e.seat;
      const seatFunctions = [seat1, seat2, seat3, seat4, seat5, seat6];
      return (
        <div
          key={e.seat}
          className={seatsName}
          onClick={seatFunctions[i]}
          style={{
            backgroundColor: reservations[seatClickName]
              ? reservations.bgActive
              : reservations.bgInActive,
          }}
        >
          {e.seat}
        </div>
      );
    });
    return seats;
  };

  const seats = reserveSeats();
  return (
    <div className="reservations-form">
      <form className="reservations-form-time">
        <div
          onClick={timeHour}
          style={{
            backgroundColor: reservations.timeHour
              ? reservations.bgActive
              : reservations.bgInActive,
          }}
          className="reservations-form-hour"
        >
          {props.id}
        </div>
        <div
          onClick={time00Click}
          style={{
            backgroundColor: reservations.time00
              ? reservations.bgActive
              : reservations.bgInActive,
          }}
          className="reservations-form-00"
        >
          00
        </div>
        <div
          onClick={time15Click}
          style={{
            backgroundColor: reservations.time15
              ? reservations.bgActive
              : reservations.bgInActive,
          }}
          className="reservations-form-15"
        >
          15
        </div>
        <div
          onClick={time30Click}
          style={{
            backgroundColor: reservations.time30
              ? reservations.bgActive
              : reservations.bgInActive,
          }}
          className="reservations-form-30"
        >
          30
        </div>
        <div
          onClick={time45Click}
          style={{
            backgroundColor: reservations.time45
              ? reservations.bgActive
              : reservations.bgInActive,
          }}
          className="reservations-form-45"
        >
          45
        </div>

        {!reservations.reserved ? (
          <>
            {!reservations.showForm ? (
              <div onClick={showForm} className="reserve-button">
                Reserve
              </div>
            ) : null}
          </>
        ) : null}
        {reservations.reserved ? (
          <div onClick={cancel} className="cancel-button">
            Close Reservation
          </div>
        ) : null}
      </form>
      {reservations.showForm ? (
        <form className="reserve-form">
          <input
            type="text"
            className="reservation-name"
            required
            placeholder="Name"
            name="name"
            onChange={name}
            value={reservations.name}
          />
          <input
            type="text"
            className="reservation-phone"
            required
            placeholder="Phone"
            name="name"
            onChange={phone}
            value={reservations.phone}
          />
          <div className="reserve-seats-select">
            <h3 className="reserve-seats-h3">Seats</h3>
            {seats}
          </div>
          <div className="res-buttons">
            <div className="res-buttons-submit" onClick={submitReservation}>
              Submit
            </div>
            <div className="res-buttons-cancel" onClick={cancelSubmit}>
              Cancel
            </div>
          </div>
        </form>
      ) : null}
      {reservations.reserved ? (
        <div className="reservation-display">
          <b>Name: </b>
          {props.name}
          <br />
          <b>Phone: </b>
          {props.phone}
          <br />
          <b>Seats:</b> {props.seats}
        </div>
      ) : null}
    </div>
  );
}
