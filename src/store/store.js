import { configureStore } from "@reduxjs/toolkit";
import anunciosSlice from "./anuncios/anuncioSlice";
import authSlice from "./auth/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        anuncios: anunciosSlice,
    }
})

