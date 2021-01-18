import React from "react";
import "./SeatContainer.scss";
import SeatItem from "./SeatItem";

export default function SeatContainer({ setSeat, table, seat }) {
  const seatsToRender = [];
  for (let i = 0; i < table.seats; i++) {
    seatsToRender.push(
      <SeatItem seatNumber={i} setSeat={setSeat} seat={seat} />
    );
  }
  return <div>{seatsToRender}</div>;
}
