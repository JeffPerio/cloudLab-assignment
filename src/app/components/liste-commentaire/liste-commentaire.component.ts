import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InterfaceComment } from 'src/app/models/book/interfaceComment';

@Component({
  selector: 'liste-commentaire',
  templateUrl: './liste-commentaire.component.html',
  styleUrls: ['./liste-commentaire.component.css']
})
export class ListeCommentaireComponent {
  
  @Input()
  titre:string ="";

  @Output()
  addCommentEventEmitter: EventEmitter<string> = new EventEmitter();


  visible:boolean = true;

  gererAddComment():void {
    this.addCommentEventEmitter.emit("Ajout de Commentaire demandé");
  }

  toggleContent():void {
    this.visible = !this.visible;
  }

}
