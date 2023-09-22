import { Injectable } from '@angular/core';
import { InterfaceBook } from '../models/book/interfaceBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  books:InterfaceBook[] = [{
    "bookTitle":"Livre1",
    "bookAuthor":"Auteur1",
    "bookImage":"assets/images/livre1.jpg"
  },
  {
    "bookTitle":"Livre2",
    "bookAuthor":"Auteur2",
    "bookImage":"assets/images/livre2.jpg"
  },
  {
    "bookTitle":"Livre3",
    "bookAuthor":"Auteur3",
    "bookImage":"assets/images/livre3.jpg"
  }]

  getBooks():InterfaceBook[]{
    return this.books;
  }
}
