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

export default function UserHome() {
  const [items, setItems] = useState([]); // Initialize items as an empty array
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the server
    axios
      .get("http://localhost:9000/user/view-jewellery-user")
      .then((res) => {
        console.log(res.data); // Log response to check structure
        setItems(res.data.jewellery || []); // Extract the jewellery array or set to an empty array
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const handleCardClick = (id) => {
    navigate(`/userhome/view-jewellery/${id}`); // Navigate to view-product with product ID
  };

  return (
    <>
      
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
                onClick={() => handleCardClick(item._id)} // Add onClick handler
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
                    image={`http://localhost:9000/${item.images[0]}`} // Show first image by default
                    alt={item.name}
                    onMouseOver={(e) => {
                      if (item.images[1])
                        e.target.src = `http://localhost:9000/${item.images[1]}`;
                    }}
                    onMouseOut={(e) => {
                      e.target.src = `http://localhost:9000/${item.images[0]}`;
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" component="div">
                 {item.name}
                  </Typography>
                  {/* <Typography variant="body2" color="text.primary">
                    Gender: {item.gender}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Color: {item.color}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Pieces: {item.pieces}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Weight: {item.weight}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Fit: {item.fit}
                  </Typography> */}
                  <Typography variant="h6" color="text.primary">
                   Rs.{item.price}
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
