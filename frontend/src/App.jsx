//import './App.css'

import { Route, Routes } from "react-router-dom";
import HomeLayout from "./components/home/HomeLayout";
import ProviderRegistrationForm from "./components/forms/ProviderRegistrationForm";
import WorkerRegistrationForm from "./components/forms/WorkerRegistrationForm";
import WorkerHome from "./components/worker/WorkerHomeLayout";
import ProviderHome from "./components/provider/ProviderHome";
import AdminHomeLayout from "./components/admin/AdminHomeLayout";
import VLCHomeLayout from "./components/vlc/VLCHomeLayout";
import LoginForm from "./components/forms/LoginForm";
import AddVLC from "./components/forms/VlcRegistrationForm";
import ProviderHomeLayout from "./components/provider/ProviderHomeLayout";
import JobDetails from "./components/provider/JobDetails";

function App() {
  return (
    <>
      <Routes>
      console.log(Running in {import.meta.env.NODE_ENV});
        {/* Main */}
        {/* <Route path="/" element={<AddVLC/>} /> */}
        {/* <Route path="/" element={<ProviderRegistrationForm/>} /> */}
        {/* <Route path="/" element={<VLCHomeLayout/>} /> */}
        <Route path="/" element={<HomeLayout />} />
        
        <Route path="/workerlayout" element={<WorkerHome/>} />

        <Route path="/providerlayout" element={<ProviderHomeLayout/>} />
        <Route path="/adminlayout" element={<AdminHomeLayout/>} />
        <Route path="/vlclayout" element={<VLCHomeLayout/>} />
        <Route path="/jobdetails" element={<JobDetails/>} />
        {/* Login */}
        <Route path="/login" element={<LoginForm/>} />

        {/* Registration Form */}
        {/* <Route path="/registerworker" element={<WorkerRegistrationForm/>} />
        <Route path="/registerprovider" element={<ProviderRegistrationForm/>} /> */} */

      </Routes>
    </>
  );
}

export default App;
