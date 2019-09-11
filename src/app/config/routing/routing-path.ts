export class RoutingPath {
  public static appRouting = {
    modules: {
      dashboard: {
        path: 'dashboard',
        pages: {
          movie_detail: {
            path: 'detalle-pelicula',
            pathParam: 'detalle-pelicula/:id',
          },
          register: {
            path: 'registro',
          },
          login: {
            path: 'iniciar-sesion'
          },
          my_movies: {
            path: 'mis-peliculas',
          }
        }
      },
      admin: {
        path: 'admin'
      }
    }
  };
}
