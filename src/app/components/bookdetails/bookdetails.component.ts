import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { InterfaceBook } from 'src/app/models/book/interfaceBook';
import { BookService } from 'src/app/services/bookservices.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit{

  book$!: Observable<InterfaceBook>;

  constructor(private route: ActivatedRoute, private router: Router,
    private bookService : BookService) {}

  ngOnInit(): void {
    this.book$ = this.route.paramMap.pipe(switchMap((params: ParamMap) => this.bookService.getBook(parseInt(params.get('id')!))));
  }

  pageTitle: string = "Bibliothèque";
  book: InterfaceBook | undefined;

  onBack():void{
    this.router.navigate(['/bibliotheque'])
  }

}
