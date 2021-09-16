import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getAllCars() : Observable<Car>{
    return this.http.get('assets/dataBase/carList.json').pipe(
      map((data: any) => {
        let carsList = data['cars'];

        return carsList.map(function(car: any): Car {
          return new Car(car.id,
                         car.brand,
                         car.model,
                         car.year,
                         car.color,
                         car.engine,
                         car.price,
                         car.img,
                         car.description);
        });
      }),

      catchError(error => {
        console.log('Error from service: ', error);
        return throwError(error);
      })
    );
  };

  getAllCarsFromLocalStorage(){
     let response: string | null = localStorage.getItem('carList');

     if(response){
       let data = JSON.parse(response);
       return data;
     }
     else return [];
  }

  addNewCar(car: Car){
    let carsList = this.getAllCarsFromLocalStorage();
    carsList.push(car);
    localStorage.setItem('carList', JSON.stringify(carsList));
  }

  replaceCar(id: number, currentCar: Car){
    let carsList = this.getAllCarsFromLocalStorage();
    carsList[id] = currentCar;
    localStorage.setItem('carList', JSON.stringify(carsList));
  }

  deleteCarById(id: number){
    let carsList = this.getAllCarsFromLocalStorage();
    carsList.splice(id,1);
    localStorage.setItem('carList', JSON.stringify(carsList));
  }
}
