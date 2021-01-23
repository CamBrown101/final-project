import React from 'react';
import './PayPopUp.scss';
import { CheckoutForm } from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51I6MNvAlHHdCVPD0W6Rl7yFgLKHjawpkDlLJ7l2uBoOrvHX3lJAvY7dqBFrq26TzkBIO5QVXnwTE9HpXz5EdAQvq00Rg8M65td'
);
export default function PayPopUp({
  bill,
  tableInfo,
  data,
  items,
  seat,
  setBill,
  setTable,
  cost,
  orderId,
  hidden,
  setHidden,
}) {
  return (
    <div className={hidden ? 'hidden modal' : 'modal'}>
      <div className="modal_content">
        <button
          onClick={(event) => {
            event.stopPropagation();

            setHidden(true);
          }}
          className="close">
          X
        </button>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            cost={bill.total}
            bill={bill}
            tableInfo={tableInfo}
            data={data}
            orderId={tableInfo.orderId}
            items={items}
            seat={seat}
            setBill={setBill}
            setTable={setTable}
          />
        </Elements>
      </div>
    </div>
  );
}
