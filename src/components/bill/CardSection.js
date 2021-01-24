import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import './CardSection.scss';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

function CardSection() {
  return (
    <div className="card-input">
      <label>
        Card Details
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
    </div>
  );
}

export default CardSection;
