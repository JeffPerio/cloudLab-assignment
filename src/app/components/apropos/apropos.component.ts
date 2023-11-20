import { Component } from '@angular/core';

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.component.html',
  styleUrls: ['./apropos.component.css']
})
export class AproposComponent {
  public pageTitle = 'A Propos';
  public commentaire = 'Pour les accrocs de lecture !';
}
