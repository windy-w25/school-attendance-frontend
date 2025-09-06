import { useState } from "react";
import { api } from "../../api";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Paper,
} from "@mui/material";

export default function RegisterStudent() {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const { data } = await api.post("/students", {
        name,
        class_name: className,
      });
      setMsg(`Created student #${data.name}`);
      setTimeout(() => setMsg(""), 3000);
      setName("");
      setClassName("");
    } catch (e) {
      setError(e.response?.data?.message || "Failed to create student");
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Register Student
      </Typography>

      {msg && <Alert severity="success">{msg}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <Box
        component="form"
        onSubmit={submit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
      >
        <TextField
          label="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          label='Class/Grade (e.g. "Grade 5")'
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Create Student
        </Button>
      </Box>
    </Paper>
  );
}
