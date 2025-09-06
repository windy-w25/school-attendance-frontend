import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../../auth";
import RegisterStudent from "./RegisterStudent";
import RegisterTeacher from "./RegisterTeacher";
import Lists from "./Lists";
import StudentReport from "../reports//StudentReport";
import ClassReport from "../reports//ClassReport";

import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [tab, setTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <AppBar position="static" sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1 }}>
          <Typography variant="h6">Admin Dashboard</Typography>
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Box>
      </AppBar>

      {/* Tabs Navigation */}
      <Tabs
        value={tab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 2 }}
      >
        <Tab label="Register Student" />
        <Tab label="Register Teacher" />
        <Tab label="Lists" />
         <Tab label="Student Report" />
          <Tab label="Class Report" />
      </Tabs>

      {/* Content Area */}
      <Card>
        <CardContent>
          {tab === 0 && (
            <Box>
              <RegisterStudent />
            </Box>
          )}
          {tab === 1 && (
            <Box>
              <RegisterTeacher />
            </Box>
          )}
          {tab === 2 && (
            <Box>
              <Lists />
            </Box>
          )}
            {tab === 3 && (
            <Box>
              <StudentReport />
            </Box>
          )}
            {tab === 4 && (
            <Box>
              <ClassReport />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
