import React from "react";
import "./PayPopUp.scss";
import { CheckoutForm } from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51I6MNvAlHHdCVPD0W6Rl7yFgLKHjawpkDlLJ7l2uBoOrvHX3lJAvY7dqBFrq26TzkBIO5QVXnwTE9HpXz5EdAQvq00Rg8M65td"
);
export default function PayPopUp({
  bill,
  tableInfo,
  data,
  items,
  seat,
  setBill,
  setTable,
}) {
  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close">&times; </span>
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
