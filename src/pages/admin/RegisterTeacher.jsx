
// import { useState } from 'react';
// import { api } from '../../api';
// export default function RegisterTeacher(){
//   const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
//   const [msg,setMsg]=useState('');
//   const submit = async e => {
//     e.preventDefault();
//     const {data} = await api.post('/teachers',{name,email,password});
//     setMsg(`Created teacher ${data.name}`);
//     setName(''); setEmail(''); setPassword('');
//   };
//   return (<form onSubmit={submit}>
//     <h3>Register Teacher</h3>
//     <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
//     <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
//     <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
//     <button>Create</button>
//     {msg && <div>{msg}</div>}
//   </form>);
// }


// src/pages/admin/RegisterTeacher.jsx
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

export default function RegisterTeacher() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const { data } = await api.post("/teachers", { name, email, password });
      setMsg(`Created teacher ${data.name}`);
      setName("");
      setEmail("");
      setPassword("");
    } catch (e) {
      setError(e.response?.data?.message || "Failed to create teacher");
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Register Teacher
      </Typography>

      {msg && <Alert severity="success">{msg}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      <Box
        component="form"
        onSubmit={submit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Create Teacher
        </Button>
      </Box>
    </Paper>
  );
}
