import React from "react";
import "./SeatItem.scss";

export default function SeatItem({ setSeat, seat, seatNumber }) {
  let selectedClass = seat === seatNumber + 1 ? "selected" : "";
  return (
    <div
      className={"seat-item " + selectedClass}
      onClick={() => {
        if (seat === seatNumber + 1) setSeat(null);
        else setSeat(seatNumber + 1);
      }}
    >
      <h3>{seatNumber + 1}</h3>
    </div>
  );
}
