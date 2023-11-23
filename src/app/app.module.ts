import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { BibliothequeComponent } from './components/bibliotheque/bibliotheque.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AproposComponent } from './components/apropos/apropos.component';
import { BookdetailsComponent } from './components/bookdetails/bookdetails.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltreAuteurTitrePipe } from './shared/filtre-auteur-titre.pipe';
import { CommentaireComponent } from './components/commentaire/commentaire.component';

@NgModule({
  declarations: [
    AppComponent,
    BibliothequeComponent,
    WelcomeComponent,
    AddbookComponent,
    AproposComponent,
    BookdetailsComponent,
    FiltreAuteurTitrePipe,
    CommentaireComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'bibliotheque', component: BibliothequeComponent},
      { path: 'bibliotheque/:id', component: BookdetailsComponent},
      { path: 'welcome', component: WelcomeComponent },
      { path: 'addbook', component: AddbookComponent },
      { path: 'apropos', component: AproposComponent},
      { path: 'commentaires', component: CommentaireComponent},
      { path: '', redirectTo: 'welcome', pathMatch:'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
