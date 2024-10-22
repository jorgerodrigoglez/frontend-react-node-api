import { parseISO } from 'date-fns';

 export const covertDates = ( anuncios = [] ) => {

    return anuncios.map(anuncio => {

        anuncio.start = parseISO ( anuncio.start );
        anuncio.end = parseISO( anuncio.end );

        return anuncio;
    });
}