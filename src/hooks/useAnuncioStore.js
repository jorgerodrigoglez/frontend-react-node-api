import { useSelector, useDispatch } from "react-redux";
import { onAddNewAnuncio, onDeleteAnuncio, onSetActiveAnuncio, onUpdateAnuncio } from "../store";

export const useAnuncioStore = () => {

    const{ anuncios, activeAnuncio } = useSelector( state => state.anuncios );
    const dispatch = useDispatch();

    const setActiveAnuncio = ( anuncio ) => {
       dispatch( onSetActiveAnuncio( anuncio ));
    }

    const startSavingAnuncio = async( anuncio ) => {
        // todo: enviar al backend

        // todo: todo bien = crear o actualizar
        if(anuncio._id){
            // actualizar
            dispatch( onUpdateAnuncio({ ...anuncio }) );
        }else{
            // nuevo anuncio
            // todo: cambiar el _id, mandar id para DDBB
            dispatch( onAddNewAnuncio({ ...anuncio, _id: new Date().getTime() }) );
        }
    }

    // todo: eliminar anuncio
    const deleteAnuncio = () => {
        dispatch( onDeleteAnuncio() );
    }


    return{
        //* propiedades
        anuncios,
        activeAnuncio,
        //* metodos
        setActiveAnuncio,
        startSavingAnuncio,
        deleteAnuncio
    }
}