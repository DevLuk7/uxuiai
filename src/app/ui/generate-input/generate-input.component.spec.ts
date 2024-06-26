import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateInputComponent } from './generate-input.component';

describe('GenerateInputComponent', () => {
  let component: GenerateInputComponent;
  let fixture: ComponentFixture<GenerateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
