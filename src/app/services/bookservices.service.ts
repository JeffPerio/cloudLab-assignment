import { Injectable } from '@angular/core';
import { InterfaceBook } from '../models/book/interfaceBook';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  //Url du webserveur, ici est le fichier JSON portant les data pour ne pas avoir besoin de setup le serveur
  private bookUrl = 'api/books/bookList.json';

  private booksSubject = new BehaviorSubject<InterfaceBook[]>([]);
  books$ = this.booksSubject.asObservable();

  constructor(private http: HttpClient){
    this.loadBooks();
  }

  loadBooks(): void {
    this.http.get<InterfaceBook[]>(this.bookUrl).pipe(
      catchError(this.handleError)
    ).subscribe(books => {
      this.booksSubject.next(books);
    });
  }

  getBooks(): Observable<InterfaceBook[]>{
    return this.books$;
  }

  getBook(idBook: number):Observable<InterfaceBook | undefined>{
    return this.getBooks().pipe(
      map((books: InterfaceBook[]) => books.find(b => b.bookId === idBook))
    );
  }

  addBook(livre : InterfaceBook):Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      const currentBooks = this.booksSubject.value;
      livre.bookId = currentBooks.length + 1;
      const newBooks = [...currentBooks, livre];
      this.booksSubject.next(newBooks);

      // Assumez que l'ajout du livre a réussi
      resolve(true);

      // En cas d'erreur, rejetez la Promise
      // reject("Erreur lors de l'ajout du livre");
    });
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