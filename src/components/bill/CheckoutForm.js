import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import axios from "axios";
import { sendBill, payBill, clearBill } from "./BillHelpers";
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
}) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    console.log(cost * 100);
    event.preventDefault();
    axios
      .get("/api/payments/secret", { params: { bill: cost * 100 } })
      .then((res) => {
        stripe
          .confirmCardPayment(res.data.client_secret, {
            payment_method: {
              card: elements.getElement(CardElement),
              billing_details: {
                name: "Jenny Rosen",
              },
            },
          })
          .then((result) => {
            if (result.error) {
              console.log(result.error.message);
            } else {
              if (result.paymentIntent.status === "succeeded") {
                window.alert("Payment Accepted");
                if (bill.items.length !== 0) {
                  sendBill(tableInfo, data).then((res) => {
                    console.log(res.data);
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
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  );
}
