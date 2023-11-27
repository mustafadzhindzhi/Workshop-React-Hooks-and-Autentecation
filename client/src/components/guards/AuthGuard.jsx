import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react"
import AuthContext from "../../contexts/authContext.jsx"

export default function AuthGuard (props) {
    //Are you logged in?
    const {isAuthenticated} = useContext(AuthContext);

    if(!isAuthenticated) {
        return <Navigate to="/login"/>
    }

    return  <Outlet/>;

}