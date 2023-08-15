import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CodeparserComponent} from './codeparser.component';

describe('CodeparserComponent', () => {
  let component: CodeparserComponent;
  let fixture: ComponentFixture<CodeparserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeparserComponent]
    });
    fixture = TestBed.createComponent(CodeparserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
