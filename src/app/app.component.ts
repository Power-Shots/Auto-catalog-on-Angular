import { Component, OnInit } from '@angular/core';
import { Car } from './models/car';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'myapp';
  cars: Car[] = [];

  constructor(private http: HttpService){
    
  }

  ngOnInit(){ }
}
