import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppConfig} from '../../../config/app/app-config';
import {Observable} from 'rxjs';
import {Movie} from '../../../core/models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private BASE_URL = AppConfig.BASE_URL();

  constructor(private http: HttpClient) { }

  getMovieList(title?: string): Observable<Movie[]> {
    if (title) {
      const params = new HttpParams()
        .set('title', `${title }`);
      return this.http.get<Movie[]>(this.BASE_URL + '/movies', {params});
    }
    return this.http.get<Movie[]>(this.BASE_URL + '/movies');
  }

  getMovieById(id: string) {
    return  this.http.get<Movie | any | never>(`${this.BASE_URL}/movies/${id}`);
  }

  updateMovie(movie: Movie, id: number): Observable<Movie> {
    return this.http.put<Movie>(this.BASE_URL + '/my-movies/' + id, {...movie});
  }

  getMyMovieList(title?: string): Observable<Movie[]> {
    if (title) {
      const params = new HttpParams()
        .set('title', `${ title }`);
      return this.http.get<Movie[]>(this.BASE_URL + '/my-movies', {params});
    }
    return this.http.get<Movie[]>(this.BASE_URL + '/my-movies');
  }

  saveMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.BASE_URL + '/my-movies/', {...movie});
  }

  removeMovie(id: number): Observable<Movie> {
    return this.http.delete<Movie>(this.BASE_URL + '/my-movies/' + id);
  }
}
