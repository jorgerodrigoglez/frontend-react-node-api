import { Link } from "react-router-dom";
import { CalendarIcon } from '@heroicons/react/24/solid';
import { useAnuncioStore, useAuthStore } from "../../hooks";

export const MainPage = () => {

  // hook - 
  const{ anuncios, setActiveAnuncio } = useAnuncioStore();
  // hook - 
  const { startLogout, user } = useAuthStore();

  return (
    <div className="bg-white flex flex-col items-center">
      <h2 className="text-2xl text-center py-5 border w-full">Panel principal</h2>
      <h3>{user.name}</h3>

      <button 
        className="bg-gray-300 hover:bg-gray-400 text-gray-800  p-2 rounded"
        onClick={ startLogout }
      >
        Salir
      </button>

      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 my-4 rounded inline-flex items-center">
        {/* <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg> */}

        <CalendarIcon className="size-7"/>

        <Link className="ml-2" to='/form'>Formulario</Link>
      </button>

      {/* Todo: Muestra anuncios del store / activa el anuncio sobre el que se hace click */}

        {
          anuncios.map(anuncio => (
            <div 
              key={anuncio._id} 
        
            >
              <h1 className="text-4xl text-center py-2">{anuncio.title}</h1>
              <h2 className="text-2xl text-center py-2">{anuncio.description}</h2>
              <Link
                to='/form'
                className="bg-blue-500 p-2 mt-2 rounded w-36"
                onClick = { () => setActiveAnuncio(anuncio) }
              >
                Editar
              </Link>
              
            </div>
          ))
        }
        
    </div>
  )
}



