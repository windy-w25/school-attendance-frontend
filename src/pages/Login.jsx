import { useState } from "react";
import { useAuth } from "../auth";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Paper,
} from "@mui/material";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      // user from localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      if (user.role === "admin") {
        window.location.href = "/admin";
      } else if (user.role === "teacher") {
        window.location.href = "/teacher";
      } else {
        window.location.href = "/login";
      }
    } catch (e) {
      console.error("Login error:", e.response?.data || e.message);
      setErr("Invalid credentials");
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 8, borderRadius: 3 }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        School Attendance – Login
      </Typography>

      {err && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {err}
        </Alert>
      )}

      <Box component="form" onSubmit={submit} sx={{ display: "grid", gap: 2 }}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" size="large">
          Sign In
        </Button>

        <Typography variant="body2" color="text.secondary" align="center">
          Try <b>admin@school.com / password</b> or{" "}
          <b>teacher@school.com / password</b>
        </Typography>
      </Box>
    </Paper>
  );
}
