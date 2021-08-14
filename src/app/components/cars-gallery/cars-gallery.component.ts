import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-cars-gallery',
  templateUrl: './cars-gallery.component.html',
  styleUrls: ['./cars-gallery.component.scss']
})
export class CarsGalleryComponent implements OnInit {

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
  constructor(private http: HttpService) { 
   }

  ngOnInit(): void {
    this.http.getAllCars().subscribe(
        {
          next: (data: any) => {
            this.carsList = data;
            this.filtredCarsList = data;
            this.createOptions();
          },
          error: error => console.log(error)
        }
    );
  }

  selectCategory(key:string, model: any){
    this.selectedCategory[key] = model.value;
    this.applyFilter()
    console.log(key)
  }

  applyFilter(){
    this.filtredCarsList = [];
    for(let i = 0; i< this.carsList.length; i++){
      let isValid = true;
      let carObj = this.carsList[i] as any;
      for(let category in this.selectedCategory){
          if( this.selectedCategory[category] !== '' &&
              this.selectedCategory[category].toLowerCase() !== carObj[`${category}`].toLowerCase() ){
            isValid = false;
          }          
      }
      if(isValid === true){
        this.filtredCarsList.push(this.carsList[i])
      } 
  }

  
  }

  editCarInfo(item: Car){
    console.log(item)
  }

  createOptions(){
    for(let key in this.carsList[0]){
      let optionsSet = new Set()
      for(let i=0; i< this.carsList.length; i++){
        let obj = this.carsList[i] as any;
        optionsSet.add(obj[key])
      }
      this.options[key] = optionsSet;
    }
  }
}
