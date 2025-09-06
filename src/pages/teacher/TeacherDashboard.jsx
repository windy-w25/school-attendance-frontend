// src/pages/teacher/TeacherDashboard.jsx
import { useState, useEffect } from "react";
import { api } from "../../api";
import { useAuth } from "../../auth";
import StudentReport from "../reports//StudentReport";
import ClassReport from "../reports//ClassReport";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Paper,
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Alert,
  Stack,
  Tabs,
  Tab,
} from "@mui/material";

export default function TeacherDashboard() {
  const { logout } = useAuth();
  const [tabIndex, setTabIndex] = useState(0);

  // Attendance state
  const [className, setClassName] = useState("");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [msg, setMsg] = useState("");
  const [classes, setClasses] = useState([]);

    // Fetch classes on mount
    useEffect(() => {
      async function fetchClasses() {
        try {
          const { data } = await api.get("/classes");
          setClasses(data);
        } catch (e) {
          console.error("Failed to fetch classes", e);
        }
      }
      fetchClasses();
    }, []);

  // Load students
  const load = async () => {
    if (!className) return;
    const { data } = await api.get(
      `/classes/${encodeURIComponent(className)}/students`
    );
    if(data == ''){
       setMsg("This class has no students.");
        setTimeout(() => setMsg(""), 3000);
    }
    setStudents(data);
    setMarks(Object.fromEntries(data.map((s) => [s.id, "present"])));
  };

  // Submit attendance
  const submit = async () => {
    const payload = {
      class_name: className,
      date,
      marks: Object.entries(marks).map(([student_id, status]) => ({
        student_id,
        status,
      })),
    };
    try {
      await api.post("/attendance/mark", payload);
        setMsg("# Attendance saved");

    } catch (e) {
      setMsg(e.response?.data?.message || "Error saving attendance");

    }
            setTimeout(() => setMsg(""), 3000);
  };

  return (
    <>

      <Box sx={{ p: 3 }}>
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6">Teacher Dashboard</Typography>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Tabs
          value={tabIndex}
          onChange={(e, newIndex) => setTabIndex(newIndex)}
          sx={{ mb: 3 }}
        >
          <Tab label="Mark Attendance" />
          <Tab label="Student Report" />
          <Tab label="Class Report" />
        </Tabs>

        {tabIndex === 0 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Mark Attendance
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel>Class</InputLabel>
                <Select
                  value={className}
                  label="Class"
                  onChange={(e) => setClassName(e.target.value)}
                >
              {classes.map((c, index) => (
                <MenuItem key={index} value={c.class_name}>
                  {c.class_name}
                </MenuItem>
              ))}
            </Select>
              </FormControl>

              <TextField
                type="date"
                label="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                size="small"
                InputLabelProps={{ shrink: true }}
              />

              <Button variant="contained" onClick={load}>
                Load Students
              </Button>
            </Stack>


            {students.map((s) => (
              <Stack
                key={s.id}
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Typography sx={{ flex: 1 }}>{s.name}</Typography>
                <FormControl size="small">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={marks[s.id]}
                    label="Status"
                    onChange={(e) =>
                      setMarks({ ...marks, [s.id]: e.target.value })
                    }
                    sx={{ minWidth: 120 }}
                  >
                    <MenuItem value="present">Present</MenuItem>
                    <MenuItem value="absent">Absent</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            ))}

            {students.length > 0 && (
              <Button variant="contained" sx={{ mt: 2 }} onClick={submit}>
                Submit Attendance
              </Button>
            )}

            {msg && (
              <Alert
                severity={msg.startsWith("#") ? "success" : "error"}
                sx={{ mt: 2 }}
              >
                {msg}
              </Alert>
            )}
          </Paper>
        )}

        {tabIndex === 1 && <StudentReport />}

        {tabIndex === 2 && <ClassReport />}
      </Box>
    </>
  );
}
