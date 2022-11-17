import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import AuthApi from "../../services/authApi";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Box, Card } from "@mui/material";
import '../../index.css';

const Index = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "testuser",
    password: "#X3z)A@bFYKa5ch6",
  });
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFieldChange = (event) => {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    setError(null);
    setIsProcessing(true);
    const { username, password } = formData;
    const resp = await AuthApi.login({ username, password });
    setIsProcessing(false);
    if (resp.success) {
      navigate("/movies");
    } else {
      setError(resp.response.data.error.message);
    }
  };

  return (
    <Grid>
      <Grid sx={{ mt: 10, fontSize: '20px', textColor: 'green' }}>
      <h1>Welcome To The Movie Zone</h1>
      </Grid>
      
      <Box sx={{ mt: 20, ml: 4, mr: 4 }}>
        <Card style={{ backgroundColor: "#E30B5C" }}>
          <Grid container spacing={2} padding={2}>
            {error && <h4>{error}</h4>}
            <form onSubmit={handleFormSubmit}>
              <Grid item xs={12} sm={12} md={12} lg={12} mt={4}>
                <TextField
                  sx={{ mt: 3, ml: 4, mr: 4 }}
                  autoFocus
                  fullWidth
                  type="text"
                  label="User Name"
                  placeholder="username"
                  name="username"
                  variant="outlined"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} mt={4}>
                <TextField
                  sx={{ mt: 3, ml: 4, mr: 4 }}
                  autoFocus
                  fullWidth
                  label="Password"
                  type="password"
                  placeholder="password"
                  name="password"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Button
                sx={{ mt: 3, ml: 4, mr: 4 }}
                color="primary"
                size="large"
                variant="contained"
                type="submit"
                startIcon={<LoginIcon />}
                disabled={
                  !formData.username.trim().length ||
                  isProcessing ||
                  !formData.password.trim().length
                }
              >
                Log In
              </Button>
            </form>
          </Grid>
        </Card>
      </Box>
    </Grid>
  );
};

export default Index;
