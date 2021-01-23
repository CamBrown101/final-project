import React from 'react';
import './PayPopUp.scss';

export default function PayPopUp() {
  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close">&times; </span>
        <p>I'm A Pop Up!!!</p>
      </div>
    </div>
  );
}
