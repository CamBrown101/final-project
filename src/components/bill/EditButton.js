import React, { useState } from 'react';

export default function EditButton({ mod, setMod, bill, selected }) {
  const [inputToggle, setInputToggle] = useState('hide');

  return (
    <div className="edit-section">
      <div
        className="edit-button button"
        onClick={() => {
          inputToggle === 'hide'
            ? setInputToggle('show')
            : setInputToggle('hide');
        }}>
        Edit
      </div>
      <input
        value={mod}
        className={inputToggle + ' edit-input'}
        onChange={(event) => {
          setMod(event.target.value);
        }}></input>
      <div className="confirm-cancel-buttons">
        <div
          className={inputToggle + ' button send-button'}
          onClick={() => {
            if (selected < bill.items.length)
              bill.items[bill.items.length - 1 - selected].mods = mod;
            setMod('');
            setInputToggle('hide');
          }}>
          Confrim
        </div>
        <div
          className={inputToggle + ' button cancel-button'}
          onClick={() => {
            setMod('');
            setInputToggle('hide');
          }}>
          Cancel
        </div>
      </div>
    </div>
  );
}
