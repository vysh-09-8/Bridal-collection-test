import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

export default function BuyerHome() {
  const [items, setItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowAlert(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      return;
    }
    
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/user/view-bridal-wear", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, [navigate]);

  if (showAlert) {
    return (
      <Container maxWidth="md" style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h4">🚨⚠️ Intruder Alert! ⚠️🚨</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Nice try, but you’re not supposed to be here. 🚫🔒
        </Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>
          Redirecting you to the login page in 3 seconds... ⏳🚪
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom align="center">
          Bridal Wear Collection
        </Typography>
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item._id}>
              <Card
                sx={{
                  maxWidth: 300,
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
                onClick={() => navigate(`/buyerhome/view-product/${item._id}`)}
              >
                <Box
                  sx={{
                    overflow: "hidden",
                    "&:hover img": {
                      transform: "scale(1.2)",
                      transition: "transform 0.5s ease-in-out",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="415"
                    image={`http://localhost:9000/${item.images[0]}`}
                    alt={item.religion}
                    onMouseOver={(e) => {
                      if (item.images[1]) e.target.src = `http://localhost:9000/${item.images[1]}`;
                    }}
                    onMouseOut={(e) => {
                      e.target.src = `http://localhost:9000/${item.images[0]}`;
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Name: {item.description[0].product}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    Price: Rs.{item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}