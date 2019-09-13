import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../../../core/models/movie';
import {AppConfig} from '../../../config/app/app-config';

@Injectable()
export class AdminService {

  private BASE_URL = AppConfig.BASE_URL();
  firstTime = 0;
  constructor(private  http: HttpClient) {
  }

  getMovieList(pageNumber?): Observable<Movie[]> {
    if (this.firstTime === 0) {
      this.firstTime++;
      return this.http.get<Movie[]>(this.BASE_URL + '/movies');
    }
    const params = new HttpParams()
      .set('_page', `${pageNumber}`);
    return this.http.get<Movie[]>(this.BASE_URL + '/movies', {params});

  }

  deleteMovie(id): Observable<Movie[]> {
    return this.http.delete<Movie[]>(this.BASE_URL + '/movies/' + id);

  }



  createMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.BASE_URL + '/movies/', movie);
  }

  updateMovie(movie: Movie, id: number): Observable<Movie> {
    return this.http.put<Movie>(this.BASE_URL + '/movies/' + id, {...movie});
  }



}
