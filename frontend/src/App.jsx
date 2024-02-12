//import './App.css'
//import LoginForm from './components/forms/LoginForm'
import { Route, Routes } from 'react-router-dom'
import VlcHome from './components/vlc/VlcHome'
import ShowRequest from './components/vlc/VlcComponents/ShowRequest'
import Profile from './components/vlc/VlcComponents/Profile'
import RegisterWorker from './components/vlc/VlcComponents/RegisterWorker'

function App() {

  return (
    <>
        {/* <h1>Welcome to eRozgaar connect</h1>  */}
        {/* <LoginForm/>  */}
       {/* <WorkerRegistrationForm/> */}
       {/* <ProviderRegistrationForm/> */}
       <Routes>
        {/* Main */}
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/worker" element={<WorkerHome/>} />
        <Route path="/provider" element={<ProviderHome/>} />
        <Route path="/admin" element={<AdminHome/>} /> */}
        <Route path="/vlc" element={<VlcHome/>} /> 
        <Route path="/home" element={<VlcHome/>} />
        <Route path="/showRequest" element={<ShowRequest/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/registerWorker" element={<RegisterWorker/>} />



      </Routes>
    </>
  )
}

export default App
