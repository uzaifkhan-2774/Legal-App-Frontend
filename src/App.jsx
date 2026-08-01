import Login from "./Pages/Login"
import ProtectedRoute from "./ProtectedRoute"
import Register from "./Pages/Register"
import AdminDashboard from "./Pages/AdminDashboard"
import ClientDashboard from "./Pages/ClientDashboard"
import LawyerDashboard from "./Pages/LawyerDashboard"
import Dashboard from "./Pages/Dashboard"
import NotFound from "./NotFound"
import LawyerProfile from "./Pages/LawyerProfile"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
function App() {


  return (
    <>
  <BrowserRouter>
  <ToastContainer/>
  <Routes>

    <Route path="/" element = {<Login/>}/>
    <Route path = "/register" element = {<Register/>}/>
    <Route path = "/profile" element = {<LawyerProfile/>}/>

    <Route path = "/dashboard" element = {<Dashboard/>}/>

    <Route path="*" element = {<NotFound/>}/>


    {/* admin-dashboard route */}
    <Route path = "/admin-dashboard" element = {
      <ProtectedRoute>
      <AdminDashboard/>
      </ProtectedRoute>
    }/>

        {/* client-dashboard route */}
      <Route path="/client-dashboard" element = {
        
         <ProtectedRoute>
        <ClientDashboard/>
        </ProtectedRoute>
      }/>


          {/* Lawyer-dashboard route */}
      <Route path="/lawyer-dashboard" element = {
        <ProtectedRoute>
          <LawyerDashboard/>
        </ProtectedRoute>
        }/>

  </Routes>
  </BrowserRouter>

    </>
  )
}

export default App
