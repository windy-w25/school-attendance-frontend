// import { useEffect, useState } from "react";
// import { api } from "../../api";

// export default function Lists() {
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);

//   useEffect(() => {
//     async function load() {
//       const s = await api.get("/students");
//       setStudents(s.data);
//       const t = await api.get("/teachers");
//       setTeachers(t.data);
//     }
//     load();
//   }, []);

//   return (
//     <div style={{ marginTop: 20 }}>
//       <h3>Students</h3>
//       <ul>
//         {students.map((s) => (
//           <li key={s.id}>
//             {s.name} — {s.class_name}
//           </li>
//         ))}
//       </ul>

//       <h3>Teachers</h3>
//       <ul>
//         {teachers.map((t) => (
//           <li key={t.id}>{t.name} ({t.email})</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { api } from "../../api";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

export default function Lists() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const s = await api.get("/students");
        setStudents(s.data);
        const t = await api.get("/teachers");
        setTeachers(t.data);
      } catch (err) {
        console.error("Failed to load lists", err);
      }
    }
    load();
  }, []);

  return (
    <Box sx={{ mt: 3 }}>
      {/* Students */}
      <Typography variant="h6" gutterBottom>
        Students
      </Typography>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Class</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.class_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Teachers */}
      <Typography variant="h6" gutterBottom>
        Teachers
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>ID</b></TableCell>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.name}</TableCell>
                <TableCell>{t.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

