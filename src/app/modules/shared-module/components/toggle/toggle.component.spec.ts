import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NoresultComponent} from './noresult.component';

describe('NoresultComponent', () => {
  let component: NoresultComponent;
  let fixture: ComponentFixture<NoresultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoresultComponent]
    });
    fixture = TestBed.createComponent(NoresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
