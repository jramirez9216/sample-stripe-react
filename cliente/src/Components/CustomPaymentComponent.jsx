import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Box, Grid, styled, Typography, Divider, Button } from '@mui/material'


const Container = styled(Grid)(({ theme }) => ({
  margin: "0px 45px 0px 0px",
  display: 'grid !important',
  gridTemplateColumns: '50% 50%',
  gridAutoRows: '100vh !important',
  overflowY: 'hidden !important',
  '&::-webkit-scrollbar': {
    width: '0',
    background: 'transparent',
  },
  overflowX: 'hidden',
  position: 'fixed',
  top: 0,
  bottom: 0,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '50% 50%',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '50% 50%',
  },
}));

const CheckOutForm = () => {
  const stripe = useStripe()
  const elements = useElements()

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      // `Elements` Instancia que se utilizó para crear el elemento de pago
      elements,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });


    if (error) {
      setErrorMessage(error.message);
    } else {
      //TODO: SI ES CORRECTO DIRIGE A OTRA PAGINA
    }
  };

  return <form style={{
    display: 'flex',
    flexDirection: 'column'
  }} onSubmit={handleSubmit}>
    <PaymentElement options={{}} />
    {errorMessage && <Box sx={{ color: '#C21631', margin: '1em 0em', }}>{errorMessage}</Box>}
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '1em'
    }}>
      <Button type='submit' sx={{
        width: '285px',
        height: '48px',
        background: '#C21631',
        borderRadius: '100px',
        color: '#FFFFFF',
        border: '1px solid #C21631',
        margin: '1em 1em',
        ":hover": {
          background: '#C21631',
          color: '#FFFFFF',
          border: '1px solid #C21631',
        }
      }} variant='outlined' disabled={!stripe}>Enviar</Button>
    </Box>

  </form>
}

export const CustomPaymentComponent = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/config").then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (<Container>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      alignSelf: 'center'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '563px',
        minHeight: '500px',
        background: '#FFFFFF',
        boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.08)',
        borderRadius: '30px',
        padding: '1.5em',
      }}><Box sx={{
        display: "grid !important",
        gridTemplateColumns: "50% 50%",
        width: '100%',
        alignItems: "center",
        position: 'sticky',
        zIndex: 25,
      }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: "flex-start",
            alignItems: "center",
            zIndex: 25,
            paddingLeft: '15px',
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '13px',
            lineHeight: '130%',
          }}>
            <img alt='imageLogo' />
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: "flex-end",
            alignItems: "center",
            paddingRight: '20px',
            zIndex: 25,
          }}>
            <Typography sx={{
              fontStyle: 'normal',
              fontWeight: '600',
              fontSize: '17px',
              lineHeight: '20px',
              color: '#000000',
            }}>$2,000.00
              <span style={{
                fontStyle: 'normal',
                fontWeight: '600',
                fontSize: '11px',
                lineHeight: '13px',
                marginLeft: '0.5em'
              }}>MXN </span></Typography>
          </Box>
        </Box>
        <Divider sx={{ color: 'red', width: '100%', border: '0.5px solid #F80000', margin: '1em 0em', }} />
        {clientSecret &&
          <Elements stripe={stripePromise} options={{
            clientSecret,
            // appearance: {
            //   theme: 'stripe'
            // }
          }}>
            <CheckOutForm />
          </Elements>
        }
      </Box>
    </Box>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      alignSelf: 'center'
    }}>
      <Box sx={{
        display: 'grid',
        width: '352px',
        height: '300px',
        background: '#C21631',
        boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.08)',
        borderRadius: '10px',
        padding: '3em 2em',
      }}>
        <Typography sx={{
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '24px',
          lineHeight: '28px',
          color: '#FFFFFF',
          padding: '2.2em 0em'
        }} >Resumen de compra</Typography>
        <Typography sx={{
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '13px',
          lineHeight: '15px',
          color: '#FFFFFF',
        }}>Concepto</Typography>
        <Typography sx={{
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '17px',
          lineHeight: '20px',
          color: '#FFFFFF',
        }}>Plan Básico</Typography>
        <Typography sx={{
          fontStyle: 'normal',
          fontWeight: '500',
          fontSize: '13px',
          lineHeight: '15px',
          color: '#FFFFFF',
        }}>Monto total</Typography>
        <Typography sx={{
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '17px',
          lineHeight: '20px',
          color: '#FFFFFF',
        }}>$2,000.00
          <span style={{
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: '11px',
            lineHeight: '13px',
            marginLeft: '0.5em'
          }}>MXN </span></Typography>
      </Box>
    </Box>
  </Container >);
}