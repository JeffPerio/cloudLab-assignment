import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { InterfaceBook } from 'src/app/models/book/interfaceBook';
import { BookService } from 'src/app/services/bookservices.service';
import { Subscription} from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit, OnDestroy{

  //Stockage de l'abonnement aux data
  sub!: Subscription;
  pageTitle: string = "Page détaillée";
  book: InterfaceBook | undefined;
  //Message d'erreur
  errorMessage: string = '';
  //Attributs pour la modification
  modification:boolean = false;

  private bookTitle!: FormControl;
  private bookAuthor!: FormControl;
  private bookPrice!: FormControl;
  bookForm!: FormGroup;
 

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private bookService : BookService) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.bookService.getBook(parseInt(params.get('id')!,10)))
    ).subscribe({
      next: book => this.book = book,
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onBack():void{
    this.router.navigate(['/bibliotheque'])
  }

  //Méthode d'activation de la modiciation
  enableModification():void {
    this.modification = true;
    //Appel de l'initialisation du formulaire pour un reactive form
    this.initialisationFormulaire();
  }

  //Initialisation du formulaire lors de l'activation de la modification
  initialisationFormulaire():void {
    this.bookTitle = new FormControl(Validators.required);
    this.bookAuthor = new FormControl(this.book?.bookAuthor, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.bookPrice = new FormControl(this.book?.bookPrice, Validators.required);

    this.bookForm = new FormGroup({
      bookTitle: this.bookTitle,
      bookAuthor: this.bookAuthor,
      bookPrice: this.bookPrice
    });
  }

  cacherModification(): void {
    this.modification = false;
  }

  saveBook(formValues : any):void {
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
      //Masque le formulaire de modification
      this.modification = false;

      //Appel du service pour modifier le livre
      this.bookService.alterBook(this.book)
      .then(success => {
        if (success) {
          this.toastr.success("Modification du livre " + formValues.bookTitle);
        } else {
          this.toastr.error("Erreur lors de la modification du livre");
        }
      })
      .catch(error => {
        console.error('Erreur inattendue :', error);
      }); 
    }
  }

  //Méthode de vérification si le formulaire a été modifié et est invalide pour styliser les input
  nonvalidateFormControl(formControl : AbstractControl):boolean{
    return formControl.invalid && formControl.touched;
  }

}
