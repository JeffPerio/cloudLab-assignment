import { Injectable } from '@angular/core';
import { InterfaceBook } from '../models/book/interfaceBook';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  //Url du webserveur, ici est le fichier JSON portant les data pour ne pas avoir besoin de setup le serveur dans le tuto
  private bookUrl = 'api/memos/memos.json';

  constructor(private http: HttpClient){}

  getBooks(): Observable<InterfaceBook[]>{
    return this.http.get<InterfaceBook[]>(this.bookUrl).pipe(catchError(this.handleError));
  }

  getBook(idBook: number):Observable<InterfaceBook | undefined>{
    return this.getBooks().pipe(map((books: InterfaceBook[]) => books.find(b => b.bookId === idBook)));
  }

  addBook(livre : InterfaceBook):boolean{
    let tailleInitiale = this.books.length;
    livre.bookId = tailleInitiale+1;
    this.books.push(livre);
    if(tailleInitiale + 1 === this.books.length)
      return true;
    return false;
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}