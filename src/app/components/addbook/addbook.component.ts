import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/bookservices.service';
import { InterfaceBook } from '../../models/book/interfaceBook';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/fileservice.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent {

  pageTitle: string = "Ajout de Livre";
  constructor(private toastr: ToastrService, private bookService: BookService, private router: Router, private fileService : FileService) {}

  bookTitle: string = "";
  bookAuthor: string = "";
  bookPrice : number = 0;
  bookImageKey: string = "";

  gererAjoutLivre(formValues : any):void {

    const tmpBook : InterfaceBook = {
      bookId : 0,
      bookTitle: formValues.bookTitle,
      bookAuthor: formValues.bookAuthor,
      bookImage: this.fileService.getStoredFile(this.bookImageKey),
      bookPrice: formValues.bookPrice
    };

    this.bookService.addBook(tmpBook)
    .then(success => {
      if (success) {
        this.toastr.success("Ajout du livre " + formValues.bookTitle);
        this.router.navigate(['/bibliotheque']);
      } else {
        this.toastr.error("Erreur lors de l\'ajout d'un livre ");
      }
    })
    .catch(error => {
      console.error('Erreur inattendue :', error);
    });      
  }

  onFileSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const files = inputElement.files;
    if (files && files.length > 0) {
      this.bookImageKey = files[0].name;
      this.fileService.storeFile(files[0],this.bookImageKey);
    }
  }

}
