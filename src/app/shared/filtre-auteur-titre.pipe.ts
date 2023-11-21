import { Pipe, PipeTransform } from '@angular/core';
import { InterfaceBook } from '../models/book/interfaceBook';

@Pipe({
  name: 'filtreAuteurTitre'
})
export class FiltreAuteurTitrePipe implements PipeTransform {

  transform(listeLivres: InterfaceBook[], searchText: string): InterfaceBook[] {
    if (!listeLivres) return [];
    if (!searchText) return listeLivres;

    return listeLivres.filter((livre : InterfaceBook) => { 
      return livre.bookTitle.toLowerCase().includes(searchText.toLowerCase()) || livre.bookAuthor.toLowerCase().includes(searchText.toLowerCase());
    });
  }
}
