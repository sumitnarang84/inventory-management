import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from './models/User';
import { Product } from './models/Product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "http://localhost:8080";
  private LOGIN_URL  = this.SERVER_URL + "/login";
  private PRODUCTS_URL  = this.SERVER_URL + "/products";
  private PRODUCT_URL   = this.SERVER_URL + "/products/{id}";
  

  constructor(private http: HttpClient) { }

  login (username, password): Observable<User> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<User>(this.LOGIN_URL, {"username" : username, "password" : password}, httpOptions)
      .pipe(
        //catchError(this.handleError('login', []))
      );
  }
  products (): Observable<Product> {
    if (localStorage.getItem("access_token") == null) {
      return;
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem("access_token")
      })
    };
    
    return this.http.get<Product>(this.PRODUCTS_URL, httpOptions)
      .pipe(
        //catchError(this.handleError('login', []))
      );
  }

  productById (id): Observable<Product> {
    if (localStorage.getItem("access_token") == null) {
      return;
    }
    
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem("access_token")
      })
    };

    return this.http.get<Product>(this.PRODUCT_URL.replace("{id}", id), httpOptions)
      .pipe(
        //catchError(this.handleError('login', []))
      );
  }

  addProduct(name, description): Observable<Product> {
    if (localStorage.getItem("access_token") == null) {
      return;
    }
    
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization' : localStorage.getItem("access_token")
      })
    };

    return this.http.post<Product>(this.PRODUCTS_URL, {"name" : name, "description" : description}, httpOptions)
      .pipe(
        //catchError(this.handleError('login', []))
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
  

}
