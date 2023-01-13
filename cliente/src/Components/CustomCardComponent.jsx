import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement, } from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_51MOOSdJHrgH4nSu1Z5wTonCsujKGaYjapPcfr5CySoa1HXWd88b2EzPUxFRhifvAYgD0Vpt7cEa62Wwk8C6AmlA500Rs2syP76')


const CheckOutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement) | elements.getElement(CardExpiryElement) | elements.getElement(CardCvcElement)
    })

    console.log("error: ", error)
    if (!error) {
      const { id } = paymentMethod
      console.log("paymentMethod: ", id, " - ", paymentMethod)
    } else {
      setError(error || "");
    }
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return <form onSubmit={handleSubmit}>
    <CardNumberElement id='CardNumberId' onChange={handleChange} />
    <CardExpiryElement id='CardExpirityId' />
    <CardCvcElement id='CardCvcId' />
    <button>
      enviar
    </button>
    {error && (
      <div className="card-error" role="alert">
        {error}
      </div>
    )}
  </form>
}

export const CustomCardComponent = () => {
  return (<Elements stripe={stripePromise}>
    <CheckOutForm />
  </Elements>
  );
}