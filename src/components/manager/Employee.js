import './Employee.scss';

export default function Employee(props) {
  const formatDate = () => {
    return props.startDate.slice(0, 10);
  };
  const formatAdmin = () => {
    if (props.isAdmin) {
      return 'True';
    }
    return 'False';
  };
  return (
    <section className="employee-card">
      <div className="employee-card-id">{props.id}</div>
      <div className="employeee-card-firstname">{props.firstName}</div>
      <div className="employee-card-lastname">{props.lastName}</div>
      <div className="employee-card-email">{props.email}</div>
      <div className="employee-card-pin">{props.pin}</div>
      <div className="employee-card-is_admin">{formatAdmin()}</div>
      <div className="employee-card-start-date">{formatDate()}</div>
    </section>
  );
}
