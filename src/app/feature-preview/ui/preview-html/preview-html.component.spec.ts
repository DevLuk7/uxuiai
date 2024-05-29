import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewHtmlComponent } from './preview-html.component';

describe('PreviewHtmlComponent', () => {
  let component: PreviewHtmlComponent;
  let fixture: ComponentFixture<PreviewHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewHtmlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
