import React, { useEffect } from 'react';

export default function EditSeatButton({
  data,
  setEditSeat,
  editSeatToggle,
  tableInfo,
}) {
  let cssClass = 'edit-seat-button button';

  if (!data.orderId) {
    cssClass += ' opacity';
  }

  useEffect(() => {
    setEditSeat(false);
  }, [tableInfo]);

  return (
    <div className="editSeat-section">
      <div
        className={cssClass}
        onClick={() => {
          setEditSeat(!editSeatToggle);
        }}>
        Edit Seats
      </div>
    </div>
  );
}
