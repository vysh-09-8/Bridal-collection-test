import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material"; // Import MUI components

export default function ViewAuction() {
  const [auction, setAuction] = useState([]);

  useEffect(() => {
    // Fetch auction details from backend
    axios
      .get("http://localhost:9000/admin/viewauction")
      .then((res) => {
        console.log(res.data);
        setAuction(res.data); // Set the auction details into state
      })
      .catch((err) => {
        console.error("Error fetching auction details:", err);
      });
  }, []);

  const handleResponse = (auctionId, actionType, email, auctionAmount) => {
    console.log(`Sending response for auction ${auctionId}, action: ${actionType}, email: ${email}`);
    axios
      .post("http://localhost:9000/admin/response", {
        auctionId: auctionId,
        actionType: actionType,
        email: email,
        amount: auctionAmount,
      })
      .then((res) => {
        alert("Response sent successfully.");
      })
      .catch((err) => {
        console.error("Error sending response:", err);
        alert("Error sending response.");
      });
  };

  return (
    <div className="auction-container">
      {auction.length === 0 ? (
        <Typography variant="h6">No auctions found.</Typography>
      ) : (
        <Grid container spacing={2} mt={5}>
          {auction.map((item) => (
            <Grid item xs={10} sm={8} md={6} key={item._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Product ID: {item.productId._id}</Typography>
                  <Typography variant="body1">
                    User Name: {item.userId.firstName} {item.userId.lastName}
                  </Typography>
                  <Typography variant="body1">
                    Starting Bid: Rs. {item.productId.auctionAmount}
                  </Typography>
                  <Typography variant="body1">
                    Auction Amount: Rs. {item.auctionAmount}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Created At: {new Date(item.createdAt).toLocaleString()}
                  </Typography>

                  {/* Conditionally render the accept button if auction status is not 'accept' */}
                  {item.status !== "accept" && (
                    <div style={{ marginTop: "10px" }}>
                      <Button
                        onClick={() => handleResponse(item._id, "accept", item.userId.email, item.auctionAmount)}
                        variant="contained"
                        color="success"
                        style={{ marginRight: "10px" }}
                      >
                        Accept
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
