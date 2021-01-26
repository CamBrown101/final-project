import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

import CardSection from './CardSection';
import Axios from '../../helpers/axios';
import { sendBill, payBill, clearBill } from './BillHelpers';
export function CheckoutForm({
  cost,
  bill,
  tableInfo,
  data,
  orderId,
  items,
  seat,
  setBill,
  setTable,
  setHidden,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    console.log(cost * 100);
    event.preventDefault();
    Axios.get('/api/payments/secret', { params: { bill: cost * 100 } }).then(
      (res) => {
        stripe
          .confirmCardPayment(res.data.client_secret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: 'Jenny Rosen',
              },
            },
          })
          .then((result) => {
            if (result.error) {
            } else {
              if (result.paymentIntent.status === 'succeeded') {
                window.alert('Payment Accepted');
                if (bill.items.length !== 0) {
                  sendBill(tableInfo, data).then((res) => {
                    payBill(orderId, [
                      ...items,
                      ...res.data.filter((item) => {
                        return item.seat_number === seat;
                      }),
                    ]).then(() => clearBill(setBill, setTable));
                  });
                } else {
                  payBill(orderId, items).then(() =>
                    clearBill(setBill, setTable)
                  );
                }
              }
            }
          });
      }
    );
  };

  return (
    <div className="stripe-container">
      <form className="stripe-form" onSubmit={handleSubmit}>
        <button
          onClick={(event) => {
            event.stopPropagation();

            setHidden(true);
          }}
          className="close">
          X
        </button>
        <CardSection setHidden={setHidden} />
        <div className="payment-buttons">
          <button className="confirmation-button button" disabled={!stripe}>
            Confirm Payment
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();

              setHidden(true);
            }}
            className="cancel-payment-button button"
            disabled={!stripe}>
            Cancel Payment
          </button>
        </div>
      </form>
    </div>
  );
}
