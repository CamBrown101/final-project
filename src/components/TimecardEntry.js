import "./TimecardEntry.scss";
import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

export default function TimecardEntry() {
  const [code, setCode] = useState("");

  const punchIn = (code) => {
    const data = { pin: code, login: true };
    Axios.post("http://localhost:8080/api/timecards", data).then((res) => {
      window.alert(res.data);
    });
  };
  const punchOut = (code) => {
    const data = { pin: code, login: false };
    Axios.post("http://localhost:8080/api/timecards", data).then((res) => {
      window.alert(res.data);
    });
  };

  const addNumber = (num) => {
    if (code.length <= 3) {
      setCode(code + num);
    }
  };

  return (
    <div className="punchin-container">
      <h1>Clock in</h1>
      <div className="keypad-container">
        <p className="input">{code}</p>
        <div className="button-container">
          <button
            onClick={() => {
              addNumber("1");
            }}
          >
            1
          </button>
          <button
            onClick={() => {
              addNumber("2");
            }}
          >
            2
          </button>
          <button
            onClick={() => {
              addNumber("3");
            }}
          >
            3
          </button>
          <br />
          <button
            onClick={() => {
              addNumber("4");
            }}
          >
            4
          </button>
          <button
            onClick={() => {
              addNumber("5");
            }}
          >
            5
          </button>
          <button
            onClick={() => {
              addNumber("6");
            }}
          >
            6
          </button>
          <br />

          <button
            onClick={() => {
              addNumber("7");
            }}
          >
            7
          </button>
          <button
            onClick={() => {
              addNumber("8");
            }}
          >
            8
          </button>
          <button
            onClick={() => {
              addNumber("9");
            }}
          >
            9
          </button>
          <br />
          <Link to={"/login"}>
            <button>back</button>
          </Link>
          <button
            onClick={() => {
              addNumber("0");
            }}
          >
            0
          </button>
          <button
            onClick={() => {
              setCode("");
            }}
          >
            Clear
          </button>
          <br />
          <button className="submit" onClick={() => punchIn(code)}>
            LOG IN
          </button>
          <button className="submit" onClick={() => punchOut(code)}>
            LOG OUT
          </button>
        </div>
      </div>
    </div>
  );
}
