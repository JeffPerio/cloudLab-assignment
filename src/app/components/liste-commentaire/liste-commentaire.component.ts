import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InterfaceComment } from 'src/app/models/book/interfaceComment';

@Component({
  selector: 'liste-commentaire',
  templateUrl: './liste-commentaire.component.html',
  styleUrls: ['./liste-commentaire.component.css']
})
export class ListeCommentaireComponent {

  @Input()
  booksReviewsList:any;
  
  @Output()
  addCommentEventEmitter: EventEmitter<string> = new EventEmitter();

  gererAddComment():void {
    this.addCommentEventEmitter.emit("Ajout de Commentaire demandé");
  }

}
