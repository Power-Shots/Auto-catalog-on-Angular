import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent implements OnInit {
  newCar: Car = {
    'id': '',
    'brand': '',
    'model': '',
    'year': '',
    'color': '',
    'engine': '',
    'price': '',
    'img': '',
    'description': '',  
  }
  carsList: Car[] = [];
  carForm: FormGroup;

  constructor(private router: Router) {
    this.carForm = new FormGroup({
      'brand': new FormControl(``, [Validators.required]),
      'model': new FormControl(``, [Validators.required]),
      'year': new FormControl(``, [Validators.required, Validators.pattern('[0-9]{4}')]),
      'color': new FormControl(``, [Validators.required]),
      'engine': new FormControl(``, [Validators.required, Validators.pattern('[0-9.]{1,}')]),
      'price': new FormControl(``, [Validators.required, Validators.pattern('[0-9]{1,}')]),
      'img': new FormControl(``, [Validators.required]),
      'description': new FormControl(``,  [Validators.required]),
    })
   }

  ngOnInit(): void {
    let carListData = localStorage.getItem('carList');
    if(carListData){
      carListData = JSON.parse(carListData);
      this.preparation(carListData)
    }
  }

  private preparation(obj: any){    
    let content = obj.map((item:any) => {
      return new Car(item.id, item.brand, item.model, item.year, item.color,
        item.engine, item.price, item.img, item.description)
    })
    this.carsList = content;
  }

  validationForm(){
    let isValid = true;
    this.newCar = {
      'id': `${Date.now()}`,
      'brand': this.carForm.value.brand,
      'model': this.carForm.value.model,
      'year': this.carForm.value.year,
      'color': this.carForm.value.color,
      'engine': this.carForm.value.engine,
      'price': this.carForm.value.price,
      'img': this.carForm.value.img.replace(/^.*\\/, ""),
      'description': this.carForm.value.description,  
    }
    let carObj = this.newCar as any;

    for(let key in carObj){
      if( carObj[key] === ''){
        isValid = false
      }
    }

    if(isValid){
      this.addNewCar(this.newCar)
    }
  }

  addNewCar(car: Car){
    this.carsList.push(car);
    localStorage.setItem('carList', JSON.stringify(this.carsList));
    this.router.navigateByUrl('/car-gallery');
  }

  goBack(){
    this.router.navigateByUrl('/car-gallery');
  }

}
