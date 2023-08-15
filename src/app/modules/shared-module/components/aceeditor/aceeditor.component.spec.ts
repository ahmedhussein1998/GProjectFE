import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AceeditorComponent} from './aceeditor.component';

describe('AceeditorComponent', () => {
  let component: AceeditorComponent;
  let fixture: ComponentFixture<AceeditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AceeditorComponent]
    });
    fixture = TestBed.createComponent(AceeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
