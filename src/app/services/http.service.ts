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

  postData(cars: Car[]){
      
      return this.http.post('http://localhost:3000/cars', cars);
    
  }
}
