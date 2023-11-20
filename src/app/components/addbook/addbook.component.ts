import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/bookservices.service';
import { InterfaceBook } from '../../models/book/interfaceBook';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {

  pageTitle: string = "Ajout de Livre";
  constructor(private toastr: ToastrService, private bookService: BookService, private router: Router) {}

  bookTitle: string = "";
  bookAuthor: string = "";
  bookPrice : number = 0;

  gererAjoutLivre(formValues : any):void {
    const tmpBook : InterfaceBook = {
      bookTitle: formValues.bookTitle,
      bookAuthor: formValues.bookAuthor,
      bookImage: '',
      bookPrice: formValues.bookPrice
    };
    var result = this.bookService.addBook(tmpBook);
    if(result) {
      this.toastr.success("Ajout du livre " + formValues.bookTitle);
      this.router.navigate(['/bibliotheque']);
    }
    else
      this.toastr.error("Erreur lors de l'ajout d'un livre ");
  }

}
