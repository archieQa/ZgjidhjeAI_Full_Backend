import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = ({ token }) => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState("standard");
  const [message, setMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentMethod, error: stripeError } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: {
            email,
          },
        });

      if (stripeError) {
        console.error("Stripe error:", stripeError);
        setMessage(`Stripe error: ${stripeError.message}`);
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/payments/pay",
        {
          amount,
          paymentMethodId: paymentMethod.id,
          plan,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error(
        "Payment error:",
        error.response ? error.response.data : error.message
      );
      setMessage(
        `Payment failed: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <select value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="standard">Standard</option>
        <option value="premium">Premium</option>
      </select>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default PaymentForm;
