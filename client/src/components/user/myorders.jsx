import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Select, MenuItem } from "@mui/material";
import Navbar from "./Navbar";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem("userid");

  useEffect(() => {
    fetchOrders();
    const handlePopState = () => {
        window.history.pushState(null, null, window.location.href);
      };
  
      window.history.pushState(null, null, window.location.href); // Push a new state into history
      window.addEventListener("popstate", handlePopState); // Listen to popstate to prevent going back
  
      // Cleanup the event listener
      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
  }, []);

  // Fetch user orders from backend
  const fetchOrders = () => {
    axios.get(`http://localhost:9000/user/my-orders`, { headers: { userid: userId } })
      .then((res) => {
        console.log("Fetched Orders:", res.data);
        setOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  };

  // Update order status dynamically
//   const handleStatusChange = (orderId, newStatus) => {
//     axios.put("http://localhost:9000/user/update-order-status", { orderId, status: newStatus })
//       .then((res) => {
//         console.log("Order status updated:", res);
//         fetchOrders(); // Refresh the orders after update
//       })
//       .catch((err) => console.error("Error updating status:", err));
//   };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>My Orders</Typography>
    <Button href="/userhome">Back to Home</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><b>Order ID</b></TableCell>
              <TableCell><b>Total Amount</b></TableCell>
              <TableCell><b>Address</b></TableCell>
              <TableCell><b>Payment Status</b></TableCell>
              <TableCell><b>Shipping Status</b></TableCell>
              <TableCell>Delivery Date</TableCell>
              {/* <TableCell><b>Update Status</b></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">No orders found.</TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>Rs. {order.totalAmount}</TableCell>
                  <TableCell>{order.deliveryAddress}</TableCell>
                  <TableCell>{order.paymentStatus}</TableCell>
                  <TableCell>{order.shippingStatus}</TableCell>
                  <TableCell>{order.expectedDate}</TableCell>
                  {/* <TableCell>
                    <Select
                      value={order.shippingStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      sx={{ width: 150 }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Shipped">Shipped</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                      <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                  </TableCell> */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
