import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import AXIOS from 'axios';

export default function Registration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    const tempErrors = {};

    // First Name validation
    if (!formData.firstName) {
      valid = false;
      tempErrors.firstName = "First Name is required.";
    }

    // Last Name validation
    if (!formData.lastName) {
      valid = false;
      tempErrors.lastName = "Last Name is required.";
    }

    // Phone Number validation (basic format for a 10-digit phone number)
    const phonePattern = /^[0-9]{10}$/;
    if (!formData.phone) {
      valid = false;
      tempErrors.phone = "Phone Number is required.";
    } else if (!phonePattern.test(formData.phone)) {
      valid = false;
      tempErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    // Email validation
    if (!formData.email) {
      valid = false;
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      valid = false;
      tempErrors.email = "Please enter a valid email address.";
    }

    // Password validation
    if (!formData.password) {
      valid = false;
      tempErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      valid = false;
      tempErrors.password = "Password must be at least 6 characters.";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      valid = false;
      tempErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      valid = false;
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    // User Type validation
    if (!formData.userType) {
      valid = false;
      tempErrors.userType = "Please select a User Type.";
    }

    setErrors(tempErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with the registration request if the form is valid
      AXIOS.post("http://localhost:9000/user/register-user", formData)
        .then((res) => {
          alert(res.data);
          if (res.status === 200) {
            navigate("/login");
          }
        })
        .catch((error) => {
          alert("Error during registration. Please try again.");
        });
    }
  };

  // Navigate to login page
  const handleRegisterRedirect = () => {
    navigate("/login");
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: "50px",
        padding: "30px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        style={{ fontWeight: "bold", marginBottom: "20px", color: "#1976d2" }}
      >
        Create an Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
          </Grid>
          <TextField
            label="Phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />

          {/* User Type Dropdown */}
          <FormControl fullWidth required error={!!errors.userType}>
            <InputLabel>User Type</InputLabel>
            <Select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              label="User Type"
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="vendor">Vendor</MenuItem>
            </Select>
            {errors.userType && <FormHelperText>{errors.userType}</FormHelperText>}
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{
              backgroundColor: "#1976d2",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Register
          </Button>
        </Box>
      </form>
      <Typography
        variant="body2"
        align="center"
        style={{ marginTop: "20px", color: "#6c757d" }}
      >
        Already have an account?
        <span
          style={{
            color: "#1976d2",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={handleRegisterRedirect}
        >
          Login
        </span>
      </Typography>
    </Container>
  );
}
