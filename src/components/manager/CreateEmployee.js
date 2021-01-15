import { useState } from 'react';
import axios from 'axios';
import './CreateEmployee.scss';
import ManagerNav from './ManagerNav';

export default function CreateEmployee(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const firstNameOnChange = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameOnChange = (event) => {
    setLastName(event.target.value);
  };

  const emailOnChange = (event) => {
    setEmail(event.target.value);
  };

  const pinOnChange = (event) => {
    setPin(event.target.value);
  };

  const isAdminOnChange = (event) => {
    setIsAdmin(event.target.value);
  };

  const create = (event) => {
    event.preventDefault();

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      pin: pin,
      isAdmin: isAdmin,
    };
    console.log(data);
    const URL = `/api/employees/`;
    const promise = axios
      .post(URL, data)
      .then((response) => {
        console.log(response.data);
        // if (response.data === 'exists') {
        //   props.setError('Email already used');
        // }

        if (response.data.email) {
          console.log('Employee created');
        }
      })
      .catch();
    return promise;
  };

  return (
    <>
      <ManagerNav></ManagerNav>
      <section className="new-employee">
        <form className="employee-form" method="POST" action="/login">
          <h2 id="employee-title">Create Employee</h2>
          <h3>First Name:</h3>
          <input
            type="text"
            className="employee-name"
            required
            name="lastName"
            onChange={firstNameOnChange}
          />
          <h3>Last Name:</h3>
          <input
            type="text"
            className="employee-name"
            required
            name="firstName"
            onChange={lastNameOnChange}
          />
          <h3>Email:</h3>
          <input
            type="email"
            className="employee-email"
            required
            name="email"
            onChange={emailOnChange}
          />
          <h3>Pin:</h3>
          <input
            type="number"
            max="9999"
            className="employee-pin"
            required
            name="pin"
            onChange={pinOnChange}
          />
          <h3>Manager Priveleges:</h3>

          <select
            className="employee-is-admin"
            onChange={isAdminOnChange}
            name="is-admin"
          >
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
          <button
            onClick={create}
            type="submit"
            className="create-employee-button"
          >
            Create Employee
          </button>
        </form>
        {/* {props.error ? <div id="error">{props.error}</div> : null} */}
      </section>
    </>
  );
}
