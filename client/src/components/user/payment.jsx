import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import './payment.css'

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, cartId, totalAmount, address, items } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({});

  const validateCardDetails = () => {
    let newErrors = {};

    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits long.";
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Expiry date must be in MM/YY format.";
    } else {
      const [month, year] = expiry.split("/").map(Number);
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;

      if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiry = "Expiry date cannot be in the past.";
      }
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = () => {
    if (!validateCardDetails()) {
      alert("Please correct the errors before proceeding.");
      return;
    }

    setTimeout(() => {
      alert("Payment Successful!");
      axios
        .post("http://localhost:9000/user/buy-product", {
          userId,
          cartId,
          items,
          totalAmount,
          paymentStatus: "Completed",
          address,
        })
        .then(() => {
          alert("Order Placed Successfully!");
          navigate("/userhome/order");
        })
        .catch((err) => {
          console.error("Error placing order:", err);
          alert("Order Failed. Please try again.");
        });
    }, 2000);
  };

  return (
    <Box className="payment-page">
      <Paper elevation={6} className="payment-container">
        <Typography variant="h4" className="title">Payment Details</Typography>
        <Typography variant="h6" className="amount">Total Amount: ₹{totalAmount}</Typography>

        <TextField
          label="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
          error={!!errors.cardNumber}
          helperText={errors.cardNumber}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 16 }}
        />

        <TextField
          label="Expiry Date (MM/YY)"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          error={!!errors.expiry}
          helperText={errors.expiry}
          fullWidth
          margin="normal"
          placeholder="MM/YY"
        />

        <TextField
          label="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
          error={!!errors.cvv}
          helperText={errors.cvv}
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 4 }}
        />

        <Button variant="contained" className="pay-button" onClick={handlePayment}>
          Pay Now
        </Button>
      </Paper>
    </Box>
  );
}
