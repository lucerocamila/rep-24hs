import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {

  //accedo a name con use selector
  const userName = useSelector((state) => state.name);
  if (true) { //si user name es true
    return <Outlet />;
  } else {
    return <Navigate to="/" />; //si no a la ruta publica
  } 
}; 

export default ProtectedRoutes;
