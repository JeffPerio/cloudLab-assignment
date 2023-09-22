import { Component, OnInit } from '@angular/core';
import { InterfaceBook } from 'src/app/models/book/interfaceBook';
import { BookService } from 'src/app/services/bookservices.service';

@Component({
  selector: 'app-bibliotheque',
  templateUrl: './bibliotheque.component.html',
  styleUrls: ['./bibliotheque.component.css']
})
export class BibliothequeComponent implements OnInit {

  pageTitle: string = "Bibliothèque"
  imageLargeur: number = 50;
  imageMarge: number = 2;
  listeLivres!: InterfaceBook[];

  constructor(private bookService: BookService){}

  ngOnInit(): void {
    this.listeLivres = this.bookService.getBooks();
  }

}
