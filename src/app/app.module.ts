import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { BibliothequeComponent } from './components/bibliotheque/bibliotheque.component';

@NgModule({
  declarations: [
    AppComponent,
    BibliothequeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'bibliotheque', component: BibliothequeComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
