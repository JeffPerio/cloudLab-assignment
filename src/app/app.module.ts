import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { BibliothequeComponent } from './components/bibliotheque/bibliotheque.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AproposComponent } from './components/apropos/apropos.component';

@NgModule({
  declarations: [
    AppComponent,
    BibliothequeComponent,
    WelcomeComponent,
    AddbookComponent,
    AproposComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path: 'bibliotheque', component: BibliothequeComponent},
      { path: 'welcome', component: WelcomeComponent },
      { path: 'addbook', component: AddbookComponent },
      { path: 'apropos', component: AproposComponent},
      { path: '', redirectTo: 'welcome', pathMatch:'full' },
      { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
