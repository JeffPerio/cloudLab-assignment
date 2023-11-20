import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { InterfaceBook } from 'src/app/models/book/interfaceBook';
import { BookService } from 'src/app/services/bookservices.service';
import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit{

  book$!: Observable<InterfaceBook | undefined>;
  pageTitle: string = "Page détaillée";
  book: InterfaceBook | undefined;
  //Message d'erreur
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private bookService : BookService) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.bookService.getBook(parseInt(params.get('id')!,10)))
    ).subscribe({
      next: book => this.book = book,
      error: err => this.errorMessage = err
    });
  }

  onBack():void{
    this.router.navigate(['/bibliotheque'])
  }

}
