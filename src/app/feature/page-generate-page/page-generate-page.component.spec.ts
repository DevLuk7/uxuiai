import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGeneratePageComponent } from './page-generate-page.component';

describe('PageGeneratePageComponent', () => {
  let component: PageGeneratePageComponent;
  let fixture: ComponentFixture<PageGeneratePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageGeneratePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageGeneratePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
