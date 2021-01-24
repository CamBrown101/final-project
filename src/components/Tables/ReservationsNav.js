import { useState, useEffect } from 'react';

import './ReservationsNav.scss';

export default function ReservationsNav(props) {
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

  useEffect(() => {
    const day = getDay();
    setTab({
      ...tab,
      [day]: true,
    });
  }, []);

  const getDay = () => {
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const d = new Date();
    const dayName = days[d.getDay()];
    return dayName;
  };
  const monTab = () => {
    getDay();
    setTab({
      ...tab,
      mon: true,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      all: false,
    });
  };

  const tueTab = () => {
    setTab({
      ...tab,
      mon: false,
      tue: true,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      all: false,
    });
  };

  const wedTab = () => {
    setTab({
      ...tab,
      mon: false,
      tue: false,
      wed: true,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      all: false,
    });
  };

  const thuTab = () => {
    setTab({
      ...tab,
      mon: false,
      tue: false,
      wed: false,
      thu: true,
      fri: false,
      sat: false,
      sun: false,
      all: false,
    });
  };

  const friTab = () => {
    setTab({
      ...tab,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: true,
      sat: false,
      sun: false,
      all: false,
    });
  };

  const satTab = () => {
    setTab({
      ...tab,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: true,
      sun: false,
      all: false,
    });
  };

  const sunTab = () => {
    setTab({
      ...tab,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: true,
      all: false,
    });
  };

  const allTab = () => {
    setTab({
      ...tab,
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
      all: true,
    });
  };
  return (
    <>
      <nav className="reservations-nav-upper">
        <div
          onClick={monTab}
          style={{
            backgroundColor: tab.mon ? tab.bgActive : tab.bgInActive,
          }}
          className="reservations-nav-day"
          id="reservations-nav-mon"
        >
          Mon
        </div>
        <div
          onClick={tueTab}
          style={{
            backgroundColor: tab.tue ? tab.bgActive : tab.bgInActive,
          }}
          className="reservations-nav-day"
          id="reservations-nav-tue"
        >
          Tue
        </div>
        <div
          onClick={wedTab}
          style={{
            backgroundColor: tab.wed ? tab.bgActive : tab.bgInActive,
          }}
          className="reservations-nav-day"
          id="reservations-nav-wed"
        >
          Wed
        </div>
        <div
          onClick={thuTab}
          style={{
            backgroundColor: tab.thu ? tab.bgActive : tab.bgInActive,
          }}
          className="reservations-nav-day"
          id="reservations-nav-thurs"
        >
          Thu
        </div>
      </nav>
      <nav className="reservations-nav-lower">
        <div
          onClick={friTab}
          style={{
            backgroundColor: tab.fri ? tab.bgActive : tab.bgInActive,
          }}
          className="reservations-nav-day"
          id="reservations-nav-fri"
        >
          Fri
        </div>
        <div
          onClick={satTab}
          style={{
            backgroundColor: tab.sat ? tab.bgActive : tab.bgInActive,
          }}
          className="reservations-nav-day"
          id="reservations-nav-sat"
        >
          Sat
        </div>
        <div
          onClick={sunTab}
          style={{
            backgroundColor: tab.sun ? tab.bgActive : tab.bgInActive,
          }}
          className="reservations-nav-day"
          id="reservations-nav-sun"
        >
          Sun
        </div>
        <div
          onClick={allTab}
          style={{
            backgroundColor: tab.all ? tab.bgActive : tab.bgInActive,
          }}
          className="reservations-nav-day"
          id="reservations-nav-all"
        >
          All
        </div>
      </nav>
    </>
  );
}
