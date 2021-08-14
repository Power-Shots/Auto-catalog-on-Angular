// Module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';

// Services
import { HttpService } from './services/http.service';
import { CarsGalleryComponent } from './components/cars-gallery/cars-gallery.component';
import { CarsFilterComponent } from './components/cars-gallery/cars-filter/cars-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    CarsGalleryComponent,
    CarsFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
