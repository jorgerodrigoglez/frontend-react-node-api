import { createSlice } from '@reduxjs/toolkit';

const tempAnuncios = [
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

]

export const anunciosSlice = createSlice({
  name: 'anuncio',
  initialState: {
    anuncios: tempAnuncios,
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
    onUpdateAnuncio: ( state, { payload }) => {
      state.anuncios = state.anuncios.map( anuncio => {
        if(anuncio._id === payload._id){
          return payload;
        }
        return anuncio;
      });
    },
    onDeleteAnuncio: ( state ) => {
      state.anuncios = state.anuncios.filter( anuncio => anuncio._id !== state.activeAnuncio._id );
      state.activeAnuncio = null;
    }
  }
})

export const { onSetActiveAnuncio, onAddNewAnuncio, onUpdateAnuncio, onDeleteAnuncio } = anunciosSlice.actions
export default anunciosSlice.reducer