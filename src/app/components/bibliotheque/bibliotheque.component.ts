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
  listeLivresFiltres: InterfaceBook[] = [];

  private _filtreListe: string = '';

  constructor(private bookService: BookService){}

  ngOnInit(): void {
    this.listeLivres = this.bookService.getBooks();
    this.listeLivresFiltres = this.listeLivres;
  }

  /**
   * Custom Get et Set pour le filtre e la liste
   */
  get filtreListe(): string{
    return this._filtreListe;
  }
  set filtreListe(value: string){
    this._filtreListe = value;
    this.listeLivresFiltres = this.performFilter(value);
  }

  performFilter(filtrePar: string): InterfaceBook[]{
     //Conversion du filtre en lowercase pour s'assurer que le filtre ne tient pas compte de la casse
     filtrePar = filtrePar.toLowerCase();
     //Filtre la liste originale des livres par le nom passé en paramètre, conversion du titre en lowercase pour filtrer sans tenir compte de la casse
     return this.listeLivres.filter((livreTmp : InterfaceBook) => livreTmp.bookTitle.toLowerCase().includes(filtrePar));
  }

}
