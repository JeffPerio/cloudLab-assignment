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

      //Dans le vrai monde ajouter une logique pour déterminer true ou false
      resolve(true);
      // ligne pour rejeter l'ajout
      // reject("Erreur lors de l'ajout du livre");
    });
  }


  alterBook(livre : InterfaceBook):Promise<boolean>{
    return new Promise<boolean>((resolve, reject) => {
      const currentBooks = this.booksSubject.value;
      // Trouver l'index du livre existant avec le même bookId
      const index = currentBooks.findIndex(book => book.bookId === livre.bookId);

      if (index !== -1) {
        // Remplacer le livre existant par le nouveau livre
        currentBooks[index] = livre;

        // Notifier les abonnés du changement dans la liste de livres
        this.booksSubject.next([...currentBooks]);

        // Dans le vrai monde, ajouter une logique pour déterminer true ou false
        resolve(true);
      } else {
        // Si aucun livre avec le même bookId n'est trouvé, rejeter la promesse
        reject("Livre non trouvé pour modification");
      }
    });
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}