import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewObjectivesComponent} from './view-objectives.component';

describe('ViewObjectivesComponent', () => {
  let component: ViewObjectivesComponent;
  let fixture: ComponentFixture<ViewObjectivesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewObjectivesComponent]
    });
    fixture = TestBed.createComponent(ViewObjectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
