//import './App.css'
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";

import WorkerRegistrationForm from "./components/forms/WorkerRegistrationForm";
import AdminHomeLayout from "./components/Admin/AdminHomeLayout";
import VLCHomeLayout from "./components/VLC/VLCHomeLayout";
import HomeLayout from "./components/HomeLayout";
import ProviderRegistrationForm from "./components/forms/ProviderRegistrationForm";
import WorkerHomeLayout from "./components/Worker/WorkerHomeLayout";
import JobProviderLayout from "./components/Provider/JobProviderLayout";
//import AddVLC from "./components/Admin/AddVLC";


function App() {

  return (
    <>
         {/* <h1>Welcome to eRozgaar connect</h1>  */}
        
        <Routes>
          {/* <Route path="/" element={<VLCHomeLayout/>}/> */}
          {/* <Route path="/" element={<AdminHomeLayout/>}/> */}
          <Route path="/workerregistration" element={<WorkerRegistrationForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/providerregistration" element={<ProviderRegistrationForm/>}/>

          <Route path="/" element={<HomeLayout/>}/>

          <Route path="/worker" element={<WorkerHomeLayout/>}/>
          <Route path="/provider" element={<JobProviderLayout/>}/>
          <Route path="/admin" element={<AdminHomeLayout/>}/>
          <Route path="/vlc" element={<VLCHomeLayout/>}/>

          <Route path="/vlc" element={<VLCHomeLayout/>}/>

          {/* <Route path="/" element={<AddVLC/>}/> */}

        </Routes> 
    </>
  )
}

export default App
