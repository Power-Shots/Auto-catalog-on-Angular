import { Options } from '@angular-slider/ngx-slider/options';
import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-cars-filter',
  templateUrl: './cars-filter.component.html',
  styleUrls: ['./cars-filter.component.scss']
})
export class CarsFilterComponent implements OnInit {
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
    "description": "",
  };

  priceValue: number[] = [0,0]
  minValue: number = 100;
  maxValue: number = 400;

  options: Options = {
    floor: 1,
    ceil: 1000000,
    step: 1000
  }

  filterOptions: {[key:string]: any} = {}
  constructor(private http: HttpService) { 
   }

  ngOnInit(): void {
    let carListData = localStorage.getItem('carList');
    if(carListData){
      carListData = JSON.parse(carListData);
      this.preparation(carListData);
    }
    else {
      this.http.getAllCars().subscribe(
        {
          next: (data: any) => {
            this.carsList = data;
            this.filtredCarsList = data;
            this.createOptions();
            localStorage.setItem('carList', JSON.stringify(data));
          },
          error: error => console.log(error)
        }
      );
    }
  }

  private preparation(obj: any){    
    let content = obj.map((item:any) => {
      return new Car(item.id, item.brand, item.model, item.year, item.color,
        item.engine, item.price, item.img, item.description)
    })
    this.carsList = content;;
    this.filtredCarsList = content;
    this.createOptions();
  }

  selectCategory(key:string, model: any){
    this.selectedCategory[key] = model.value;
    this.applyFilter()
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

      if(+this.carsList[i].price <= this.priceValue[0] ||
        +this.carsList[i].price  >= this.priceValue[1]){
          isValid = false;
      }

      if(isValid === true){
        this.filtredCarsList.push(this.carsList[i])
      }
    }
    console.log(this.filtredCarsList)  
  }

  handleChange(){
    this.applyFilter();
  }

  

  createOptions(){
    for(let key in this.carsList[0]){
      let optionsSet = new Set()
      for(let i=0; i< this.carsList.length; i++){
        let obj = this.carsList[i] as any;
        optionsSet.add(obj[key])
      }

      let sortOptionsSet = [...optionsSet].sort();
      this.filterOptions[key] = sortOptionsSet;
    }
    let maxPrice = Math.max(...this.filterOptions.price)
    this.priceValue[1] = maxPrice;
    this.options.ceil = maxPrice+1;
  }
  
  clearSelectedCategory(){
   
    for(let category in this.selectedCategory){
      this.selectedCategory[category] = '';
    }

    this.filtredCarsList = this.carsList;
    this.filterOptions = {};
    this.applyFilter();
    this.createOptions();    
  }
}
