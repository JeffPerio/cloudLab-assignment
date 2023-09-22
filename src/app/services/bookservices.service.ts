import { Injectable } from '@angular/core';
import { InterfaceBook } from '../models/book/interfaceBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  books:InterfaceBook[] = [{
    "bookTitle":"L'épée de vérité",
    "bookAuthor":"Terry Goodkind",
    "bookImage":"assets/images/livre1.jpg"
  },
  {
    "bookTitle":"L'assassin Royal",
    "bookAuthor":"Robin Hobb",
    "bookImage":"assets/images/livre2.jpg"
  },
  {
    "bookTitle":"Eragon",
    "bookAuthor":"Christopher Paolini",
    "bookImage":"assets/images/livre3.jpg"
  }]

  getBooks():InterfaceBook[]{
    return this.books;
  }
}
