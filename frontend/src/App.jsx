//import './App.css'

import { Route, Routes } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import LoginForm from "./components/forms/LoginForm";
import WorkerRegistrationForm from "./components/forms/WorkerRegistrationForm";
import ProviderRegistrationForm from "./components/forms/ProviderRegistrationForm";
import WorkerHome from "./components/worker/WorkerHome";
import ProviderHome from "./components/provider/ProviderHome";
import AdminHome from "./components/admin/AdminHome";
import VlcHome from "./components/vlc/VlcHome";

function App() {
  return (
    <>
      <Routes>
        {/* Main */}
        <Route path="/" element={<HomePage />} />
        <Route path="/worker" element={<WorkerHome/>} />
        <Route path="/provider" element={<ProviderHome/>} />
        <Route path="/admin" element={<AdminHome/>} />
        <Route path="/vlc" element={<VlcHome/>} />
        {/* Login */}
        <Route path="/login" element={<LoginForm/>} />

        {/* Registration Form */}
        <Route path="/registerworker" element={<WorkerRegistrationForm/>} />
        <Route path="/registerprovider" element={<ProviderRegistrationForm/>} />

      </Routes>
    </>
  );
}

export default App;
