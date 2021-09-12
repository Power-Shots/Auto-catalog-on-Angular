import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-cars-gallery',
  templateUrl: './cars-gallery.component.html',
  styleUrls: ['./cars-gallery.component.scss']
})
export class CarsGalleryComponent {

  carsList: Car[]= [];
  filtredCarsList: Car[] = [];
  selectedCategory: {[key: string]: string} = {
    "brand": "",
    "model": "",
    "year": "",
    "color": "",
    "engine": "",
    "price": "",
    "img": "",
    "description": ""
  };
  options: {[key:string]: any} = {}
  constructor(private http: HttpService, private router: Router) { }
   

  editCarInfo(id: string){
    this.router.navigateByUrl('/edit-car/'+id);
  }


}
