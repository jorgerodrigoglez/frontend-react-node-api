import { useSelector, useDispatch } from "react-redux";
import { anunciosApi } from "../api";
import { onChecking, onLoging, onLogout, clearErrorMessage } from "../store";

export const useAuthStore = () => {
  const { status,user,errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // login
  const startLogin = async ({ email, password }) => {
    //console.log({ email, password });
    dispatch(onChecking());

    try {
      const { data } = await anunciosApi.post("/auth", { email, password });
      //console.log({resp});
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLoging({ name: data.name, uid: data.uid }));
    } catch (error) {
        dispatch( onLogout('Credenciales incorrectas'));
        setTimeout(() => {
            dispatch(clearErrorMessage());
        },10);
    }
  };

  // register
  const startRegister = async ({ name, email, password }) => {
    //console.log({ email, password });
    dispatch(onChecking());

    try {
      const { data } = await anunciosApi.post("/auth/new", { name, email, password });
      //console.log({resp});
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLoging({ name:data.name, uid:data.uid }));
    } catch (error) {
        dispatch( onLogout( error.response.data?.msg || '--' ) );
        setTimeout(() => {
            dispatch(clearErrorMessage());
        },10);
    }
  };

  // mantener autenticación mediante el token
  // router/AppRoutes.jsx
  const checkAuthToken = async() => {
    const token = localStorage.getItem('token');
    if(!token) return dispatch(onLogout());

    try {
      const { data } = await anunciosApi.get('auth/renew');
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(onLoging({ name:data.name, uid:data.uid }));
      
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }

  }

  // logout
  const startLogout = () => {
    localStorage.clear();
    dispatch( onLogout() );
  }

  return {
    // propiedades
    status,
    user,
    errorMessage,
    // métodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  };
};
