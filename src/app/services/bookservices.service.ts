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
    "bookImage":"assets/images/livre1.jpg",
    "bookPrice" : 10
  },
  {
    "bookTitle":"L'assassin Royal",
    "bookAuthor":"Robin Hobb",
    "bookImage":"assets/images/livre2.jpg",
    "bookPrice" : 15
  },
  {
    "bookTitle":"Eragon",
    "bookAuthor":"Christopher Paolini",
    "bookImage":"assets/images/livre3.jpg"
  }]

  getBooks():InterfaceBook[]{
    return this.books;
  }

  addBook(livre : InterfaceBook):boolean{
    var tailleInitiale = this.books.length;
    this.books.push(livre);
    if(tailleInitiale + 1 === this.books.length)
      return true;
    return false;
  }
}
