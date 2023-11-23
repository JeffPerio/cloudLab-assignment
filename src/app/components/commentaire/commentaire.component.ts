import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { InterfaceBook } from 'src/app/models/book/interfaceBook';
import { BookService } from 'src/app/services/bookservices.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.css']
})
export class CommentaireComponent implements OnInit, OnDestroy {

  mouseoverLogin: boolean = false;
  pageTitle: string = "Commentaires";
  //Stockage de l'abonnement aux data
  sub!: Subscription;
  book: InterfaceBook | undefined;
  listeLivres!: InterfaceBook[];
  //Message d'erreur
  errorMessage: string = "";
  // Modèle pour le formulaire
  nouveauLivre: InterfaceBook = {
    bookId : 0,
    bookTitle : "",
    bookAuthor : "",
    bookPrice : 0,
    bookReview : {
      reviewComment : "",
      reviewRate : 0
    }
  }

  constructor(private toastr: ToastrService,private bookService:BookService){}

  ngOnInit(): void {
    //Appel au service pour récupérer la data
    this.sub = this.bookService.getBooks().subscribe({
      next: data => {
        this.listeLivres = data;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  gererAjoutCommentaire(formValues : any):void {
    if(formValues.bookForm?.valid){
      // Affectation des data du formulaire et de celles déjà existantes
      // Affectation a l'attribut du composant
      this.book = {
        bookId : this.book ? this.book.bookId : 0,
        bookTitle: formValues.bookTitle,
        bookAuthor: formValues.bookAuthor,
        bookImage: this.book ? this.book.bookImage : '',
        bookPrice: formValues.bookPrice
      };

      //Appel du service pour modifier le livre
      this.bookService.alterBook(this.book)
      .then(success => {
        if (success) {
          this.toastr.success("Ajout d'un commentaire sur le livre " + formValues.bookTitle);
        } else {
          this.toastr.error("Erreur lors de l'ajout du commentaire");
        }
      })
      .catch(error => {
        console.error('Erreur inattendue :', error);
      }); 
    }   
  }

  //Méthode de vérification si le formulaire a été modifié et est invalide pour styliser les input
  validateFormControl(formControl : AbstractControl):boolean{
    return formControl?.invalid && formControl?.touched;
  }
}
