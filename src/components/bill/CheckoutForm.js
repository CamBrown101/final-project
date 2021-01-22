import React from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import CardSection from "./CardSection";
import axios from "axios";

export function CheckoutForm({ cost }) {
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
