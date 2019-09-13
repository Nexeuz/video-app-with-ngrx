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
        path: 'admin',
        pages: {
          list_movies: {
            path: 'listar-peliculas'
          },
          create_movie: {
            path: 'crear-pelicula'
          },
          edit_movie: {
            path: 'editar-pelicula',
            pathParam: 'editar-pelicula/:id'
          },
        }
      }
    }
  };
}
