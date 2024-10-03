import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const stripePromise = loadStripe(
  "pk_test_51Q5nNvBT9N4ULFVlxor5SFPqQrWKXy5TSuJ3wKrA2g0tRl0pVl2lu39eRAXl0TGyLj9tvZNGrhwitze53bEui5p70006qN0KW0"
);

function App() {
  const [token, setToken] = useState(null);

  return (
    <Elements stripe={stripePromise}>
      <div className="App">
        <h1>Simple Payment Form</h1>
        {!token ? (
          <>
            <LoginForm setToken={setToken} />
            <RegisterForm />
          </>
        ) : (
          <PaymentForm token={token} />
        )}
      </div>
    </Elements>
  );
}

export default App;
