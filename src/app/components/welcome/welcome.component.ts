import { Component } from '@angular/core';
import { InterfacePage } from 'src/app/models/page/interfacePage';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  public pageTitle = 'Acceuil';
  imageLargeur: number = 50;
  imageMarge: number = 2;

  page1 : InterfacePage = {
    "pageTitle":"Acceuil",
    "pageDescription":"Page d'acceuil de l'application",
    "pageImage":"assets/images/livre1.jpg"
  };
}