import './Employees.scss';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Employee from './Employee';
import ManagerNav from './ManagerNav';
import CreateEmployee from './CreateEmployee';
export default function Employees(props) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const URL = `/api/employees/`;
    const promise = Axios.get(URL)
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.log('Error fetching employees');
      });
  }, []);

  const mapEmployee = employees.map((employee) => {
    return (
      <Employee
        key={employee.id}
        id={employee.id}
        firstName={employee.firstname}
        lastName={employee.lastname}
        email={employee.email}
        pin={employee.pin}
        isAdmin={employee.is_admin}
        startDate={employee.start_date}
      />
    );
  });
  return (
    <div className="create-employee-container">
      <CreateEmployee setEmployees={setEmployees}></CreateEmployee>
      <ManagerNav></ManagerNav>
      <div className="employees-titles">
        <h3 className="employees-h3 employees-titles-id">ID</h3>
        <h3 className="employees-h3 employees-titles-firstname">First Name</h3>
        <h3 className="employees-h3 employees-titles-lastname">Last Name</h3>
        <h3 className="employees-h3 employees-titles-email">Email</h3>
        <h3 className="employees-h3 employees-titles-pin">PIN</h3>
        <h3 className="employees-h3 employees-titles-is-admin">Is Admin</h3>
        <h3 className="employees-h3 employees-titles-employee-since">
          Start Date:
        </h3>
      </div>
      {mapEmployee}
    </div>
  );
}
