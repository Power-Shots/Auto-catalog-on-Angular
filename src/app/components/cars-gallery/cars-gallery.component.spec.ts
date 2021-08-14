import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsGalleryComponent } from './cars-gallery.component';

describe('CarsGalleryComponent', () => {
  let component: CarsGalleryComponent;
  let fixture: ComponentFixture<CarsGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
