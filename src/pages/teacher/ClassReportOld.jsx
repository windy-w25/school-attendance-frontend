import { useState } from "react";
import { api } from "../../api";
import {
  Box,
  TextField,
  Button,
  Alert,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ClassReport() {
  const [className, setClassName] = useState("");
  const [month, setMonth] = useState(new Date());
  const [report, setReport] = useState([]);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    try {
      setError("");
      // convert to YYYY-MM
      const formattedMonth = month.toISOString().slice(0, 7);

      const { data } = await api.get("/report/class", {
        params: { class_name: className, month: formattedMonth },
      });

         if(data ==''){
        setError("No data available.");
      }
      setReport(data);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load class report");
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Class Report
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Class Name"
          placeholder='e.g. "Grade 5"'
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          size="small"
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={["year", "month"]}
            label="Month"
            value={month}
            onChange={(newValue) => setMonth(newValue)}
            slotProps={{
              textField: { size: "small" },
            }}
          />
        </LocalizationProvider>

        <Button variant="contained" onClick={fetchReport}>
          Load Report
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {report.length > 0 && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Attendance Summary – {className} (
              {month.toISOString().slice(0, 7)})
            </Typography>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Student</b></TableCell>
                    <TableCell><b>Present</b></TableCell>
                    <TableCell><b>Absent</b></TableCell>
                    <TableCell><b>Total</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {report.map((r, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{r.student.name}</TableCell>
                      <TableCell>{r.present}</TableCell>
                      <TableCell>{r.absent}</TableCell>
                      <TableCell>{r.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
