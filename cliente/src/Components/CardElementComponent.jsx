import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe('pk_test_51MOOSdJHrgH4nSu1Z5wTonCsujKGaYjapPcfr5CySoa1HXWd88b2EzPUxFRhifvAYgD0Vpt7cEa62Wwk8C6AmlA500Rs2syP76')


const CheckOutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    if (!error) {
      const { id } = paymentMethod
      console.log("paymentMethod: ", id, " - ", paymentMethod)
    }
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return <form onSubmit={handleSubmit}>
    <CardElement id='cardId' onChange={handleChange} />
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

export const CardElementComponent = () => {
  return (<Elements stripe={stripePromise}>
    <CheckOutForm />
  </Elements>
  );
}