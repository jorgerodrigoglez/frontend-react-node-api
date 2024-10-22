import { createSlice } from '@reduxjs/toolkit';

/*const tempAnuncios = [
  {
    _id: 1,
    title: 'Vendo coche',
    description: 'Ford Taurus 2008, color rojo con llantas de aleación y aire acondicionado'
  },
  {
    _id: 2,
    title: 'Vendo casa',
    description: '300 m2, 6 habitaciones y 2 cocinas'
  },

]*/

export const anunciosSlice = createSlice({
  name: 'anuncio',
  initialState: {
    isLoadingAnuncios: true,
    //anuncios: tempAnuncios,
    anuncios: [],
    activeAnuncio: null,

  },
  reducers: {
    onSetActiveAnuncio: ( state , { payload }) => {
      state.activeAnuncio = payload;
    },
    onAddNewAnuncio: ( state, { payload }) => {
      state.anuncios.push( payload );
      state.activeAnuncio = null;
    },
    onLoadAnuncios: ( state, { payload = []} ) => {
      state.isLoadingAnuncios = false;
      state.anuncios = payload;

      /*payload.forEach( anuncio => {
          // devuelve true o false
          const exits = state.anuncios.some( anuncioDB => anuncioDB.id === anuncio.id );
          if( !exits ) {
            state.anuncios.push( anuncio );
          }
      });*/
      
    },
    onUpdateAnuncio: ( state, { payload }) => {
      state.anuncios = state.anuncios.map( anuncio => {
        //if(anuncio._id === payload._id){
          if(anuncio.id === payload.id){
            return payload;
          }
          return anuncio;
        });
      state.activeAnuncio = null;
    },
    onDeleteAnuncio: ( state ) => {
      //state.anuncios = state.anuncios.filter( anuncio => anuncio._id !== state.activeAnuncio._id );
      state.anuncios = state.anuncios.filter( anuncio => anuncio.id !== state.activeAnuncio.id );
      state.activeAnuncio = null;
    }
  }
})

export const { onSetActiveAnuncio, onAddNewAnuncio, onLoadAnuncios ,onUpdateAnuncio, onDeleteAnuncio } = anunciosSlice.actions
export default anunciosSlice.reducer