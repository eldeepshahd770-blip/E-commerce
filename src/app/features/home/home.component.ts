import { Component } from '@angular/core';
import { CategriesHomeComponent } from './categries-home/categries-home.component';
import { ProductHomeComponent } from './product-home/product-home.component';
import { FooterhomeComponent } from './footerhome/footerhome.component';
import { SliderComponent } from './slider/slider.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CategriesHomeComponent,
    ProductHomeComponent,
    FooterhomeComponent,
    SliderComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
