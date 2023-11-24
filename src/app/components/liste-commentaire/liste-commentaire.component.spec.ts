import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCommentaireComponent } from './liste-commentaire.component';

describe('ListeCommentaireComponent', () => {
  let component: ListeCommentaireComponent;
  let fixture: ComponentFixture<ListeCommentaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeCommentaireComponent]
    });
    fixture = TestBed.createComponent(ListeCommentaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
