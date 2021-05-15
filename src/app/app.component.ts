import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarserviceService } from './carservice.service';
import { Car } from './model/car';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  cars!: Car[];
  searchQuery!: string;
  carForm: FormGroup = this.formBuilder.group({
    id: [''],
    title: [''],
    price: [''],
    description: [''],
    imgUrl: ['/assets/noimage.PNG'],
    categories: ['']
  });

  constructor(
    private carService: CarserviceService,
    private formBuilder: FormBuilder
    ){
  }

  async ngOnInit(){
    this.cars = await this.carService.loadCar();
  }

  async search(){
    this.cars = await this.carService.filtercar(this.searchQuery);
  }

  addCar(){
    const car = this.carForm.value;
    this.carService. addCar(car);
  }
}
