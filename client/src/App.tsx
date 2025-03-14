import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Landing from "./pages/Landing";
import PatientRegister from "./pages/PatientRegister";
import InsurerRegister from "./pages/InsurerRegister";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import InsurerDashboard from "./pages/InsurerDashboard";

const App = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "patient") {
      setInitialRoute("/login?role=patient");
    } else if (role === "insurer") {
      setInitialRoute("/login?role=insurer");
    } else {
      setInitialRoute("/landing");
    }
  }, []);

  if (initialRoute === null) return null; 

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={initialRoute} replace />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/patient-register" element={<PatientRegister />} />
        <Route path="/insurer-register" element={<InsurerRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/insurer-dashboard" element={<InsurerDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
