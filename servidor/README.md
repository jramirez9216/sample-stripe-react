## How to run

1. Agregar el archivo `.env` configuration


# Stripe API keys - see https://stripe.com/docs/development/quickstart#api-keys
#Necsitas crear una cuenta en stripe para obtener estas claves
STRIPE_PUBLISHABLE_KEY=pk_test...
STRIPE_SECRET_KEY=sk_test...

# implementación front-end se usa la misma de cliente app. 
STATIC_DIR=../../cliente/html
```

2. Instalar dependencies y ejecutar el servidor

```
npm install
npm start
```

3. La interfaz de react se ejecutará en `localhost:4242`. Siga las instrucciones en el README allí para instalar e iniciar el servidor frontend.
