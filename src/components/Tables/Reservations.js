import './Reservations.scss';
import ReservationsNav from './ReservationsNav';
import ReservationsForm from './ReservationsForm';
export default function Reservations(props) {
  return (
    <div className="reservations-containter">
      <ReservationsNav></ReservationsNav>
      <ReservationsForm></ReservationsForm>
    </div>
  );
}
