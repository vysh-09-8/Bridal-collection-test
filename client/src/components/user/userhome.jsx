import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function UserHome() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUnauthorized, setIsUnauthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsUnauthorized(true);
      setTimeout(() => navigate("/login"), 3000);
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

  if (isUnauthorized) {
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

  const handleCardClick = (id) => {
    navigate(`/userhome/view-product/${id}`);
  };

  const filteredItems = items.filter((item) =>
    item.description[0].product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.occassion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom align="center">
          Bridal Wear Collection
        </Typography>

        <Box mb={3} display="flex" justifyContent="center">
          <TextField
            label="Search by Name or Occasion"
            variant="outlined"
            fullWidth
            sx={{
              maxWidth: 400,
              backgroundColor: "#f9f9f9",
              borderRadius: "50px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                "& fieldset": { borderColor: "#ccc" },
                "&:hover fieldset": { borderColor: "#007BFF" },
                "&.Mui-focused fieldset": { borderColor: "#007BFF" },
              },
              "& .MuiInputBase-input": { padding: "10px 14px" },
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "#007BFF" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item._id}>
              <Card
                sx={{
                  maxWidth: 300,
                  "&:hover": { transform: "scale(1.05)", transition: "0.3s ease-in-out" },
                }}
                onClick={() => handleCardClick(item._id)}
              >
                <Box sx={{ overflow: "hidden", "&:hover img": { transform: "scale(1.2)", transition: "0.5s ease-in-out" } }}>
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
                  <Typography variant="h6">Name: {item.description[0].product}</Typography>
                  <Typography variant="h6" color="text.primary">Price: Rs.{item.price}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}