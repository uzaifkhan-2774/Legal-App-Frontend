
import { Navigate, replace } from "react-router-dom";

const ProtectedRoute = ({children})=>{

    const user = JSON.parse(localStorage.getItem("user")) || "";

    if(!user || !user.token){
     return   <Navigate to={"/"} />
    }

    return children;     //we are returning component here.

}

export default ProtectedRoute;

