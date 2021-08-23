import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Car } from 'src/app/models/car';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss']
})
export class EditCarComponent implements OnInit {
  private routeSubcsription: Subscription;
  currentCar: Car = {
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
  id: string = '';
  index: number = 0;

  carList: Car[] = [];
  carForm: any;

  constructor(private router: Router, private route: ActivatedRoute ) { 
    this.routeSubcsription = route.params.subscribe(
      params => (this.id = params['id'])
    );
    
  }

  ngOnInit(): void {
    let carListData = localStorage.getItem('carList');
    if(carListData){
      carListData = JSON.parse(carListData);
      this.preparation(carListData)
    }
  }

  private preparation(obj: any){    
    let car = obj.filter((item:any)=> item.id === this.id);
    this.index = obj.findIndex((item:any)=> item.id === this.id);
    this.carList = obj;
    this.currentCar = car[0];
    this.initForm();
  }

  initForm(){
    this.carForm = new FormGroup({
      'brand': new FormControl(`${this.currentCar.brand}`, [Validators.required]),
      'model': new FormControl(`${this.currentCar.model}`, [Validators.required]),
      'year': new FormControl(`${this.currentCar.year}`, [Validators.required, Validators.pattern('[0-9]{4}')]),
      'color': new FormControl(`${this.currentCar.color}`, [Validators.required]),
      'engine': new FormControl(`${this.currentCar.engine}`, [Validators.required, Validators.pattern('[0-9.]{1,}')]),
      'price': new FormControl(`${this.currentCar.price}`, [Validators.required, Validators.pattern('[0-9]{1,}')]),
      'img': new FormControl(``, [Validators.required]),
      'description': new FormControl(`${this.currentCar.description}`,  [Validators.required]),
    });
  }

  validationForm(){
    let isValid = true;
    this.currentCar = {
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
    let carObj = this.currentCar as any;

    for(let key in carObj){
      if( carObj[key] === '' && +carObj.price < 1900 || +carObj.price > 2021 ){
        isValid = false
      }
    }

    if(isValid = true){
      this.replaceCar();
    }
  }

  replaceCar(){
    this.carList[this.index] = this.currentCar;
    localStorage.setItem('carList', JSON.stringify(this.carList));
    this.router.navigateByUrl('/car-gallery');
  }

  deleteCar(){
    this.carList.splice(this.index,1)
    localStorage.setItem('carList', JSON.stringify(this.carList));
    this.router.navigateByUrl('/car-gallery');
  }

  goBack(){
    this.router.navigateByUrl('/car-gallery');
  }

}
