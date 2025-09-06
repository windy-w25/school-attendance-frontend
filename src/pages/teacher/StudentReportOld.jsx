import { useState } from "react";
import { api } from "../../api";
import {
  Box,
  TextField,
  Button,
  Alert,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function StudentReport() {
  const [studentId, setStudentId] = useState("");
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const fetchReport = async () => {
    try {
        setError("");
        const { data } = await api.get(`/report/student/${studentId}`);
        setReport(data);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load report");
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Student Report
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          size="small"
        />
        <Button variant="contained" onClick={fetchReport}>
          Load Report
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {report && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h6">
              {report.student.name} ({report.student.class_name})
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              <b>Total Days:</b> {report.summary.total_days} |{" "}
              <b>Present:</b> {report.summary.present} |{" "}
              <b>Absent:</b> {report.summary.absent}
            </Typography>

            <Paper sx={{ mt: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>Date</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {report.records.map((r, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{r.date}</TableCell>
                      <TableCell>{r.status}</TableCell>
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
