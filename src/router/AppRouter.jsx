
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/router";
import { PanelRoutes } from "../panel/router";
import { useAuthStore } from "../hooks";
// helper para variables de entorno
//import { getEnvVariables } from "../helpers/getEnvVariables";


export const AppRouter = () => {

  //const authStatus = 'not-authenticated';

  //captación de variables de entorno
  //console.log( getEnvVariables());

  // hook
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if( status == 'checking' ) {
    return(
      <h3>Cargando...</h3>
    )
  }
  
  return (
    <Routes>
      {
        ( status === 'not-authenticated')
        ? <Route path="/auth/*" element={ <AuthRoutes /> } />
        : <Route path='/*' element={ <PanelRoutes/> } /> 
      }
      {/* Ruta si no encuentra ruta */}
      <Route path='/*' element={ <Navigate to='/auth/login'/> } />

      {/* {
        ( status === 'not-authenticated')
        ? 
        (
          <>
            <Route path="/auth/*" element={ <AuthRoutes /> } />
            <Route path='/*' element={ <Navigate to='/auth/login'/> } />
          </>

        )
        : 
        (
          <>
            <Route path='/' element={ <PanelRoutes/> } /> 
            <Route path='/*' element={ <Navigate to='/'/> } />
          </>
        )
      } */}

    </Routes>
  )
}



