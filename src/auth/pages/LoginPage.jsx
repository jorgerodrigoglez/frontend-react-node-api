import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, useAuthStore } from "../../hooks";
import Swal from "sweetalert2";

// valores iniciales del formulario
const initialForm = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  // Hook valores del formulario
  const { formValues, handleInputChange, setFormValues } = useForm( initialForm );
  // Hook para realizar peticiones al authStore
  const { startLogin, errorMessage } = useAuthStore();
  
  // submit del formulario - 
  // función async
  const onSubmit = async( e ) => {
    e.preventDefault();
    //console.log( formValues );
    startLogin( {email:formValues.email, password:formValues.password} )
    setFormValues(initialForm);
  }

  // muestra el mensaje de error con sweetalert2
  useEffect(() => {
    if( errorMessage !== undefined ){
      Swal.fire('Error en la autenticación', errorMessage, 'error' );
    }
  
  }, [errorMessage]);
  

  return (

    <div className="bg-white flex flex-col items-center">

      <h2 className="text-2xl text-center py-5 border w-full">Login</h2>

        {/* Formulario */}
        <form 
          className='flex flex-col border-solid w-3/6'
          onSubmit={onSubmit}
        >
          <label className="p-2 m-1 text-2xl">Email:</label>
          <input 
            type="email" 
            className="form-input px-2 py-2" 
            placeholder="Email"
            name="email"
            autoComplete="off"
            value={formValues.email}
            onChange={handleInputChange}
          />

          <label className="p-2 m-1 text-2xl">Contraseña:</label>
          <input
            type="password"
            className="form-textarea px-2 py-2" 
            placeholder="Contraseña"
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          
          <button className="bg-blue-500 p-2 mt-2 rounded w-36">Login</button>

          <Link className="m-2" to="/auth/register">Ir al registro</Link>

      </form>
    </div>
  )

}
