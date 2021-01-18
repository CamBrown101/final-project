import React, { useState } from 'react';

export default function EditButton({ mod, setMod, bill, selected, data }) {
  const [inputToggle, setInputToggle] = useState('hide');
  let cssClass = 'edit-button button';
  if (!data.itemId.length || selected === null) {
    cssClass += ' opacity';
  }
  return (
    <div className="edit-section">
      <div
        className={cssClass}
        onClick={() => {
          if (!data.itemId.length || selected === null) {
            setInputToggle('hide');
          } else {
            inputToggle === 'hide'
              ? setInputToggle('show')
              : setInputToggle('hide');
          }
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
