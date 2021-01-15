import "./TimecardEntry.scss";
import React, { useState } from "react";
import Axios from "axios";

export default function TimecardEntry() {
  const [code, setCode] = useState("");

  const punchin = (code) => {
    const data = { pin: code };
    Axios.post("http://localhost:8080/api/timecards", data).then((res) => {
      console.log(res);
    });
  };

  const addNumber = (num) => {
    setCode(code + num);
  };
  const punchIn = (num) => {
    console.log(num);
  };

  return (
    <div className="punchin-container">
      <h1>Sign In</h1>
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

        <button onClick={() => punchIn(code)}>Submit</button>
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
      </div>
    </div>
  );
}
