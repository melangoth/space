import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuickStartComponent} from './quick-start.component';

describe('QuickStartComponent', () => {
  let component: QuickStartComponent;
  let fixture: ComponentFixture<QuickStartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickStartComponent]
    });
    fixture = TestBed.createComponent(QuickStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
