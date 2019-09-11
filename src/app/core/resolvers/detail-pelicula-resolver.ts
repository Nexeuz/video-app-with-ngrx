import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {Injectable, NgZone} from '@angular/core';
import {MoviesService} from '../../modules/dashboard/services/movies.service';
import {catchError, map} from 'rxjs/operators';
@Injectable({providedIn: 'root'})
export class DetailPeliculaResolver implements Resolve<any> {
   constructor(private _MOVIES: MoviesService,
               private router: Router,
               private ngZone: NgZone) {

   }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this._MOVIES.getMovieById(route.paramMap.get('id'))
       .pipe(
         map(result => {
           if (!(Object.keys(result).length === 0) && result.constructor === Object) {
             return result;
           } else {
             this.ngZone.run(() => {
               this.router.navigate(['']);
             });
             return EMPTY;
           }
         }),
         catchError(err => {
           this.ngZone.run(() => {
             this.router.navigate(['']);
           });
           return EMPTY;
         })
       );
  }
}
