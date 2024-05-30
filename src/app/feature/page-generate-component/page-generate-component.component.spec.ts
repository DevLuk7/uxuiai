import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGenerateComponentComponent } from './page-generate-component.component';

describe('PageGenerateComponentComponent', () => {
  let component: PageGenerateComponentComponent;
  let fixture: ComponentFixture<PageGenerateComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageGenerateComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageGenerateComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
