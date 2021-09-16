import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent {
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
  };
  carsList: Car[] = [];
  carForm: FormGroup;

  constructor(private router: Router, private http: HttpService) {
    this.carForm = new FormGroup({
      'brand': new FormControl(``, [Validators.required]),
      'model': new FormControl(``, [Validators.required]),
      'year': new FormControl(``, [Validators.required, Validators.pattern('[0-9]{4}')]),
      'color': new FormControl(``, [Validators.required]),
      'engine': new FormControl(``, [Validators.required, Validators.pattern('[0-9.]{1,}')]),
      'price': new FormControl(``, [Validators.required, Validators.pattern('[0-9]{1,}')]),
      'img': new FormControl(``, [Validators.required]),
      'description': new FormControl(``,  [Validators.required]),
    });
   };


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
        isValid = false;
      }
    }

    if(isValid){
      this.submit(this.newCar);
    }
  }

  submit(car: Car){
    this.http.addNewCar(car);
    this.router.navigateByUrl('/car-gallery');
  }

  goBack(){
    this.router.navigateByUrl('/car-gallery');
  }

}
