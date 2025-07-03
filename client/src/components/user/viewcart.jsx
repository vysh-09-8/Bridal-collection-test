import React, { useEffect, useState } from "react";
import axios from "axios";
import './cart.css';
import Navbar from "./navbar";
import { Modal, Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [address, setAddress] = useState("");
  const userId = sessionStorage.getItem("userid");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9000/user/viewcart`, { headers: { userid: userId } })
      .then((res) => {
        console.log("Fetched Cart Data:", res.data);
        setCart(res.data.length > 0 ? res.data[0] : null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <h1>Loading...</h1>;
  if (!cart || !cart.items || cart.items.length === 0) return <h1>Your cart is empty</h1>;

  const totalPrice = cart.items.reduce((total, item) => {
    const productDetail = cart.productDetails.find(p => p._id === item.productId);
    return productDetail ? total + item.quantity * productDetail.price : total;
  }, 0);

  // Function to remove an item from the cart
  const handleRemoveItem = (cartId, productId, size) => {
    axios.delete('http://localhost:9000/user/remove-from-cart', {
      data: { cartId, productId, size, userId },
    })
    .then((res) => {
      console.log("Item removed successfully", res);
      setCart(res.data.length > 0 ? res.data[0] : null);
    })
    .catch((err) => {
      console.error("Error removing item from cart:", err);
    });
  };

  // Function to update quantity dynamically
  const handleUpdateQuantity = (cartId, productId, size, newQuantity) => {
    axios.put(`http://localhost:9000/user/update-cart-quantity`, {
      cartId, productId, size, newQuantity, userId
    })
    .then((res) => {
      console.log("Quantity updated successfully", res);
      setCart((prevCart) => {
        if (!prevCart) return null;
        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity: newQuantity }
              : item
          ),
        };
      });
    })
    .catch((err) => {
      console.error("Error updating quantity:", err);
    });
  };

  const handlePlaceOrder = () => {
    setOpenModal(true);
  };

  const handleConfirmAddress = () => {
    setOpenModal(false);
    
    // Send the updated quantity to the payment page
    navigate(`/userhome/payment`, {
      state: {
        userId,
        cartId: cart._id,
        totalAmount: totalPrice,
        address,
        items: cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size
        }))
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="cart-container">
        <h1>Your Cart</h1>
        {cart.items.map((item) => {
          const productDetail = cart.productDetails.find(p => p._id === item.productId);
          if (!productDetail) return null;

          return (
            <div key={item._id} className="cart-sub-item">
              <img src={`http://localhost:9000/${productDetail.images[0]}`} alt={productDetail.occassion} className="cart-item-image" />
              <div className="cart-item-details">
                <h2>{productDetail.occassion}</h2>
                <p>Size: {item.size}</p>
                <p>Price: Rs. {productDetail.price}</p>
                <p>Total: Rs. {item.quantity * productDetail.price}</p>
                <div className="quantity-container">
                  <button
                    onClick={() => handleUpdateQuantity(cart._id, item.productId, item.size, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(cart._id, item.productId, item.size, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button className="remove-item-btn" onClick={() => handleRemoveItem(cart._id, item.productId, item.size)}>
                  Remove Item
                </button>
              </div>
            </div>
          );
        })}
        <div className="cart-total">
          <h2>Total Price: Rs. {totalPrice}</h2>
        </div>
        <div>
          <button className="btn buy-now" onClick={handlePlaceOrder}>Buy Now</button>
        </div>

        {/* Address Popup Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box className="modal-box">
            <h2>Enter Delivery Address</h2>
            <TextField
              fullWidth
              label="Delivery Address"
              multiline
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <Button variant="contained" onClick={handleConfirmAddress}>Proceed to Payment</Button>
          </Box>
        </Modal>
      </div>
    </>
  );
}
