import { useEffect } from "react";
import { Link } from "react-router-dom";
import { DocumentIcon } from '@heroicons/react/24/outline';
import { useAnuncioStore, useForm } from "../../hooks";

// valores iniciales del formulario
const initialForm = {
  title: "",
  description: "",
};

export const FormPage = () => {

  // hook para crear un nuevo anuncio en el store
  const { startSavingAnuncio, activeAnuncio, deleteAnuncio } = useAnuncioStore();
  //console.log(activeAnuncio);

  // hook para cambiar los valores del formulario
  const {
    formValues,
    setFormValues,
    handleInputChange,
  } = useForm( initialForm );

  // cargar el anuncio activo en el formulario para editarlo
  useEffect(() => {
    if( activeAnuncio !== null ){
      setFormValues({...activeAnuncio});
    }
  }, [activeAnuncio]);
  
  // submit del formulario - 
  // función async
  const onSubmit = async(e) => {
    e.preventDefault();
    // llamamos al hook para crear un nuevo anuncio en el stor
    await startSavingAnuncio(formValues);
     // limpia los campos del formulario
     setFormValues(initialForm);
  }

  // limpiar campos de formulario al cancelar edición


  return (
    <div className="bg-white flex flex-col items-center">
      <h2 className="text-2xl text-center py-5 border w-full">Formulario</h2>

      <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 my-4 rounded inline-flex items-center">
        {/* <svg
          className="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg> */}

        <DocumentIcon className="size-7"/>

        <Link className="ml-2" to='/'>Panel principal</Link>
      </button>

      {/* Formulario */}
      <form 
        className='flex flex-col border-solid w-3/6'
        onSubmit={onSubmit}
      >
        <label className="p-2 m-1 text-2xl">Título:</label>
        <input 
          type="text" 
          className="form-input px-2 py-2" 
          placeholder="Título"
          name="title"
          autoComplete="off"
          value={formValues.title}
          onChange={handleInputChange}
        />

        <label className="p-2 m-1 text-2xl">Descripción:</label>
        <textarea 
          className="form-textarea px-2 py-2" 
          rows="4" 
          cols="50"
          placeholder="Descripción"
          name="description"
          value={formValues.description}
          onChange={handleInputChange}
        />

        {
          (activeAnuncio)
          ? <>
              <button
                className="bg-blue-500 p-2 mt-2 rounded w-36"
              >
                Editar
              </button>
              <button 
                onClick={ deleteAnuncio } 
                className="bg-red-500 p-2 mt-2 rounded w-36"
              >
                Borrar
              </button>
              <button
                className="bg-red-900 p-2 mt-2 rounded w-36"
              >
                Cancelar
              </button>
            </>
          : <button className="bg-blue-500 p-2 mt-2 rounded w-36">Guardar</button>
        }

      </form>

    </div>
  );
};
