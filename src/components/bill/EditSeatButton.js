import React, { useEffect } from "react";

export default function EditSeatButton({
  data,
  setEditSeat,
  editSeatToggle,
  tableInfo,
  bill,
}) {
  let cssClass = "edit-seat-button button";

  if (!data.orderId) {
    cssClass += " opacity";
  }

  return (
    <div className="editSeat-section">
      <div
        className={cssClass}
        onClick={() => {
          setEditSeat(!editSeatToggle);
        }}
      >
        Edit Seats
      </div>
    </div>
  );
}
