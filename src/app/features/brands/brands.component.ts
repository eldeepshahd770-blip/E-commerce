import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Brand } from '../../core/models/models/product.interface';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  brandslist = signal<Brand[]>([]);
  ngOnInit(): void {
    this.getAllBrands();
  }
  getAllBrands() {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandslist.set(res.data);
      },
    });
  }
}
