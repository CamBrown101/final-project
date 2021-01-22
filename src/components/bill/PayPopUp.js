import React from "react";

export default function PayPopUp(props) {
  const handleClick = () => {
    props.toggle();
  };
  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;{" "}
        </span>
        <p>I'm A Pop Up!!!</p>
      </div>
    </div>
  );
}
