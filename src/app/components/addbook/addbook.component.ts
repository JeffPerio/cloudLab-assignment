import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/bookservices.service';
import { InterfaceBook } from '../../models/book/interfaceBook';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/fileservice.service';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent{

  pageTitle: string = "Ajout de Livre";

  constructor(private toastr: ToastrService, private bookService: BookService, private router: Router, private fileService : FileService) {}

  //Création d'un objet livre pour le mapping NgModel du template. Ne sera pas utilisé (possibilité de laisser l'objet undefined)
  nouveauLivre: InterfaceBook = {
    bookId : 0,
    bookTitle : "",
    bookAuthor : "",
    bookPrice : 0
  }
  bookImageKey: string = "";
  mouseoverLogin: boolean = false;

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

    //Méthode de vérification si le formulaire a été modifié et est invalide pour styliser les input
    validateFormControl(formControl : AbstractControl):boolean{
      return formControl?.invalid && formControl?.touched;
    }
}
