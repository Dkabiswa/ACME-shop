import { IProduct } from './product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productUrl: string = 'api/products/products.json'
  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap(data => console.log('service' + JSON.stringify(data))),
      catchError(this.handleError)
    ); 
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string = '';
    if(err.error instanceof ErrorEvent) {
      errorMessage = err.error.message;
    } else {
      errorMessage =`server code ${err.status} message: ${err.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}