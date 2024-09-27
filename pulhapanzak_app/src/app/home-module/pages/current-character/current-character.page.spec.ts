import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentCharacterPage } from './current-character.page';

describe('CurrentCharacterPage', () => {
  let component: CurrentCharacterPage;
  let fixture: ComponentFixture<CurrentCharacterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCharacterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
