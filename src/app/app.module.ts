// Module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { CarsGalleryComponent } from './components/cars-gallery/cars-gallery.component';
import { CarsFilterComponent } from './components/cars-gallery/cars-filter/cars-filter.component';
import { CreateCarComponent } from './components/create-car/create-car.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';

// Services
import { HttpService } from './services/http.service';



@NgModule({
  declarations: [
    AppComponent,
    CarsGalleryComponent,
    CarsFilterComponent,
    CreateCarComponent,
    EditCarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSliderModule,
    ReactiveFormsModule,
  ],
  providers: [HttpService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
