import React, { useEffect, useRef, useState } from "react";
import { AppBar, Toolbar, Button, Container, TextField, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import wedding1 from "../assets/wedding1.jpg";
import wedding2 from "../assets/wedding2.jpeg";
import axios from "axios";


gsap.registerPlugin(ScrollTrigger);

export default function Homepage() {
  const carouselRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (carouselRef.current) {
      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
    }

    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
        }});
    }
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validateForm = () => {
    let valid = true;
    const tempErrors = {};

    if (!name.trim()) {
      valid = false;
      tempErrors.name = "Name is required.";
    }

    if (!email.trim()) {
      valid = false;
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      valid = false;
      tempErrors.email = "Please enter a valid email.";
    }

    if (!message.trim()) {
      valid = false;
      tempErrors.message = "Message is required.";
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      axios
        .post("http://localhost:9000/user/addContact", { name, email, message })
        .then((response) => {
          console.log("Message sent successfully:", response.data);
          alert(response.data)
          // Optionally clear the form after successful submission
          setName("");
          setEmail("");
          setMessage("");
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };

  return (
    <div>
      {/* Navbar */}
      <AppBar position="absolute" sx={{ width: "60%", left: "50%", transform: "translateX(-50%)", background: "rgba(255, 255, 255, 0.6)", boxShadow: "none", display: "flex", justifyContent: "center", borderRadius: "50px" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button color="inherit" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Home</Button>
          <Button color="inherit" onClick={() => scrollToSection(aboutRef)}>About</Button>
          <Button color="inherit" onClick={() => scrollToSection(contactRef)}>Contact</Button>
          <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section with GSAP Carousel */}
      <motion.div ref={carouselRef} style={{ position: "relative" }}>
        <img src={wedding1} alt="Wedding" style={{ width: "100%", height: "100vh", objectFit: "fill" }} />
        <Typography variant="h3" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "white", fontWeight: "bold", fontFamily: "cursive" }}>
          Bridal Collection
        </Typography>
      </motion.div>

      {/* About Section */}
      <Container sx={{ my: 5 }} ref={aboutRef}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", color: "#333", mb: 3 }}>
          About Us
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ textAlign: "justify", lineHeight: 1.6 }}>
              Discover the elegance of our wedding collections. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Neque placeat quasi aliquam soluta similique officia mollitia harum odio
              qui consequatur esse corrupti iusto non dolores possimus tenetur, quis ut fuga.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.img 
              src={wedding2} 
              alt="Wedding 2" 
              style={{ width: "100%", borderRadius: "10px", boxShadow: "0px 4px 15px rgba(0,0,0,0.1)" }} 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Contact Section */}
      <Container sx={{ my: 5 }} ref={contactRef}>
        {/* Section Title */}
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}>
          Contact Us
        </Typography>

        {/* Contact Form Container */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3, backdropFilter: "blur(10px)", background: "rgba(255, 255, 255, 0.7)", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}>
            <Grid container spacing={3}>
              {/* Contact Details */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom sx={{ color: "#1976d2", fontWeight: "bold" }}>
                  Our Contact Details
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>📞 Phone: +123 456 7890</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>📧 Email: contact@weddingcollections.com</Typography>
                <Typography variant="body1">📍 Address: 123 Wedding Street, Bridal City</Typography>
              </Grid>

              {/* Contact Form */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  margin="normal"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  error={!!errors.message}
                  helperText={errors.message}
                  required
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, borderRadius: 2, fontWeight: "bold", transition: "0.3s", "&:hover": { bgcolor: "#1565c0" } }}
                  onClick={handleSubmit}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>

      {/* Footer */}
      <Paper sx={{ p: 3, textAlign: "center", mt: 5 }}>
        <Typography>&copy; 2025 Wedding Collections. All Rights Reserved.</Typography>
      </Paper>
    </div>
  );
}
