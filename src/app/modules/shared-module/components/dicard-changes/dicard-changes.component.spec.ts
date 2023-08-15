import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DicardChangesComponent} from './dicard-changes.component';

describe('DicardChangesComponent', () => {
  let component: DicardChangesComponent;
  let fixture: ComponentFixture<DicardChangesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DicardChangesComponent]
    });
    fixture = TestBed.createComponent(DicardChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
