import { useSelector, useDispatch } from "react-redux";
import { anunciosApi } from "../api";
import { onAddNewAnuncio, onDeleteAnuncio, onLoadAnuncios, onSetActiveAnuncio, onUpdateAnuncio } from "../store";
import Swal from "sweetalert2";
//import { covertDates } from "../helpers/convertDates";

export const useAnuncioStore = () => {

    const{ anuncios, activeAnuncio } = useSelector( state => state.anuncios );
    const{ user } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const setActiveAnuncio = ( anuncio ) => {
       dispatch( onSetActiveAnuncio( anuncio ));
    }

    const startSavingAnuncio = async( anuncio ) => {

        try {
            //crear o actualizar
            // ACTUALIZAR
            // if(anuncio._id){
            if(anuncio.id){
                // actualizar
                await anunciosApi.put(`/anuncios/${anuncio.id}`, anuncio );
                dispatch( onUpdateAnuncio({ ...anuncio }) );
                return;
            }
    
            // CREAR NUEVO
            // enviar data a DDBB
            const { data } = await anunciosApi.post('/anuncios', anuncio );
            //console.log({ data });
            //cambiar el _id, mandar id para DDBB
            //dispatch( onAddNewAnuncio({ ...anuncio, _id: new Date().getTime() }) );
            dispatch( onAddNewAnuncio({ ...anuncio, id: data.anuncio.id, user }) );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data?.msg,'error')
        }
    }
    // todo: listar anuncios por usuario
    const startLoadingUserAnuncios = async() => {
        try {
            const { data } = await anunciosApi.get(`/anuncios/${user.uid}` );
            console.log({ data });  
            //const anuncios = covertDates( data.anuncios );
            //console.log(anuncios);
            dispatch( onLoadAnuncios ( data.anuncios ));
        } catch (error) {
            console.log('Error cargando anuncios de usuario');
            console.log(error);
        }
    }

    // listar todos los anuncios de DDBB
    const startLoadingAnuncios = async() => {
        try {
            const { data } = await anunciosApi.get('/anuncios/list');
            //console.log({ data });  
            //const anuncios = covertDates( data.anuncios );
            //console.log(anuncios);
            dispatch( onLoadAnuncios ( data.anuncios ));
        } catch (error) {
            console.log('Error cargando anuncios');
            console.log(error);
        }
    }

    // eliminar anuncio
    const deleteAnuncio = async() => {
        try {
            await anunciosApi.delete( `/anuncios/${activeAnuncio.id}`);
            dispatch( onDeleteAnuncio() );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data?.msg,'error')
        }
    }


    return{
        //* propiedades
        anuncios,
        activeAnuncio,
        //* metodos
        setActiveAnuncio,
        startSavingAnuncio,
        startLoadingUserAnuncios,
        startLoadingAnuncios,
        deleteAnuncio,
    }
}