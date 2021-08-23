import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsGalleryComponent } from './components/cars-gallery/cars-gallery.component';
import { CreateCarComponent } from './components/create-car/create-car.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';

const routes: Routes = [
  {path: 'car-gallery', component: CarsGalleryComponent},
  {path: 'create-new-car', component: CreateCarComponent},
  {path: 'edit-car/:id', component: EditCarComponent},
  {path: '**', redirectTo: '/car-gallery'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
