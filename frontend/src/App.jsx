//import './App.css'

import AddVLC from "./components/Admin/AddVLC"
import AdminHome from "./components/Admin/AdminHome"
import Profile from "./components/Admin/Profile"
import ProviderRequest from "./components/Admin/ProviderRequest"


function App() {

  return (
    <>
        <h1>Welcome to eRozgaar connect</h1> 
        <Routes>
          <Route path="/home" element={<AdminHome/>}/>
          <Route path="/showRequest" element={<ProviderRequest/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/addvlc" element={<AddVLC/>}/>
        </Routes> 
    </>
  )
}

export default App
