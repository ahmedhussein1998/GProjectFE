import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteMembersComponent} from './delete-members.component';

describe('DeleteMembersComponent', () => {
  let component: DeleteMembersComponent;
  let fixture: ComponentFixture<DeleteMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteMembersComponent]
    });
    fixture = TestBed.createComponent(DeleteMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
